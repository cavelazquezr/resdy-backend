"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMenuValidations = void 0;
const validations_1 = require("../../utils/validations");
const handleValidate_1 = require("../../utils/handleValidate");
const getMenuValidations = async (restaurant_name) => {
    await (0, handleValidate_1.handleValidate)(async (errors) => {
        const restaurantExists = await (0, validations_1.checkIfRestaurantExists)(restaurant_name);
        if (!restaurantExists) {
            errors.restaurant = { message: `El restaurante con el nombre "${restaurant_name}" no existe`, status: 404 };
        }
    });
};
exports.getMenuValidations = getMenuValidations;
