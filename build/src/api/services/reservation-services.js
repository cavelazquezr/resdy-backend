"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMyReservationsService = exports.updateReservationService = exports.createReservationService = exports.getRestaurantReservationsService = void 0;
const utils_1 = require("../../utils");
const reservation_models_1 = require("../models/reservation-models");
const rating_models_1 = require("../models/rating-models");
const validations_1 = require("../../utils/validations");
const auth_models_1 = require("../models/auth-models");
const s3_1 = require("../../services/aws/s3");
const restaurant_models_1 = require("../models/restaurant-models");
const getRestaurantReservationsService = async (restaurant_name) => {
    const reservations = await (0, reservation_models_1.getRestaurantReservations)(restaurant_name);
    const reservation_records = reservations.map(async (rating) => {
        const { user, ...ratingRecord } = rating;
        const defaultRatingRecord = {
            id: ratingRecord.id,
            number_of_person: ratingRecord.number_of_person,
            date_of_reservation: ratingRecord.date_of_reservation,
            status: ratingRecord.status,
            created_at: ratingRecord.created_at,
            updated_at: ratingRecord.updated_at ?? null,
            user_id: ratingRecord.user_id,
            restaurant_id: ratingRecord.restaurant_id,
        };
        return Promise.resolve({
            ...defaultRatingRecord,
            user: {
                firstname: user.firstname,
                lastname: user.lastname ?? null,
                avatar_url: (await (0, s3_1.getObjectSignedUrl)(`users/${user.id}/${user.id}-avatar`)) ?? undefined,
            },
        });
    });
    return Promise.all(reservation_records);
};
exports.getRestaurantReservationsService = getRestaurantReservationsService;
const createReservationService = async (authorization, restaurant_name, reservation_input) => {
    const { email: user_email } = (0, utils_1.verifyToken)(authorization);
    const newReservation = await (0, reservation_models_1.createReservation)(user_email, restaurant_name, reservation_input);
    return newReservation;
};
exports.createReservationService = createReservationService;
const updateReservationService = async (reservation_id, reservation_input) => {
    try {
        const updatedReservation = await (0, reservation_models_1.updateReservation)(reservation_id, reservation_input);
        if (updatedReservation.status === "finished") {
            const { user_id, restaurant_id } = updatedReservation;
            const hasRatedRestaurant = await (0, validations_1.checkIfIsUserHasRatedRestaurant)(user_id, restaurant_id);
            if (!hasRatedRestaurant) {
                await (0, rating_models_1.createRating)(user_id, restaurant_id);
            }
        }
        return updatedReservation;
    }
    catch (err) {
        return Promise.reject(err);
    }
};
exports.updateReservationService = updateReservationService;
const getMyReservationsService = async (authorization, query_params) => {
    const current_user = await (0, auth_models_1.getCurrentUserInfo)(authorization);
    if (current_user) {
        const reservations = await (0, reservation_models_1.getMyReservations)(current_user.email, query_params);
        const reservation_records = await Promise.all(reservations.map(async (reservation) => {
            const { restaurant: { id: restaurant_id, name, customization, restaurant_information, created_at, restaurant_stadistic, }, ...reservation_record } = reservation;
            const restaurant_summary = await (0, restaurant_models_1.getRestaurantSummary)(restaurant_id);
            const headersUrlPromises = customization
                ? customization.headers_path.map((path) => {
                    return (0, s3_1.getObjectSignedUrl)(path);
                })
                : [];
            const headers_url = await Promise.all(headersUrlPromises);
            return {
                id: reservation_record.id,
                name: name,
                status: reservation_record.status,
                brand_name: customization?.name ?? "",
                address: restaurant_information?.address ?? "",
                city: restaurant_information?.city ?? "",
                headers_path: customization?.headers_path ?? null,
                headers_url,
                restaurant_type: restaurant_information?.restaurant_type ?? "",
                location: restaurant_information?.location,
                summary: {
                    rating: restaurant_summary.rating,
                    rating_count: restaurant_summary.rating_count,
                    price_average: restaurant_summary.price_average,
                },
                detail: {
                    number_of_person: reservation_record.number_of_person,
                    date_of_reservation: reservation_record.date_of_reservation,
                },
                created_at: created_at,
                total_bookings: restaurant_stadistic?.total_bookings ?? 0,
            };
        }));
        return reservation_records;
    }
    return [];
};
exports.getMyReservationsService = getMyReservationsService;
