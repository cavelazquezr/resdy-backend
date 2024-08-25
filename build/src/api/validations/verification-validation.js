"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyIfNameIsUsedValidations = exports.verifyIfEmailIsUsedValidations = void 0;
const handleValidate_1 = require("../../utils/handleValidate");
const validations_1 = require("../../utils/validations");
const verifyIfEmailIsUsedValidations = async (email) => {
    await (0, handleValidate_1.handleValidate)(async (errors) => {
        const userExists = await (0, validations_1.checkIfUserExists)(undefined, email);
        if (userExists) {
            errors.email = {
                status: 409,
                message: "Este correo ya está en uso",
            };
        }
    });
};
exports.verifyIfEmailIsUsedValidations = verifyIfEmailIsUsedValidations;
const verifyIfNameIsUsedValidations = async (name) => {
    await (0, handleValidate_1.handleValidate)(async (errors) => {
        const restaurantExists = await (0, validations_1.checkIfRestaurantNameIsUsed)(name);
        if (restaurantExists) {
            errors.name = {
                status: 409,
                message: "Este nombre de restaurante ya está en uso",
            };
        }
    });
};
exports.verifyIfNameIsUsedValidations = verifyIfNameIsUsedValidations;
