import {
	MyRatingQueryParams,
	RatingDetailOutput,
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
import { getRestaurantSummary } from "../models/restaurant-models";
import { RestaurantCardOutput } from "../../types/common";

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
): Promise<Promise<Array<RestaurantCardOutput<RatingDetailOutput>>>> => {
	const current_user = await getCurrentUserInfo(authorization);
	if (current_user) {
		const ratings = await getMyRatings(current_user.email, query_params);
		const rating_records: Array<RestaurantCardOutput<RatingDetailOutput>> = await Promise.all(
			ratings.map(async (rating) => {
				const {
					restaurant: {
						id: restaurant_id,
						name,
						customization,
						restaurant_information,
						restaurant_stadistic,
						created_at,
					},
					...rating_record
				} = rating;

				const restaurant_summary = await getRestaurantSummary(restaurant_id);

				return {
					id: rating_record.id,
					name: name,
					status: rating_record.status,
					brand_name: customization?.name ?? "",
					address: restaurant_information?.address ?? "",
					city: restaurant_information?.city ?? "",
					header_url: customization?.header_url ?? null,
					restaurant_type: restaurant_information?.restaurant_type ?? "",
					location: restaurant_information?.location as any,
					summary: {
						rating: restaurant_summary.rating,
						rating_count: restaurant_summary.rating_count,
						price_average: restaurant_summary.price_average,
					},
					detail: {
						rating: rating_record.rating ?? null,
						title: rating_record.title ?? null,
						comment: rating_record.comment ?? null,
						answer: rating_record.answer ?? null,
						created_at: rating_record.created_at,
						replied_at: rating_record.updated_at ?? null,
					},
					created_at: created_at,
					total_bookings: restaurant_stadistic?.total_bookings ?? 0,
				};
			}),
		);
		return rating_records;
	}
	return [];
};

export const putRatingService = async (rating_id: string, rating_record: RatingUpdateRecord): Promise<any> => {
	const rating = await updateRating(rating_id, rating_record);
	return rating;
};
