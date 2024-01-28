import {
	MyRatingOutput,
	MyRatingQueryParams,
	RatingStatsOutput,
	RatingsOutput,
	UpdateRatingRecord,
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

export const getRestaurantRatingsService = async (restaurant_name: string): Promise<RatingsOutput[]> => {
	const ratings = await getRestaurantRatings(restaurant_name);
	const rating_records: RatingsOutput[] = ratings.map((rating) => {
		const { user, ...ratingRecord } = rating;
		return {
			rating: ratingRecord.rating ?? undefined,
			title: ratingRecord.title ?? undefined,
			comment: ratingRecord.comment ?? undefined,
			created_at: ratingRecord.created_at,
			user_info: {
				...user,
				avatar_url: user.avatar_url ?? undefined,
			},
			replied_at: ratingRecord.updated_at ?? undefined,
			answer: ratingRecord.answer ?? undefined,
		};
	});

	return rating_records;
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
					rating: ratingRecord.rating ?? undefined,
					title: ratingRecord.title ?? undefined,
					comment: ratingRecord.comment ?? undefined,
					replied_at: ratingRecord.updated_at ?? undefined,
					answer: ratingRecord.answer ?? undefined,
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

export const putRatingService = async (rating_id: string, rating_record: UpdateRatingRecord): Promise<any> => {
	const rating = await updateRating(rating_id, rating_record);
	return rating;
};
