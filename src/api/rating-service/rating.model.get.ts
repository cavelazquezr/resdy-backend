import { client } from "../../services/prisma";
import { TsoaResponse } from "tsoa";
import { RatingStatsOutput, RatingsOutput } from "../../types/rating";
import { calculateRatingAverage, getStatsFromRatings } from "../utils";
import { UserStatus } from "../../types/messages";

export const getRatingsHandler = async (
	restaurant_id: string,
	unauthorizedCallback: TsoaResponse<403, { reason: string }>,
): Promise<RatingsOutput[] | string> => {
	const qRestaurant = await client.restaurant.findUnique({
		where: {
			id: restaurant_id,
		},
	});
	if (!qRestaurant) {
		return unauthorizedCallback(403, { reason: UserStatus.WEB_DOESNT_EXIST });
	}
	const qRatings = await client.rating.findMany({
		where: {
			restaurant_id: restaurant_id,
			status: "finished",
		},
		select: {
			rating: true,
			title: true,
			comment: true,
			answer: true,
			created_at: true,
			updated_at: true,
			user: {
				select: {
					firstname: true,
					lastname: true,
					avatar_url: true,
				},
			},
		},
	});
	const ratingRecords: RatingsOutput[] = qRatings.map((rating) => {
		const { user, ...ratingRecord } = rating;
		return {
			rating: ratingRecord.rating,
			title: ratingRecord.title,
			comment: ratingRecord.comment,
			created_at: ratingRecord.created_at,
			user_info: {
				...user,
				avatar_url: user.avatar_url ?? undefined,
			},
			replied_at: ratingRecord.updated_at ?? undefined,
			answer: ratingRecord.answer ?? undefined,
		};
	});

	return ratingRecords;
};

export const getRatingStatsHandler = async (restaurant_id: string): Promise<RatingStatsOutput | string> => {
	const qRatings = await client.rating.findMany({
		where: {
			restaurant_id: restaurant_id,
		},
	});
	const statsRecord: RatingStatsOutput = {
		rating: calculateRatingAverage(qRatings).toString(),
		rating_count: qRatings.length,
		stats: getStatsFromRatings(qRatings),
	};
	return statsRecord;
};
