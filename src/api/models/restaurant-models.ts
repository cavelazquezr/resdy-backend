import { GetRestaurantsQueryParams } from "../../types/restaurant";
import client from "../../config/client";

const { restaurant } = client;

export const getCurrentRestaurantInfoByName = async (restaurant_name: string) => {
	const query = await restaurant.findUnique({
		where: {
			name: restaurant_name,
		},
	});
	return query;
};

export const getRestaurants = async (query_params: GetRestaurantsQueryParams) => {
	const { name, city, country, restaurant_type } = query_params;
	const query = await restaurant.findMany({
		select: {
			id: true,
			name: true,
			restaurant_information: {
				select: {
					city: true,
					country: true,
					phone: true,
					address: true,
					restaurant_type: true,
					location: true,
					description: true,
				},
			},
			customization: {
				select: {
					name: true,
					logo_url: true,
					header_url: true,
				},
			},
			dishes: true,
			ratings: true,
		},
		where: {
			name: { equals: name, mode: "insensitive" },
			restaurant_information: {
				city: { contains: city, mode: "insensitive" },
				country: { contains: country, mode: "insensitive" },
				restaurant_type: { contains: restaurant_type, mode: "insensitive" },
			},
		},
	});
	return query;
};
