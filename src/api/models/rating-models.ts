import { MyRatingQueryParams, RatingUpdateRecord } from "../../types/rating";
import { convertToAmpersandSeparated } from "../../utils";
import client from "../../config/client";

const { rating } = client;

export const getRatingById = async (rating_id: string) => {
	const query = await rating.findUnique({
		where: { id: rating_id },
	});
	return query;
};

export const getRatingsFromRestaurant = async (restaurant_name: string) => {
	const query = await rating.findMany({
		where: {
			restaurant: { name: restaurant_name },
		},
	});
	return query;
};

export const getRatingsCountFromRestautant = async (restaurant_name: string) => {
	const query = await rating.count({
		where: {
			restaurant: { name: restaurant_name },
		},
	});
	return query;
};

export const getRestaurantRatings = async (restaurant_name: string) => {
	const query = await rating.findMany({
		where: {
			restaurant: {
				name: restaurant_name,
			},
			status: "finished",
		},
		select: {
			id: true,
			rating: true,
			title: true,
			comment: true,
			answer: true,
			created_at: true,
			updated_at: true,
			status: true,
			user: {
				select: {
					id: true,
					firstname: true,
					lastname: true,
				},
			},
		},
	});
	return query;
};

export const getMyRatings = async (user_email: string, query_params?: MyRatingQueryParams) => {
	const full_text_search = query_params?.search && convertToAmpersandSeparated(query_params?.search);
	const query = await rating.findMany({
		where: {
			status: { equals: query_params?.status },
			user: {
				email: {
					equals: user_email,
				},
			},
			restaurant: {
				AND: [
					{
						restaurant_information: {
							city: { search: query_params?.city, mode: "insensitive" },
						},
					},
					{
						customization: {
							name: { search: full_text_search, mode: "insensitive" },
						},
					},
				],
			},
		},
		select: {
			id: true,
			rating: true,
			title: true,
			status: true,
			comment: true,
			answer: true,
			created_at: true,
			updated_at: true,
			restaurant: {
				select: {
					id: true,
					name: true,
					created_at: true,
					restaurant_information: {
						select: {
							city: true,
							country: true,
							address: true,
							restaurant_type: true,
							location: true,
						},
					},
					customization: {
						select: {
							name: true,
							headers_path: true,
						},
					},
					restaurant_stadistic: true,
				},
			},
		},
		orderBy: { status: "desc" },
	});
	return query;
};

export const updateRating = async (rating_id: string, rating_record: RatingUpdateRecord) => {
	const { id, ...rest } = rating_record;
	const query = await rating.update({
		where: { id: rating_id },
		data: {
			status: "finished",
			...rest,
		},
		select: {
			rating: true,
			title: true,
			comment: true,
			created_at: true,
		},
	});
	return query;
};

export const createRating = async (user_id: string, restaurant_id: string) => {
	const query = await rating.create({
		data: {
			status: "to_rate",
			user: {
				connect: {
					id: user_id,
				},
			},
			restaurant: {
				connect: {
					id: restaurant_id,
				},
			},
		},
	});
	return query;
};
