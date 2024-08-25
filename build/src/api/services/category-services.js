"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCategoryOrderService = exports.deleteCategoriesService = exports.createCategoryService = exports.updateCategoryService = exports.getMyRestaurantCategoriesService = exports.getRestaurantCategoriesService = void 0;
const utils_1 = require("../../utils");
const validations_1 = require("../../utils/validations");
const category_models_1 = require("../models/category-models");
const getRestaurantCategoriesService = async (restaurant_name) => {
    const { categories, dishes } = await (0, category_models_1.getRestaurantCategories)(restaurant_name);
    const categoriesRecords = categories.map((category) => {
        const { id } = category;
        return {
            ...category,
            is_used: !!dishes.length &&
                dishes.some((dish) => {
                    return dish.category_id === id;
                }),
        };
    });
    return categoriesRecords;
};
exports.getRestaurantCategoriesService = getRestaurantCategoriesService;
const getMyRestaurantCategoriesService = async (authorization) => {
    const email = (0, utils_1.getEmail)(authorization);
    const { categories, dishes } = await (0, category_models_1.getMyRestaurantCategories)(email);
    const categoriesRecords = await Promise.all(categories.map(async (category) => {
        const isUsed = await (0, validations_1.checkIfCategoryIsUsed)(category.id);
        return {
            ...category,
            dishes: dishes.filter((dish) => dish.category_id === category.id).length,
            is_used: isUsed,
        };
    }));
    return categoriesRecords;
};
exports.getMyRestaurantCategoriesService = getMyRestaurantCategoriesService;
const updateCategoryService = async (category_id, category_input) => {
    const updatedCategory = await (0, category_models_1.updateCategory)(category_id, category_input);
    return updatedCategory;
};
exports.updateCategoryService = updateCategoryService;
const createCategoryService = async (category_id, category_input) => {
    const newCategory = await (0, category_models_1.createCategory)(category_id, category_input);
    return newCategory;
};
exports.createCategoryService = createCategoryService;
const deleteCategoriesService = async (category_id) => {
    await (0, category_models_1.deleteCategories)(category_id);
};
exports.deleteCategoriesService = deleteCategoriesService;
const updateCategoryOrderService = async (categories) => {
    await (0, category_models_1.updateCategoryOrder)(categories);
};
exports.updateCategoryOrderService = updateCategoryOrderService;
