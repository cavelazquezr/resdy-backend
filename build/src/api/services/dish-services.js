"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDishesService = exports.postDishesService = exports.updateDishService = exports.getMyDishesService = exports.getDishesService = void 0;
const utils_1 = require("../../utils");
const dish_models_1 = require("../models/dish-models");
const getDishesService = async (restaurant_name) => {
    const categoriesAndDishes = await (0, dish_models_1.getRestaurantDishesByCategories)(restaurant_name);
    const dishesRecord = categoriesAndDishes.map((category) => {
        const { label, dishes } = category;
        return {
            category: label,
            dishes: dishes,
        };
    });
    return dishesRecord;
};
exports.getDishesService = getDishesService;
const getMyDishesService = async (authorization) => {
    const email = (0, utils_1.getEmail)(authorization);
    const dishes = await (0, dish_models_1.getMyDishes)(email);
    return dishes;
};
exports.getMyDishesService = getMyDishesService;
const updateDishService = async (dish_id, dish_input) => {
    const updatedDish = await (0, dish_models_1.updateDish)(dish_id, dish_input);
    return updatedDish;
};
exports.updateDishService = updateDishService;
const postDishesService = async (restaurant_name, dish_input) => {
    const newDish = await (0, dish_models_1.createDish)(restaurant_name, dish_input);
    return newDish;
};
exports.postDishesService = postDishesService;
const deleteDishesService = async (dish_id) => {
    await (0, dish_models_1.deleteDishes)(dish_id);
};
exports.deleteDishesService = deleteDishesService;
