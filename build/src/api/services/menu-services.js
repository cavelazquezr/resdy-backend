"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMenuService = void 0;
const menu_models_1 = require("../models/menu-models");
const getMenuService = async (restaurant_name) => {
    const categoriesAndDishes = await (0, menu_models_1.getRestaurantCategoriesWithDishes)(restaurant_name);
    const menuRecords = categoriesAndDishes.map((category) => {
        const { label, dishes } = category;
        return {
            category: label,
            dishes: dishes,
        };
    });
    return menuRecords;
};
exports.getMenuService = getMenuService;
