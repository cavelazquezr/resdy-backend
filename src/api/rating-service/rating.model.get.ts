import { client } from "../../services/prisma";
import { TsoaResponse } from "tsoa";
import { UserStatus } from "../../types/messages";
import { RatingStatsOutput } from "../../types/rating";
import { calculateRatingAverage, getStatsFromRatings } from "../utils";

export const getRatingStatsHandler = async (
	restaurant_id: string,
): Promise<RatingStatsOutput | string> => {
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
