"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDishes = exports.createDish = exports.updateDish = exports.getMyDishes = exports.getRestaurantDishesByCategories = exports.getDishById = void 0;
const tslib_1 = require("tslib");
const client_1 = tslib_1.__importDefault(require("../../config/client"));
const { category, dishes } = client_1.default;
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
const getMyDishes = async (email) => {
    const query = await dishes.findMany({
        where: {
            restaurant: {
                admin: {
                    email,
                },
            },
        },
        select: {
            id: true,
            restaurant_id: true,
            category_id: true,
            name: true,
            price: true,
            is_active: true,
            photo_url: true,
            allergen: true,
            description: true,
            created_at: true,
            updated_at: true,
            category: true,
        },
    });
    return query;
};
exports.getMyDishes = getMyDishes;
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
        select: {
            id: true,
            restaurant_id: true,
            category_id: true,
            name: true,
            price: true,
            is_active: true,
            photo_url: true,
            allergen: true,
            description: true,
            created_at: true,
            updated_at: true,
            category: true,
        },
    });
    return query;
};
exports.updateDish = updateDish;
const createDish = async (restaurant_name, dish) => {
    const { category_id, ...input } = dish;
    const query = await dishes.create({
        data: {
            ...input,
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
        select: {
            id: true,
            restaurant_id: true,
            category_id: true,
            name: true,
            price: true,
            is_active: true,
            photo_url: true,
            allergen: true,
            description: true,
            created_at: true,
            updated_at: true,
            category: true,
        },
    });
    return query;
};
exports.createDish = createDish;
const deleteDishes = async (dish_id) => {
    await dishes.delete({
        where: {
            id: dish_id,
        },
    });
};
exports.deleteDishes = deleteDishes;
