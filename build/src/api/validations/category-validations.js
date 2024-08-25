"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reorderCategoriesValidation = exports.deleteCategoriesValidation = exports.createCategoryValidations = exports.updateCategoryValidation = exports.getRestaurantCategoriesValidations = void 0;
const validations_1 = require("../../utils/validations");
const category_models_1 = require("../models/category-models");
const restaurant_models_1 = require("../models/restaurant-models");
const handleValidate_1 = require("../../utils/handleValidate");
const getRestaurantCategoriesValidations = async (restaurant_name) => {
    await (0, handleValidate_1.handleValidate)(async (errors) => {
        const restaurantExists = await (0, validations_1.checkIfRestaurantExists)(restaurant_name);
        if (!restaurantExists) {
            errors.restaurant = { message: `El restaurante con el nombre "${restaurant_name}" no existe`, status: 404 };
        }
    });
};
exports.getRestaurantCategoriesValidations = getRestaurantCategoriesValidations;
const updateCategoryValidation = async (authorization, category_id, category_input) => {
    await (0, handleValidate_1.handleValidate)(async (errors) => {
        const categoryExists = await (0, validations_1.checkIfCategoryExists)(category_id);
        if (!categoryExists) {
            errors.category = { message: `La categoría con el id ${category_id} no existe`, status: 404 };
        }
        const category = await (0, category_models_1.getCategoryById)(category_id);
        if (category) {
            const { restaurant_id, is_active } = category;
            const isRestaurantAdmin = await (0, validations_1.checkIfIsRestaurantAdmin)(authorization, restaurant_id);
            if (!isRestaurantAdmin) {
                errors.authorization = {
                    message: `No estás autorizado para modificar categorías de este restaurante.`,
                    status: 401,
                };
            }
            if (is_active === true && category_input.hide === false) {
                errors.category_input = { message: "No puedes mostrar una categoría que ya está mostrada", status: 422 };
            }
            if (is_active === false && category_input.hide === true) {
                errors.category_input = { message: "No puedes ocultar una categoría que ya está oculta", status: 422 };
            }
        }
    });
};
exports.updateCategoryValidation = updateCategoryValidation;
const createCategoryValidations = async (authorization, restaurant_name) => {
    await (0, handleValidate_1.handleValidate)(async (errors) => {
        const restaurantExists = await (0, validations_1.checkIfRestaurantExists)(restaurant_name);
        if (!restaurantExists) {
            errors.restaurant = { message: `El restaurante con el nombre "${restaurant_name}" no existe`, status: 404 };
        }
        const restaurant = await (0, restaurant_models_1.getCurrentRestaurantInfoByName)(restaurant_name);
        if (restaurant) {
            const isRestaurantAdmin = await (0, validations_1.checkIfIsRestaurantAdmin)(authorization, restaurant.id);
            if (!isRestaurantAdmin) {
                errors.authorization = {
                    message: `No estás autorizado para crear categorías en este restaurante.`,
                    status: 401,
                };
            }
        }
    });
};
exports.createCategoryValidations = createCategoryValidations;
const deleteCategoriesValidation = async (authorization, category_id) => {
    await (0, handleValidate_1.handleValidate)(async (errors) => {
        const category = await (0, category_models_1.getCategoryById)(category_id);
        if (category) {
            const { restaurant_id } = category;
            const isRestaurantAdmin = await (0, validations_1.checkIfIsRestaurantAdmin)(authorization, restaurant_id);
            if (!isRestaurantAdmin) {
                errors.authorization = {
                    message: `No estás autorizado para eliminar categorías de este restaurante.`,
                    status: 401,
                };
            }
        }
        else {
            errors.category = { message: `La categoría con el id ${category_id} no existe`, status: 404 };
        }
    });
};
exports.deleteCategoriesValidation = deleteCategoriesValidation;
const reorderCategoriesValidation = async (authorization, categories) => {
    await (0, handleValidate_1.handleValidate)(async (errors) => {
        // Verifica que la lista de categorías tenga el formato correcto
        if (!Array.isArray(categories) ||
            categories.some((cat) => typeof cat.id !== "string" || typeof cat.order !== "number")) {
            errors.categories = { message: "Formato de datos inválido.", status: 400 };
        }
        // Verifica si el usuario tiene permisos para modificar las categorías
        for (const category of categories) {
            const categoryExists = await (0, validations_1.checkIfCategoryExists)(category.id);
            if (!categoryExists) {
                errors.categories = { message: `La categoría con el id ${category.id} no existe`, status: 404 };
            }
            else {
                const categoryData = await (0, category_models_1.getCategoryById)(category.id);
                if (categoryData) {
                    const isRestaurantAdmin = await (0, validations_1.checkIfIsRestaurantAdmin)(authorization, categoryData.restaurant_id);
                    if (!isRestaurantAdmin) {
                        errors.authorization = {
                            message: `No estás autorizado para reordenar categorías en este restaurante.`,
                            status: 401,
                        };
                        break;
                    }
                }
            }
        }
    });
};
exports.reorderCategoriesValidation = reorderCategoriesValidation;
