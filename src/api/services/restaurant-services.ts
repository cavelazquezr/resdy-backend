import { Prisma, Restaurant } from "@prisma/client";
import {
	GetRestaurantsQueryParams,
	LandingRestaurantInfo,
	RestaurantCardRecord,
	RestaurantCreateInput,
	RestaurantOutput,
	RestaurantRecord,
} from "../../types/restaurant";
import { calculatePriceAverage, calculateRatingAverage } from "../../utils";
import { createRestaurant, getRestaurants, getRestaurantsByRating } from "../models/restaurant-models";
import { getCoordinates } from "../../utils/getCoordinates";

export const getRestaurantsService = async (
	query_params: GetRestaurantsQueryParams,
): Promise<RestaurantRecord[] | string> => {
	const restaurants = await getRestaurants(query_params);
	const restaurantsRecord: RestaurantRecord[] = restaurants.map((restaurant) => {
		const { name, restaurant_information, customization } = restaurant;
		return {
			name,
			brand_name: customization?.name ?? null,
			header_url: customization?.header_url ?? null,
			city: restaurant_information?.city ?? "",
			address: restaurant_information?.address ?? "",
			phone: restaurant_information?.phone ?? "",
			country: restaurant_information?.country ?? "",
			restaurant_type: restaurant_information?.restaurant_type ?? "",
			description: restaurant_information?.description ?? null,
			rating: calculateRatingAverage(restaurant.ratings),
			rating_count: restaurant.ratings.length,
			price_average: calculatePriceAverage(restaurant.dishes),
			location: restaurant_information?.location as Prisma.JsonObject | null,
		};
	});

	return restaurantsRecord;
};

export const getLandingRestaurantsService = async (
	query_params: GetRestaurantsQueryParams,
): Promise<LandingRestaurantInfo | string> => {
	try {
		const bestRatedPromise = getRestaurantsByRating(query_params, 4);

		const mostVisitedPromise = getRestaurants(query_params, 4, { restaurant_stadistic: { total_bookings: "desc" } });

		const newestRestaurantsPromise = getRestaurants(query_params, 4, { created_at: "desc" });

		const [bestRated, mostVisited, newRestaurants] = await Promise.all([
			bestRatedPromise,
			mostVisitedPromise,
			newestRestaurantsPromise,
		]);

		const mapToRestaurantCardRecord = (restaurants) => {
			return restaurants.map((restaurant) => ({
				name: restaurant.name,
				brand_name: restaurant.customization?.name ?? null,
				address: restaurant.restaurant_information?.address ?? null,
				city: restaurant.restaurant_information?.city ?? null,
				country: restaurant.restaurant_information?.country ?? null,
				header_url: restaurant.customization?.header_url ?? null,
				restaurant_type: restaurant.restaurant_information?.restaurant_type ?? null,
				price_average: calculatePriceAverage(restaurant.dishes),
				rating: calculateRatingAverage(restaurant.ratings),
				rating_count: restaurant.ratings.length,
			}));
		};

		const result: LandingRestaurantInfo = {
			best_rated: bestRated,
			most_visited: mapToRestaurantCardRecord(mostVisited),
			new_restaurants: mapToRestaurantCardRecord(newRestaurants),
			book_tonight: mapToRestaurantCardRecord(mostVisited),
		};

		return result;
	} catch (error) {
		console.error("Error fetching landing restaurants:", error);
		return "Error fetching landing restaurants";
	}
};

export const createRestaurantService = async (
	restaurant: RestaurantCreateInput,
): Promise<RestaurantOutput | string> => {
	try {
		const location = await getCoordinates({
			city: restaurant.city,
			address: restaurant.address,
			country: restaurant.country,
		});
		console.log("location", location);
		const query = await createRestaurant({
			...restaurant,
			location: (location ?? { type: "Point", coordinates: [] }) as Prisma.InputJsonValue,
		});
		return query;
	} catch (error) {
		console.error("Error creating restaurant:", error);
		return "Error creating restaurant";
	}
};
