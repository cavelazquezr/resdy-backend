import { TsoaResponse } from "tsoa";
import { RatingsOutput, UpdateRatingRecord } from "../../types/rating";
import { client } from "../../services/prisma";
import { UserStatus } from "../../types/messages";
import { verifyToken } from "../../services/access";

export const putRatingHandler = async (
	authorization: string,
	rating_id: string,
	rating: UpdateRatingRecord,
	unauthorizedCallback: TsoaResponse<403, { reason: string }>,
): Promise<RatingsOutput | string> => {
	const { email } = verifyToken(authorization);
	const qUser = await client.user.findUnique({
		where: {
			email: email,
		},
	});
	if (!qUser) {
		return unauthorizedCallback(403, { reason: UserStatus.USER_NOT_FOUND });
	}
	const qRating = await client.rating.findUnique({
		where: { id: rating_id },
	});
	if (!qRating) {
		return unauthorizedCallback(403, { reason: UserStatus.NOT_FOUND });
	}
	if (qRating.user_id !== qUser.id) {
		return unauthorizedCallback(403, { reason: UserStatus.UNAUTHORIZED });
	}
	if (qRating.status === "finished") {
		return unauthorizedCallback(403, { reason: UserStatus.RATING_IS_FINISHED });
	}
	const qUpdatedRating = await client.rating.update({
		where: { id: rating_id },
		data: {
			status: "finished",
			...rating,
		},
		select: {
			rating: true,
			title: true,
			comment: true,
			created_at: true,
		},
	});
	return qUpdatedRating as RatingsOutput;
};
