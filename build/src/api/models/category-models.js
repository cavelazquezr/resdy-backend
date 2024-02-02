"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategories = exports.createCategory = exports.updateCategory = exports.getRestaurantCategories = exports.getCategoryById = void 0;
const client_1 = require("../../config/client");
const { category } = client_1.client;
const getCategoryById = async (category_id) => {
    const query = await category.findUnique({
        where: {
            id: category_id,
        },
    });
    return query;
};
exports.getCategoryById = getCategoryById;
const getRestaurantCategories = async (restaurant_name) => {
    const transaction = await client_1.client.$transaction(async (tx) => {
        const categoriesQuery = await tx.category.findMany({
            where: {
                restaurant: {
                    name: restaurant_name,
                },
            },
            select: {
                id: true,
                label: true,
                is_active: true,
                created_at: true,
                updated_at: true,
            },
        });
        const dishesQuery = await tx.dishes.findMany({
            where: {
                restaurant: {
                    name: restaurant_name,
                },
            },
            select: {
                category_id: true,
            },
        });
        return { categories: categoriesQuery, dishes: dishesQuery };
    });
    return transaction;
};
exports.getRestaurantCategories = getRestaurantCategories;
const updateCategory = async (category_id, category_input) => {
    const { hide, ...input } = category_input;
    const query = await category.update({
        where: {
            id: category_id,
        },
        data: {
            ...input,
            is_active: hide ? false : true,
        },
    });
    return query;
};
exports.updateCategory = updateCategory;
const createCategory = async (restaurant_name, category_input) => {
    const query = await category.create({
        data: {
            ...category_input,
            restaurant: {
                connect: {
                    name: restaurant_name,
                },
            },
        },
    });
    return query;
};
exports.createCategory = createCategory;
const deleteCategories = async (category_ids) => {
    await category.deleteMany({
        where: {
            id: {
                in: category_ids,
            },
        },
    });
};
exports.deleteCategories = deleteCategories;
