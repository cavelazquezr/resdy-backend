"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRestaurantsService = void 0;
const utils_1 = require("../../utils");
const restaurant_models_1 = require("../models/restaurant-models");
const getRestaurantsService = async (query_params) => {
    const restaurants = await (0, restaurant_models_1.getRestaurants)(query_params);
    const restaurantsRecord = restaurants.map((restaurant) => {
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
            rating: (0, utils_1.calculateRatingAverage)(restaurant.ratings),
            rating_count: restaurant.ratings.length,
            price_average: (0, utils_1.calculatePriceAverage)(restaurant.dishes),
            location: restaurant_information?.location,
        };
    });
    return restaurantsRecord;
};
exports.getRestaurantsService = getRestaurantsService;
