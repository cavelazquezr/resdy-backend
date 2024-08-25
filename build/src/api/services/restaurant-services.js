"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDiscoveryRestaurants = exports.updateRestaurantService = exports.createRestaurantService = exports.getLandingRestaurantsService = exports.getMyRestaurantService = exports.getRestaurantsService = void 0;
const tslib_1 = require("tslib");
const jsonwebtoken_1 = tslib_1.__importDefault(require("jsonwebtoken"));
const utils_1 = require("../../utils");
const restaurant_models_1 = require("../models/restaurant-models");
const getCoordinates_1 = require("../../utils/getCoordinates");
const filterResultsInBounds_1 = require("../../utils/filterResultsInBounds");
const s3_1 = require("../../services/aws/s3");
const getRestaurantsService = async (query_params) => {
    const restaurants = (await (0, restaurant_models_1.getRestaurants)(query_params));
    return await Promise.all(restaurants.map(async (restaurant) => {
        const { id, name, restaurant_information, customization } = restaurant;
        const headersUrlPromises = restaurant.customization
            ? restaurant.customization.headers_path.map((path) => {
                return (0, s3_1.getObjectSignedUrl)(path);
            })
            : [];
        const headers_url = await Promise.all(headersUrlPromises);
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
            rating: (0, utils_1.calculateRatingAverage)(restaurant.ratings),
            rating_count: restaurant.ratings.length,
            price_average: (0, utils_1.calculatePriceAverage)(restaurant.dishes),
            location: restaurant_information?.location,
            extra_information: restaurant_information?.extra_information ?? null,
            postal_code: restaurant_information?.postal_code ?? "",
            social_media: restaurant_information?.social_media ?? null,
            headers_url,
        };
    }));
};
exports.getRestaurantsService = getRestaurantsService;
const getMyRestaurantService = async (authorization) => {
    const email = (0, utils_1.getEmail)(authorization);
    const restaurants = (await (0, restaurant_models_1.getRestaurants)({ email }));
    const restaurantsRecord = restaurants.map((restaurant) => {
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
            rating: (0, utils_1.calculateRatingAverage)(restaurant.ratings),
            rating_count: restaurant.ratings.length,
            price_average: (0, utils_1.calculatePriceAverage)(restaurant.dishes),
            location: restaurant_information?.location,
            extra_information: restaurant_information?.extra_information ?? null,
            social_media: restaurant_information?.social_media ?? {},
            headers: customization.headers_path && customization.headers_path.length > 0 ? customization.headers_path : null,
        };
    });
    return restaurantsRecord[0];
};
exports.getMyRestaurantService = getMyRestaurantService;
const getLandingRestaurantsService = async (query_params) => {
    const bestRatedPromise = (0, restaurant_models_1.getRestaurantsByRating)(query_params, 4);
    const mostVisitedPromise = (0, restaurant_models_1.getRestaurants)(query_params, 4, { restaurant_stadistic: { total_bookings: "desc" } });
    const newestRestaurantsPromise = (0, restaurant_models_1.getRestaurants)(query_params, 4, { created_at: "desc" });
    const [bestRated, mostVisited, newRestaurants] = await Promise.all([
        bestRatedPromise,
        mostVisitedPromise,
        newestRestaurantsPromise,
    ]);
    const mapToRestaurantCardRecord = async (restaurants) => {
        return Promise.all(restaurants.map(async (restaurant) => {
            const headersUrlPromises = restaurant.customization
                ? restaurant.customization.headers_path.map((path) => {
                    return (0, s3_1.getObjectSignedUrl)(path);
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
                price_average: restaurant.dishes ? (0, utils_1.calculatePriceAverage)(restaurant.dishes) : 0,
                rating: restaurant.ratings ? (0, utils_1.calculateRatingAverage)(restaurant.ratings) : 0,
                rating_count: restaurant.ratings ? restaurant.ratings.length : 0,
                headers_url,
            };
        }));
    };
    const result = {
        best_rated: bestRated,
        most_visited: await mapToRestaurantCardRecord(mostVisited),
        new_restaurants: await mapToRestaurantCardRecord(newRestaurants),
        book_tonight: await mapToRestaurantCardRecord(mostVisited),
    };
    return result;
};
exports.getLandingRestaurantsService = getLandingRestaurantsService;
const createRestaurantService = async (restaurant_input) => {
    const location = await (0, getCoordinates_1.getCoordinates)({
        city: restaurant_input.city,
        address: restaurant_input.address,
        country: restaurant_input.country,
    });
    await (0, restaurant_models_1.createRestaurant)({
        ...restaurant_input,
        location: (location ?? { type: "Point", coordinates: [] }),
    });
    const token = jsonwebtoken_1.default.sign({ email: restaurant_input.email }, "secretKey", { expiresIn: "1h" });
    return { token: token };
};
exports.createRestaurantService = createRestaurantService;
const updateRestaurantService = async (restaurant_id, restaurant_input) => {
    const location = await (0, getCoordinates_1.getCoordinates)({
        city: restaurant_input.city ?? "",
        address: restaurant_input.address ?? "",
        country: restaurant_input.country ?? "España",
    });
    const updatedRestaurant = await (0, restaurant_models_1.updateRestaurant)(restaurant_id, {
        ...restaurant_input,
        location: (location ?? { type: "Point", coordinates: [] }),
    });
    return updatedRestaurant;
};
exports.updateRestaurantService = updateRestaurantService;
const getDiscoveryRestaurants = async (query_params) => {
    const bounds = {
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
    const restaurants = await (0, restaurant_models_1.getRestaurants)(query_params);
    const result_restaurants = hasBounds
        ? (0, filterResultsInBounds_1.filterResultsInBounds)(restaurants, bounds)
        : restaurants;
    const restaurant_records = await Promise.all(result_restaurants.map(async (restaurant) => {
        const { id: restaurant_id, restaurant_information, customization } = restaurant;
        const restaurant_summary = await (0, restaurant_models_1.getRestaurantSummary)(restaurant_id);
        const headersUrlPromises = restaurant.customization
            ? restaurant.customization.headers_path.map((path) => {
                return (0, s3_1.getObjectSignedUrl)(path);
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
            location: restaurant_information?.location,
            summary: {
                rating: restaurant_summary.rating,
                rating_count: restaurant_summary.rating_count,
                price_average: restaurant_summary.price_average,
            },
            detail: null,
            created_at: restaurant.created_at,
            total_bookings: restaurant.restaurant_stadistic?.total_bookings ?? 0,
        };
    }));
    const type_options = await (0, restaurant_models_1.getAllRestaurantTypes)();
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
exports.getDiscoveryRestaurants = getDiscoveryRestaurants;
