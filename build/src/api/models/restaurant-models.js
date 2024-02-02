"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRestaurants = exports.getCurrentRestaurantInfoByName = void 0;
const client_1 = require("../../config/client");
const { restaurant } = client_1.client;
const getCurrentRestaurantInfoByName = async (restaurant_name) => {
    const query = await restaurant.findUnique({
        where: {
            name: restaurant_name,
        },
    });
    return query;
};
exports.getCurrentRestaurantInfoByName = getCurrentRestaurantInfoByName;
const getRestaurants = async (query_params) => {
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
exports.getRestaurants = getRestaurants;
