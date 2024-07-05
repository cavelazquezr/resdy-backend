import { Prisma } from "@prisma/client";
import jwt from "jsonwebtoken";
import {
	GetDiscoveryRestaurantsQueryParams,
	GetRestaurantsQueryParams,
	LandingRestaurantInfo,
	RestaurantCreateInput,
	RestaurantRecord,
} from "../../types/restaurant";
import { calculatePriceAverage, calculateRatingAverage } from "../../utils";
import {
	createRestaurant,
	getAllRestaurantTypes,
	getRestaurantSummary,
	getRestaurants,
	getRestaurantsByRating,
} from "../models/restaurant-models";
import { getCoordinates } from "../../utils/getCoordinates";
import { RestaurantCardOutput } from "../../types/common";
import { BoundRecord, filterResultsInBounds } from "../../utils/filterResultsInBounds";
import { ResultsSummary } from "../../types";

export const getRestaurantsService = async (
	query_params: GetRestaurantsQueryParams,
): Promise<RestaurantRecord[]> => {
	const restaurants = (await getRestaurants(query_params)) as any;
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
): Promise<LandingRestaurantInfo> => {
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
};

export const createRestaurantService = async (restaurant: RestaurantCreateInput): Promise<{ token: string }> => {
	const location = await getCoordinates({
		city: restaurant.city,
		address: restaurant.address,
		country: restaurant.country,
	});

	await createRestaurant({
		...restaurant,
		location: (location ?? { type: "Point", coordinates: [] }) as Prisma.InputJsonValue,
	});

	const token = jwt.sign({ email: restaurant.email }, "secretKey", { expiresIn: "1h" });
	return { token: token };
};

export const getDiscoveryRestaurants = async (
	query_params: GetDiscoveryRestaurantsQueryParams,
): Promise<ResultsSummary<RestaurantCardOutput<unknown>>> => {
	const bounds: BoundRecord = {
		sw: {
			swLat: query_params.swLat ?? 0,
			swLng: query_params.swLng ?? 0,
		},
		ne: {
			neLat: query_params.neLat ?? 0,
			neLng: query_params.neLng ?? 0,
		},
	};

	const hasBounds = !!(query_params.swLat && query_params.swLng && query_params.neLat && query_params.neLng);

	const restaurants = await getRestaurants(query_params);

	const result_restaurants = hasBounds
		? (filterResultsInBounds(restaurants, bounds) as typeof restaurants)
		: restaurants;

	const restaurant_records: Array<RestaurantCardOutput<unknown>> = await Promise.all(
		result_restaurants.map(async (restaurant) => {
			const { id: restaurant_id, restaurant_information, customization } = restaurant;
			const restaurant_summary = await getRestaurantSummary(restaurant_id);

			return {
				id: restaurant_id,
				name: restaurant.name,
				status: null,
				brand_name: customization?.name ?? "",
				address: restaurant_information?.address ?? "",
				city: restaurant_information?.city ?? "",
				header_url: customization?.header_url ?? null,
				restaurant_type: restaurant_information?.restaurant_type ?? "",
				location: restaurant_information?.location as any,
				summary: {
					rating: restaurant_summary.rating,
					rating_count: restaurant_summary.rating_count,
					price_average: restaurant_summary.price_average,
				},
				detail: null,
				created_at: restaurant.created_at,
				total_bookings: restaurant.restaurant_stadistic?.total_bookings ?? 0,
			};
		}),
	);

	const type_options = await getAllRestaurantTypes();

	switch (query_params.sortBy) {
		case "rating":
			restaurant_records.sort((a, b) => b.summary.rating - a.summary.rating);
			break;
		case "visits":
			restaurant_records.sort((a, b) => b.summary.rating_count - a.summary.rating_count);
			break;
		case "new":
			restaurant_records.sort((a, b) => {
				const dateA = new Date(a.created_at ?? 0).getTime();
				const dateB = new Date(b.created_at ?? 0).getTime();
				return dateB - dateA;
			});
			break;
		default:
			break;
	}
	return { count: restaurant_records.length, options: type_options, results: restaurant_records };
};
