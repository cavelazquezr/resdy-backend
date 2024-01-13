import { client } from "../../services/prisma";
import { TsoaResponse } from "tsoa";
import { MyRatingOutput, RatingStatsOutput, RatingsOutput } from "../../types/rating";
import { calculateRatingAverage, getStatsFromRatings } from "../utils";
import { UserStatus } from "../../types/messages";
import { verifyToken } from "../../services/access";

export const getRatingsHandler = async (
	restaurant_id: string,
	unauthorizedCallback: TsoaResponse<403, { reason: string }>,
): Promise<RatingsOutput[] | string> => {
	console.log("foooooooo");
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

export const getMyRatingsHandler = async (
	authorization: string,
	unauthorizedCallback: TsoaResponse<403, { reason: string }>,
	status?: string,
	city?: string,
	address?: string,
	restaurant_type?: string,
): Promise<MyRatingOutput[] | string> => {
	const { email } = verifyToken(authorization);
	console.log(email);

	const qUser = client.user.findUnique({
		where: {
			email: email,
		},
	});
	if (!qUser) {
		return unauthorizedCallback(403, { reason: UserStatus.USER_NOT_FOUND });
	}

	const qRatings = await client.rating.findMany({
		where: {
			status: { equals: status },
			user: {
				email: {
					equals: email,
				},
			},
			restaurant: {
				restaurant_information: {
					city: { contains: city },
					address: { contains: address },
					restaurant_type: { contains: restaurant_type },
				},
			},
		},
		select: {
			rating: true,
			title: true,
			status: true,
			comment: true,
			answer: true,
			created_at: true,
			updated_at: true,
			restaurant: {
				select: {
					name: true,
					restaurant_information: {
						select: {
							city: true,
							country: true,
							address: true,
							restaurant_type: true,
						},
					},
					customization: {
						select: {
							name: true,
							header_url: true,
						},
					},
				},
			},
		},
	});
	const myRatingRecords: MyRatingOutput[] = qRatings.map((rating) => {
		const {
			restaurant: { name, customization, restaurant_information },
			...ratingRecord
		} = rating;

		return {
			name,
			brand_name: customization?.name ?? undefined,
			header_url: customization?.header_url ?? undefined,
			city: restaurant_information?.city ?? undefined,
			address: restaurant_information?.address ?? undefined,
			restaurant_type: restaurant_information?.restaurant_type ?? undefined,
			rating_info: {
				rating: ratingRecord.rating,
				status: ratingRecord.status,
				title: ratingRecord.title,
				comment: ratingRecord.comment,
				created_at: ratingRecord.created_at,
				replied_at: ratingRecord.updated_at ?? undefined,
				answer: ratingRecord.answer ?? undefined,
			},
		};
	});

	return myRatingRecords;
};
