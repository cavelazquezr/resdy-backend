import { Prisma } from "@prisma/client";
import { GetRestaurantsQueryParams, RestaurantOutput } from "../../types/restaurant";
import { calculatePriceAverage, calculateRatingAverage } from "../../utils";
import { getRestaurants } from "../models/restaurant-models";

export const getRestaurantsService = async (
	query_params: GetRestaurantsQueryParams,
): Promise<RestaurantOutput[] | string> => {
	const restaurants = await getRestaurants(query_params);
	const restaurantsRecord: RestaurantOutput[] = restaurants.map((restaurant) => {
		const { name, restaurant_information, customization } = restaurant;
		return {
			name,
			brand_name: customization?.name ?? undefined,
			logo_url: customization?.logo_url ?? undefined,
			header_url: customization?.header_url ?? undefined,
			city: restaurant_information?.city ?? undefined,
			address: restaurant_information?.address ?? undefined,
			phone: restaurant_information?.phone ?? undefined,
			country: restaurant_information?.country ?? undefined,
			restaurant_type: restaurant_information?.restaurant_type ?? undefined,
			description: restaurant_information?.description ?? undefined,
			rating: calculateRatingAverage(restaurant.ratings),
			rating_count: restaurant.ratings.length,
			price_average: calculatePriceAverage(restaurant.dishes),
			location: restaurant_information?.location as Prisma.JsonObject | undefined,
		};
	});

	return restaurantsRecord;
};
