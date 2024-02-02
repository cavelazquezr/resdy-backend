"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDishes = exports.createDish = exports.updateDish = exports.getRestaurantDishesByCategories = exports.getDishById = void 0;
const client_1 = require("../../config/client");
const { category, dishes } = client_1.client;
const getDishById = async (dish_id) => {
    const query = await dishes.findUnique({
        where: {
            id: dish_id,
        },
    });
    return query;
};
exports.getDishById = getDishById;
const getRestaurantDishesByCategories = async (restaurant_name) => {
    const query = await category.findMany({
        where: {
            restaurant: {
                name: restaurant_name,
            },
        },
        select: {
            label: true,
            dishes: true,
        },
    });
    return query;
};
exports.getRestaurantDishesByCategories = getRestaurantDishesByCategories;
const updateDish = async (dish_id, dish_input) => {
    const { hide, ...input } = dish_input;
    const query = await dishes.update({
        where: {
            id: dish_id,
        },
        data: {
            ...input,
            is_active: hide ? false : true,
        },
    });
    return query;
};
exports.updateDish = updateDish;
const createDish = async (restaurant_name, category_id, dish) => {
    const query = await dishes.create({
        data: {
            ...dish,
            category: {
                connect: {
                    id: category_id,
                },
            },
            restaurant: {
                connect: {
                    name: restaurant_name,
                },
            },
        },
    });
    return query;
};
exports.createDish = createDish;
const deleteDishes = async (dish_ids) => {
    await dishes.deleteMany({
        where: {
            id: {
                in: dish_ids,
            },
        },
    });
};
exports.deleteDishes = deleteDishes;
