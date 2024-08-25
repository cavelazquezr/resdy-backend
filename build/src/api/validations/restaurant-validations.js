"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateRestaurantValidations = exports.createRestaurantValidations = void 0;
const handleValidate_1 = require("../../utils/handleValidate");
const validations_1 = require("../../utils/validations");
const createRestaurantValidations = async (payload) => {
    await (0, handleValidate_1.handleValidate)(async (errors) => {
        const restaurantExists = await (0, validations_1.checkIfRestaurantExists)(payload.name);
        if (restaurantExists) {
            errors.name = {
                status: 409,
                message: `Ya existe un restaurante con el nombre "${payload.name}"`,
            };
        }
        const userExists = await (0, validations_1.checkIfUserExists)(undefined, payload.email);
        if (userExists) {
            errors.email = {
                status: 409,
                message: `Ya existe un usuario con el email "${payload.email}"`,
            };
        }
    });
};
exports.createRestaurantValidations = createRestaurantValidations;
const updateRestaurantValidations = async (authorization, restaurant_id) => {
    await (0, handleValidate_1.handleValidate)(async (errors) => {
        const isRestaurantAdmin = await (0, validations_1.checkIfIsRestaurantAdmin)(authorization, restaurant_id);
        if (!isRestaurantAdmin) {
            errors.authorization = {
                message: `No estás autorizado para modificar categorías de este restaurante.`,
                status: 401,
            };
        }
    });
};
exports.updateRestaurantValidations = updateRestaurantValidations;
