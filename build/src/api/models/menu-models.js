"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRestaurantCategoriesWithDishes = void 0;
const client_1 = require("../../config/client");
const { category } = client_1.client;
const getRestaurantCategoriesWithDishes = async (restaurant_name) => {
    const query = await category.findMany({
        where: {
            is_active: true,
            restaurant: {
                name: restaurant_name,
            },
            dishes: {
                some: {
                    is_active: true,
                },
            },
        },
        select: {
            label: true,
            dishes: {
                select: {
                    name: true,
                    price: true,
                    description: true,
                    photo_url: true,
                    allergen: true,
                },
            },
        },
    });
    return query;
};
exports.getRestaurantCategoriesWithDishes = getRestaurantCategoriesWithDishes;
