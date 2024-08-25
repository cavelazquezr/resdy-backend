"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMyReservationValidations = exports.updateReservationValidation = exports.createReservationValidations = exports.getRestaurantReservationsValidations = void 0;
const validations_1 = require("../../utils/validations");
const reservation_models_1 = require("../models/reservation-models");
const utils_1 = require("../../utils");
const handleValidate_1 = require("../../utils/handleValidate");
const getRestaurantReservationsValidations = async (restaurant_name) => {
    await (0, handleValidate_1.handleValidate)(async (errors) => {
        const restaurantExists = await (0, validations_1.checkIfRestaurantExists)(restaurant_name);
        if (!restaurantExists) {
            errors.restaurant = {
                status: 404,
                message: `El restaurante con el nombre "${restaurant_name}" no existe`,
            };
        }
    });
};
exports.getRestaurantReservationsValidations = getRestaurantReservationsValidations;
const createReservationValidations = async (authorization, restaurant_name, reservation_input) => {
    await (0, handleValidate_1.handleValidate)(async (errors) => {
        const { date_of_reservation } = reservation_input;
        const { email: user_email } = (0, utils_1.verifyToken)(authorization);
        const restaurantExists = await (0, validations_1.checkIfRestaurantExists)(restaurant_name);
        if (!restaurantExists) {
            errors.restaurant = {
                status: 404,
                message: `El restaurante con el nombre "${restaurant_name}" no existe`,
            };
        }
        const currentTimestamp = new Date().getTime();
        if (date_of_reservation.getTime() < currentTimestamp) {
            errors.date = {
                status: 422,
                message: "No puedes crear una reserva para días pasados",
            };
        }
        const existsReservationForDate = await (0, validations_1.checkIfThereAreUserReservationsForDate)(user_email, restaurant_name, date_of_reservation);
        if (existsReservationForDate) {
            errors.reservation = {
                status: 422,
                message: "Ya tienes una reserva para este día",
            };
        }
    });
};
exports.createReservationValidations = createReservationValidations;
const updateReservationValidation = async (authorization, reservation_id) => {
    await (0, handleValidate_1.handleValidate)(async (errors) => {
        const reservation = await (0, reservation_models_1.getReservationById)(reservation_id);
        if (!reservation) {
            errors.reservation = {
                status: 404,
                message: `La reserva de id "${reservation_id}" no existe`,
            };
            return;
        }
        const isRestaurantAdmin = await (0, validations_1.checkIfIsRestaurantAdmin)(authorization, reservation.restaurant_id);
        if (!isRestaurantAdmin) {
            errors.authorization = {
                status: 401,
                message: `No estás autorizado para realizar esta acción`,
            };
        }
    });
};
exports.updateReservationValidation = updateReservationValidation;
const getMyReservationValidations = async (authorization) => {
    await (0, handleValidate_1.handleValidate)(async (errors) => {
        const { email } = (0, utils_1.verifyToken)(authorization);
        const userExists = await (0, validations_1.checkIfUserExists)(undefined, email);
        if (!userExists) {
            errors.user = {
                status: 404,
                message: `No existe el usuario con el email "${email}"`,
            };
        }
    });
};
exports.getMyReservationValidations = getMyReservationValidations;
