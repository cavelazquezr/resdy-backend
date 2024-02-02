"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDishValidation = exports.updateDishValidation = exports.postDishesValidations = exports.getDishesValidations = void 0;
const validations_1 = require("../../utils/validations");
const category_models_1 = require("../models/category-models");
const dish_models_1 = require("../models/dish-models");
const getDishesValidations = async (restaurant_name, notFoundCallback) => {
    const restaurantExists = await (0, validations_1.checkIfRestaurantExists)(restaurant_name);
    if (!restaurantExists) {
        return notFoundCallback(404, { details: `The restaurant with name "${restaurant_name}" does not exist.` });
    }
    return true;
};
exports.getDishesValidations = getDishesValidations;
const postDishesValidations = async (authorization, category_id, unauthorizedCallback, notFoundCallback) => {
    const categoryExists = await (0, validations_1.checkIfCategoryExists)(category_id);
    if (!categoryExists) {
        return notFoundCallback(404, {
            details: `Category of id ${category_id} does not exist.`,
        });
    }
    const category = await (0, category_models_1.getCategoryById)(category_id);
    if (category) {
        const { restaurant_id } = category;
        const isRestaurantAdmin = await (0, validations_1.checkIfIsRestaurantAdmin)(authorization, restaurant_id);
        if (!isRestaurantAdmin) {
            return unauthorizedCallback(401, { details: `You are not authorized to create dishes in this restaurant.` });
        }
    }
    return true;
};
exports.postDishesValidations = postDishesValidations;
const updateDishValidation = async (authorization, dish_id, dish_input, unauthorizedCallback, notFoundCallback, unprocessableCallback) => {
    const { hide, ...input } = dish_input;
    const dishExists = await (0, validations_1.checkIfDishExists)(dish_id);
    if (!dishExists) {
        return notFoundCallback(404, {
            details: `Dish of id ${dish_id} does not exist.`,
        });
    }
    const dish = await (0, dish_models_1.getDishById)(dish_id);
    if (dish) {
        const { restaurant_id, is_active } = dish;
        const isRestaurantAdmin = await (0, validations_1.checkIfIsRestaurantAdmin)(authorization, restaurant_id);
        if (!isRestaurantAdmin) {
            return unauthorizedCallback(401, { details: `You are not authorized to modify dishes of this restaurant.` });
        }
        if (is_active === true && hide === false) {
            return unprocessableCallback(422, {
                details: `You can not show a dish that is already shown`,
            });
        }
        if (is_active === false && hide === true) {
            return unprocessableCallback(422, {
                details: `You can not hide a dish that is already hidden`,
            });
        }
        const unprocessableBody = Object.values(input).length > 0 && !!dish_input.hide;
        if (unprocessableBody) {
            return unprocessableCallback(422, {
                details: `You can not modify dish's properties and hide/show a category at same time`,
            });
        }
    }
    return true;
};
exports.updateDishValidation = updateDishValidation;
const deleteDishValidation = async (authorization, dish_ids, unauthorizedCallback, notFoundCallback) => {
    const invalidDishIds = [];
    await Promise.all(dish_ids.map(async (dish_id) => {
        const dishExists = await (0, validations_1.checkIfDishExists)(dish_id);
        if (!dishExists) {
            invalidDishIds.push(dish_id);
        }
    }));
    if (invalidDishIds.length > 0) {
        return Promise.reject(notFoundCallback(404, {
            details: `The dish(es) with id(s) ${invalidDishIds.join(", ")} do(es) not exist.`,
        }));
    }
    const dish = await (0, dish_models_1.getDishById)(dish_ids[0]);
    if (dish) {
        const { restaurant_id } = dish;
        const isRestaurantAdmin = await (0, validations_1.checkIfIsRestaurantAdmin)(authorization, restaurant_id);
        if (!isRestaurantAdmin) {
            return Promise.reject(unauthorizedCallback(401, { details: `You are not authorized to delete dishes of this restaurant.` }));
        }
    }
    return true;
};
exports.deleteDishValidation = deleteDishValidation;
