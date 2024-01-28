import { MyRatingQueryParams, UpdateRatingRecord } from "../../types/rating";
import { convertToAmpersandSeparated } from "../../utils";
import { client } from "../../config/client";

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
		orderBy: { status: "desc" },
	});
	return query;
};

export const updateRating = async (rating_id: string, rating_record: UpdateRatingRecord) => {
	const query = await rating.update({
		where: { id: rating_id },
		data: {
			status: "finished",
			...rating_record,
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
