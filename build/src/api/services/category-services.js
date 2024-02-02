"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategoriesService = exports.createCategoryService = exports.updateCategoryService = exports.getRestautantCategoriesService = void 0;
const category_models_1 = require("../models/category-models");
const getRestautantCategoriesService = async (restaurant_name) => {
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
exports.getRestautantCategoriesService = getRestautantCategoriesService;
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
const deleteCategoriesService = async (category_ids) => {
    await (0, category_models_1.deleteCategories)(category_ids);
};
exports.deleteCategoriesService = deleteCategoriesService;
