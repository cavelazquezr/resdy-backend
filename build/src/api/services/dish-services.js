"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDishesService = exports.postDishesService = exports.updateDishService = exports.getDishesService = void 0;
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
const updateDishService = async (dish_id, dish_input) => {
    const updatedDish = await (0, dish_models_1.updateDish)(dish_id, dish_input);
    return updatedDish;
};
exports.updateDishService = updateDishService;
const postDishesService = async (restaurant_name, category_id, dish_input) => {
    const newDish = await (0, dish_models_1.createDish)(restaurant_name, category_id, dish_input);
    return newDish;
};
exports.postDishesService = postDishesService;
const deleteDishesService = async (dish_ids) => {
    await (0, dish_models_1.deleteDishes)(dish_ids);
};
exports.deleteDishesService = deleteDishesService;
