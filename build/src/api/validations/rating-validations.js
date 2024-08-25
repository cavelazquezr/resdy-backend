"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.putRatingValidations = exports.getRestaurantRatingStatsValidations = exports.getRestaurantRatingsValidations = exports.getMyRatingsValidations = void 0;
const validations_1 = require("../../utils/validations");
const utils_1 = require("../../utils");
const rating_models_1 = require("../models/rating-models");
const handleValidate_1 = require("../../utils/handleValidate");
const getMyRatingsValidations = async (authorization) => {
    await (0, handleValidate_1.handleValidate)(async (errors) => {
        const { email } = (0, utils_1.verifyToken)(authorization);
        const userExists = await (0, validations_1.checkIfUserExists)(undefined, email);
        if (!userExists) {
            errors.user = { status: 404, message: "El usuario no existe" };
        }
    });
};
exports.getMyRatingsValidations = getMyRatingsValidations;
const getRestaurantRatingsValidations = async (restaurant_name) => {
    await (0, handleValidate_1.handleValidate)(async (errors) => {
        const restaurantExists = await (0, validations_1.checkIfRestaurantExists)(restaurant_name);
        if (!restaurantExists) {
            errors.restaurant = { status: 404, message: `El restaurante con el nombre "${restaurant_name}" no existe` };
        }
    });
};
exports.getRestaurantRatingsValidations = getRestaurantRatingsValidations;
const getRestaurantRatingStatsValidations = async (restaurant_name) => {
    await (0, handleValidate_1.handleValidate)(async (errors) => {
        const restaurantExists = await (0, validations_1.checkIfRestaurantExists)(restaurant_name);
        if (!restaurantExists) {
            errors.restaurant = { status: 403, message: `El restaurante con el nombre "${restaurant_name}" no existe` };
        }
    });
};
exports.getRestaurantRatingStatsValidations = getRestaurantRatingStatsValidations;
const putRatingValidations = async (authorization, rating_id) => {
    await (0, handleValidate_1.handleValidate)(async (errors) => {
        const rating = await (0, rating_models_1.getRatingById)(rating_id);
        if (!rating) {
            errors.rating = { status: 422, message: "La reseña no existe" };
        }
        const isOwner = await (0, validations_1.checkIfIsRatingOwner)(authorization, rating_id);
        if (!isOwner) {
            const canAnswer = await (0, validations_1.checkIfCanAnswer)(authorization, rating_id);
            if (!canAnswer) {
                errors.authorization = { status: 403, message: "No tienes permisos para modificar esta reseña" };
            }
        }
    });
};
exports.putRatingValidations = putRatingValidations;
