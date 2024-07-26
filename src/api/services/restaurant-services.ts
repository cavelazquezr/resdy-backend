import { Prisma } from "@prisma/client";
import jwt from "jsonwebtoken";
import {
	GetDiscoveryRestaurantsQueryParams,
	GetRestaurantsQueryParams,
	LandingRestaurantInfo,
	RestaurantCreateInput,
	RestaurantOutput,
	RestaurantRecord,
	UpdateRestaurantInput,
} from "../../types/restaurant";
import { calculatePriceAverage, calculateRatingAverage, getEmail } from "../../utils";
import {
	createRestaurant,
	getAllRestaurantTypes,
	getRestaurantSummary,
	getRestaurants,
	getRestaurantsByRating,
	updateRestaurant,
} from "../models/restaurant-models";
import { getCoordinates } from "../../utils/getCoordinates";
import { RestaurantCardOutput } from "../../types/common";
import { BoundRecord, filterResultsInBounds } from "../../utils/filterResultsInBounds";
import { ResultsSummary } from "../../types";
import { getObjectSignedUrl } from "../../services/aws/s3";

export const getRestaurantsService = async (query_params: GetRestaurantsQueryParams): Promise<RestaurantRecord[]> => {
	const restaurants = (await getRestaurants(query_params)) as any;
	const restaurantsRecord: RestaurantRecord[] = restaurants.map((restaurant) => {
		const { id, name, restaurant_information, customization } = restaurant;
		return {
			name,
			id,
			brand_name: customization?.name ?? null,
			headers_path: customization?.headers_path ?? null,
			city: restaurant_information?.city ?? "",
			address: restaurant_information?.address ?? "",
			phone: restaurant_information?.phone ?? "",
			country: restaurant_information?.country ?? "",
			restaurant_type: restaurant_information?.restaurant_type ?? "",
			description: restaurant_information?.description ?? null,
			rating: calculateRatingAverage(restaurant.ratings),
			rating_count: restaurant.ratings.length,
			price_average: calculatePriceAverage(restaurant.dishes),
			location: restaurant_information?.location as any | null,
			extra_information: restaurant_information?.extra_information ?? null,
			postal_code: restaurant_information?.postal_code ?? "",
			social_media: restaurant_information?.social_media ?? null,
		};
	});

	return restaurantsRecord;
};

export const getMyRestaurantService = async (authorization: string): Promise<RestaurantRecord> => {
	const email = getEmail(authorization);
	const restaurants = (await getRestaurants({ email })) as any;
	const restaurantsRecord: RestaurantRecord[] = restaurants.map((restaurant) => {
		const { id, name, restaurant_information, customization } = restaurant;
		return {
			id,
			name,
			brand_name: customization?.name ?? null,
			headers_path: customization?.headers_path ?? null,
			city: restaurant_information?.city ?? "",
			address: restaurant_information?.address ?? "",
			postal_code: restaurant_information?.postal_code ?? "",
			phone: restaurant_information?.phone ?? "",
			country: restaurant_information?.country ?? "",
			restaurant_type: restaurant_information?.restaurant_type ?? "",
			description: restaurant_information?.description ?? null,
			rating: calculateRatingAverage(restaurant.ratings),
			rating_count: restaurant.ratings.length,
			price_average: calculatePriceAverage(restaurant.dishes),
			location: restaurant_information?.location as any | null,
			extra_information: restaurant_information?.extra_information ?? null,
			social_media: restaurant_information?.social_media ?? {},
			headers: customization.headers_path && customization.headers_path.length > 0 ? customization.headers_path : null,
		};
	});

	return restaurantsRecord[0];
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

	const mapToRestaurantCardRecord = async (restaurants) => {
		return Promise.all(
			restaurants.map(async (restaurant) => {
				const headersUrlPromises = restaurant.customization
					? restaurant.customization.headers_path.map((path: string) => {
							return getObjectSignedUrl(path);
						})
					: [];

				const headers_url = await Promise.all(headersUrlPromises);

				return {
					name: restaurant.name,
					brand_name: restaurant.customization?.name ?? null,
					address: restaurant.restaurant_information?.address ?? null,
					city: restaurant.restaurant_information?.city ?? null,
					country: restaurant.restaurant_information?.country ?? null,
					headers_path: restaurant.customization?.headers_path ?? [],
					restaurant_type: restaurant.restaurant_information?.restaurant_type ?? null,
					price_average: restaurant.dishes ? calculatePriceAverage(restaurant.dishes) : 0,
					rating: restaurant.ratings ? calculateRatingAverage(restaurant.ratings) : 0,
					rating_count: restaurant.ratings ? restaurant.ratings.length : 0,
					headers_url,
				};
			}),
		);
	};

	const result: LandingRestaurantInfo = {
		best_rated: bestRated as any,
		most_visited: await mapToRestaurantCardRecord(mostVisited),
		new_restaurants: await mapToRestaurantCardRecord(newRestaurants),
		book_tonight: await mapToRestaurantCardRecord(mostVisited),
	};

	return result;
};

export const createRestaurantService = async (restaurant_input: RestaurantCreateInput): Promise<{ token: string }> => {
	const location = await getCoordinates({
		city: restaurant_input.city,
		address: restaurant_input.address,
		country: restaurant_input.country,
	});

	await createRestaurant({
		...restaurant_input,
		location: (location ?? { type: "Point", coordinates: [] }) as Prisma.InputJsonValue,
	});

	const token = jwt.sign({ email: restaurant_input.email }, "secretKey", { expiresIn: "1h" });
	return { token: token };
};

export const updateRestaurantService = async (
	restaurant_id: string,
	restaurant_input: Partial<UpdateRestaurantInput>,
): Promise<RestaurantOutput> => {
	const location = await getCoordinates({
		city: restaurant_input.city ?? "",
		address: restaurant_input.address ?? "",
		country: restaurant_input.country ?? "España",
	});

	const updatedRestaurant = await updateRestaurant(restaurant_id, {
		...restaurant_input,
		location: (location ?? { type: "Point", coordinates: [] }) as Prisma.InputJsonValue,
	});

	return updatedRestaurant;
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

			const headersUrlPromises = restaurant.customization
					? restaurant.customization.headers_path.map((path: string) => {
							return getObjectSignedUrl(path);
						})
					: [];

				const headers_url = await Promise.all(headersUrlPromises);

			return {
				id: restaurant_id,
				name: restaurant.name,
				status: null,
				brand_name: customization?.name ?? "",
				address: restaurant_information?.address ?? "",
				city: restaurant_information?.city ?? "",
				headers_path: customization?.headers_path ?? null,
				headers_url,
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
