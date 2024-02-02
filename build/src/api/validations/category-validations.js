"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategoriesValidation = exports.createCategoryValidations = exports.updateCategoryValidation = exports.getRestautantCategoriesValidations = void 0;
const validations_1 = require("../../utils/validations");
const category_models_1 = require("../models/category-models");
const restaurant_models_1 = require("../models/restaurant-models");
const getRestautantCategoriesValidations = async (restaurant_name, notFoundCallback) => {
    const restaurantExists = await (0, validations_1.checkIfRestaurantExists)(restaurant_name);
    if (!restaurantExists) {
        return notFoundCallback(404, { details: `The restaurant with name "${restaurant_name}" does not exist.` });
    }
    return true;
};
exports.getRestautantCategoriesValidations = getRestautantCategoriesValidations;
const updateCategoryValidation = async (authorization, category_id, category_input, unauthorizedCallback, notFoundCallback, unprocessableCallback) => {
    const categoryExists = await (0, validations_1.checkIfCategoryExists)(category_id);
    if (!categoryExists) {
        return notFoundCallback(404, {
            details: `Category of id ${category_id} does not exist.`,
        });
    }
    const category = await (0, category_models_1.getCategoryById)(category_id);
    if (category) {
        const { restaurant_id, is_active } = category;
        const isRestaurantAdmin = await (0, validations_1.checkIfIsRestaurantAdmin)(authorization, restaurant_id);
        if (!isRestaurantAdmin) {
            return unauthorizedCallback(401, { details: `You are not authorized to modify categories of this restaurant.` });
        }
        if (is_active === true && category_input.hide === false) {
            return unprocessableCallback(422, {
                details: `You can not show a category that is already shown`,
            });
        }
        if (is_active === false && category_input.hide === true) {
            return unprocessableCallback(422, {
                details: `You can not hide a category that is already hidden`,
            });
        }
        const unprocessableBody = !!category_input.label && !!category_input.hide;
        if (unprocessableBody) {
            return unprocessableCallback(422, {
                details: `You can not modify category's label and hide/show a category at same time`,
            });
        }
    }
    return true;
};
exports.updateCategoryValidation = updateCategoryValidation;
const createCategoryValidations = async (authorization, restaurant_name, unauthorizedCallback, notFoundCallback) => {
    const restaurantExists = await (0, validations_1.checkIfRestaurantExists)(restaurant_name);
    if (!restaurantExists) {
        return notFoundCallback(404, {
            details: `Restaurant of id ${restaurant_name} does not exist.`,
        });
    }
    const restaurant = await (0, restaurant_models_1.getCurrentRestaurantInfoByName)(restaurant_name);
    if (restaurant) {
        const isRestaurantAdmin = await (0, validations_1.checkIfIsRestaurantAdmin)(authorization, restaurant.id);
        if (!isRestaurantAdmin) {
            return unauthorizedCallback(401, { details: `You are not authorized to create dishes in this restaurant.` });
        }
    }
    return true;
};
exports.createCategoryValidations = createCategoryValidations;
const deleteCategoriesValidation = async (authorization, category_ids, unauthorizedCallback, notFoundCallback, unprocessableCallback) => {
    const invalidCategoryIds = [];
    const usedCategoryIds = [];
    await Promise.all(category_ids.map(async (category_id) => {
        const dishExists = await (0, validations_1.checkIfCategoryExists)(category_id);
        if (!dishExists) {
            invalidCategoryIds.push(category_id);
        }
        const usedCategory = await (0, validations_1.checkIfCategoryIsUsed)(category_id);
        if (usedCategory) {
            usedCategoryIds.push(category_id);
        }
    }));
    console.log("usedCategoryIds", usedCategoryIds);
    if (invalidCategoryIds.length > 0) {
        return Promise.reject(notFoundCallback(404, {
            details: `The category/categories  with id(s) ${invalidCategoryIds.join(", ")} do(es) not exist.`,
        }));
    }
    if (usedCategoryIds.length > 0) {
        return Promise.reject(unprocessableCallback(422, {
            details: `The category/categories with the id(s) ${invalidCategoryIds.join(", ")} cannot be deleted as they contain associated dishes.`,
        }));
    }
    const category = await (0, category_models_1.getCategoryById)(category_ids[0]);
    if (category) {
        const { restaurant_id } = category;
        const isRestaurantAdmin = await (0, validations_1.checkIfIsRestaurantAdmin)(authorization, restaurant_id);
        if (!isRestaurantAdmin) {
            return Promise.reject(unauthorizedCallback(401, { details: `You are not authorized to delete dishes of this restaurant.` }));
        }
    }
    return true;
};
exports.deleteCategoriesValidation = deleteCategoriesValidation;
