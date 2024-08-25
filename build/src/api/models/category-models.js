"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCategoryOrder = exports.deleteCategories = exports.createCategory = exports.updateCategory = exports.getMyRestaurantCategories = exports.getRestaurantCategories = exports.getCategoryById = void 0;
const tslib_1 = require("tslib");
const client_1 = tslib_1.__importDefault(require("../../config/client"));
const { category } = client_1.default;
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
    const transaction = await client_1.default.$transaction(async (tx) => {
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
const getMyRestaurantCategories = async (email) => {
    const transaction = await client_1.default.$transaction(async (tx) => {
        const categoriesQuery = await tx.category.findMany({
            where: {
                restaurant: {
                    admin: {
                        email: email,
                    },
                },
            },
            select: {
                id: true,
                label: true,
                is_active: true,
                created_at: true,
                updated_at: true,
                order: true,
            },
            orderBy: {
                order: "asc",
            },
        });
        const dishesQuery = await tx.dishes.findMany({
            where: {
                restaurant: {
                    admin: {
                        email: email,
                    },
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
exports.getMyRestaurantCategories = getMyRestaurantCategories;
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
const deleteCategories = async (category_id) => {
    await category.delete({
        where: {
            id: category_id,
        },
    });
};
exports.deleteCategories = deleteCategories;
const updateCategoryOrder = async (categories) => {
    const transaction = await client_1.default.$transaction(categories.map((category) => client_1.default.category.update({
        where: { id: category.id },
        data: { order: category.order },
    })));
    return transaction;
};
exports.updateCategoryOrder = updateCategoryOrder;
