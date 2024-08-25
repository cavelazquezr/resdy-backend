"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDishValidation = exports.updateDishValidation = exports.postDishesValidations = exports.getDishesValidations = void 0;
const validations_1 = require("../../utils/validations");
const category_models_1 = require("../models/category-models");
const dish_models_1 = require("../models/dish-models");
const handleValidate_1 = require("../../utils/handleValidate");
const getDishesValidations = async (restaurant_name) => {
    await (0, handleValidate_1.handleValidate)(async (errors) => {
        const restaurantExists = await (0, validations_1.checkIfRestaurantExists)(restaurant_name);
        if (!restaurantExists) {
            errors.restaurant = { message: `El restaurante con el nombre "${restaurant_name}" no existe`, status: 404 };
        }
    });
};
exports.getDishesValidations = getDishesValidations;
const postDishesValidations = async (authorization, input) => {
    await (0, handleValidate_1.handleValidate)(async (errors) => {
        const categoryExists = await (0, validations_1.checkIfCategoryExists)(input.category_id);
        if (!categoryExists) {
            errors.category = { message: `La categoría con el id "${input.category_id}" no existe`, status: 404 };
        }
        const category = await (0, category_models_1.getCategoryById)(input.category_id);
        if (category) {
            const { restaurant_id } = category;
            const isRestaurantAdmin = await (0, validations_1.checkIfIsRestaurantAdmin)(authorization, restaurant_id);
            if (!isRestaurantAdmin) {
                errors.authorization = {
                    message: `No estás autorizado para crear platillos en este restaurante.`,
                    status: 401,
                };
            }
        }
    });
};
exports.postDishesValidations = postDishesValidations;
const updateDishValidation = async (authorization, dish_id, dish_input) => {
    await (0, handleValidate_1.handleValidate)(async (errors) => {
        const { hide, ...input } = dish_input;
        const dishExists = await (0, validations_1.checkIfDishExists)(dish_id);
        if (!dishExists) {
            errors.dish = { message: `El platillo con el id ${dish_id} no existe`, status: 404 };
        }
        const dish = await (0, dish_models_1.getDishById)(dish_id);
        if (dish) {
            const { restaurant_id, is_active } = dish;
            const isRestaurantAdmin = await (0, validations_1.checkIfIsRestaurantAdmin)(authorization, restaurant_id);
            if (!isRestaurantAdmin) {
                errors.authorization = {
                    message: `No estás autorizado para modificar platillos en este restaurante.`,
                    status: 401,
                };
            }
            if (is_active === true && hide === false) {
                errors.dish_input = { message: "No puedes mostrar un platillo que ya está mostrado", status: 422 };
            }
            if (is_active === false && hide === true) {
                errors.dish_input = { message: "No puedes ocultar un platillo que ya está oculto", status: 422 };
            }
        }
    });
};
exports.updateDishValidation = updateDishValidation;
const deleteDishValidation = async (authorization, dish_id) => {
    await (0, handleValidate_1.handleValidate)(async (errors) => {
        const dish = await (0, dish_models_1.getDishById)(dish_id);
        if (dish) {
            const { restaurant_id } = dish;
            const isRestaurantAdmin = await (0, validations_1.checkIfIsRestaurantAdmin)(authorization, restaurant_id);
            if (!isRestaurantAdmin) {
                errors.authorization = {
                    message: `No estás autorizado para eliminar platillos en este restaurante.`,
                    status: 401,
                };
            }
        }
    });
};
exports.deleteDishValidation = deleteDishValidation;
