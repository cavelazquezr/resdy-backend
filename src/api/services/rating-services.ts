import {
	MyRatingOutput,
	MyRatingQueryParams,
	RatingRecord,
	RatingStatsOutput,
	RatingUpdateRecord,
} from "../../types/rating";
import {
	getMyRatings,
	getRatingsCountFromRestautant,
	getRatingsFromRestaurant,
	getRestaurantRatings,
	updateRating,
} from "../models/rating-models";
import { getCurrentUserInfo } from "../models/auth-models";
import { calculateRatingAverage, getStatsFromRatings } from "../../utils";
import { getObjectSignedUrl } from "../../config/S3";

export const getRestaurantRatingsService = async (restaurant_name: string): Promise<RatingRecord[]> => {
	const ratings = await getRestaurantRatings(restaurant_name);
	const rating_records: Promise<RatingRecord>[] = ratings.map(async (rating) => {
		const { user, ...ratingRecord } = rating;
		const defaultRatingRecord: Omit<RatingRecord, "user_info" | "restaurant_id"> = {
			id: ratingRecord.id,
			rating: ratingRecord.rating ?? null,
			title: ratingRecord.title ?? null,
			comment: ratingRecord.comment ?? null,
			created_at: ratingRecord.created_at,
			status: ratingRecord.status,
			replied_at: ratingRecord.updated_at ?? null,
			answer: ratingRecord.answer ?? null,
		};
		return Promise.resolve({
			...defaultRatingRecord,
			user_info: {
				firstname: user.firstname,
				lastname: user.lastname ?? undefined,
				avatar_url: (await getObjectSignedUrl(`users/${user.id}/${user.id}-avatar`)) ?? undefined,
			},
		});
	});

	return Promise.all(rating_records);
};

export const getRestaurantRatingStatsService = async (restaurant_name: string): Promise<RatingStatsOutput> => {
	const ratings = await getRatingsFromRestaurant(restaurant_name);
	const ratings_count = await getRatingsCountFromRestautant(restaurant_name);
	const rating_records: RatingStatsOutput = {
		rating: calculateRatingAverage(ratings).toString(),
		rating_count: ratings_count,
		stats: getStatsFromRatings(ratings),
	};
	return rating_records;
};

export const getMyRatingsService = async (
	authorization: string,
	query_params: MyRatingQueryParams,
): Promise<{ ratings: MyRatingOutput[] }> => {
	const current_user = await getCurrentUserInfo(authorization);
	if (current_user) {
		const ratings = await getMyRatings(current_user.email, query_params);
		const rating_records: MyRatingOutput[] = ratings.map((rating) => {
			const {
				restaurant: { name, customization, restaurant_information },
				...ratingRecord
			} = rating;

			return {
				id: rating.id,
				name,
				brand_name: customization?.name ?? undefined,
				header_url: customization?.header_url ?? undefined,
				city: restaurant_information?.city ?? undefined,
				address: restaurant_information?.address ?? undefined,
				restaurant_type: restaurant_information?.restaurant_type ?? undefined,
				rating_info: {
					status: ratingRecord.status,
					created_at: ratingRecord.created_at,
					rating: ratingRecord.rating ?? null,
					title: ratingRecord.title ?? null,
					comment: ratingRecord.comment ?? null,
					replied_at: ratingRecord.updated_at ?? null,
					answer: ratingRecord.answer ?? null,
				},
			};
		});
		return {
			ratings: rating_records,
		};
	}
	return {
		ratings: [],
	};
};

export const putRatingService = async (rating_id: string, rating_record: RatingUpdateRecord): Promise<any> => {
	const rating = await updateRating(rating_id, rating_record);
	return rating;
};
