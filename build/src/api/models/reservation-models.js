"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMyReservations = exports.updateReservation = exports.createReservation = exports.getRestaurantReservations = exports.getReservationByUserAndDay = exports.getReservationById = void 0;
const tslib_1 = require("tslib");
const client_1 = tslib_1.__importDefault(require("../../config/client"));
const utils_1 = require("../../utils");
const { reservation } = client_1.default;
const getReservationById = async (reservation_id) => {
    const query = await reservation.findUnique({
        where: { id: reservation_id },
    });
    return query;
};
exports.getReservationById = getReservationById;
const getReservationByUserAndDay = async (user_email, restaurant_name, date_of_reservation) => {
    const startOfDay = new Date(date_of_reservation);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date_of_reservation);
    endOfDay.setHours(23, 59, 59, 999);
    const query = await reservation.findMany({
        where: {
            AND: [
                {
                    user: {
                        email: user_email,
                    },
                },
                {
                    restaurant: {
                        name: restaurant_name,
                    },
                },
                {
                    date_of_reservation: {
                        gte: startOfDay,
                        lte: endOfDay,
                    },
                },
            ],
        },
    });
    return query;
};
exports.getReservationByUserAndDay = getReservationByUserAndDay;
const getRestaurantReservations = async (restaurant_name) => {
    const query = await reservation.findMany({
        where: {
            restaurant: {
                name: restaurant_name,
            },
        },
        select: {
            id: true,
            number_of_person: true,
            date_of_reservation: true,
            status: true,
            created_at: true,
            updated_at: true,
            user_id: true,
            restaurant_id: true,
            user: {
                select: {
                    id: true,
                    firstname: true,
                    lastname: true,
                },
            },
        },
    });
    return query;
};
exports.getRestaurantReservations = getRestaurantReservations;
const createReservation = async (user_email, restaurant_name, reservation_input) => {
    const query = await reservation.create({
        data: {
            ...reservation_input,
            status: "to_be_confirmed",
            restaurant: {
                connect: {
                    name: restaurant_name,
                },
            },
            user: {
                connect: {
                    email: user_email,
                },
            },
        },
    });
    return query;
};
exports.createReservation = createReservation;
const updateReservation = async (reservation_id, reservation_input) => {
    const query = await reservation.update({
        where: {
            id: reservation_id,
        },
        data: {
            status: reservation_input.status,
        },
    });
    return query;
};
exports.updateReservation = updateReservation;
const getMyReservations = async (user_email, query_params) => {
    const full_text_search = query_params?.search && (0, utils_1.convertToAmpersandSeparated)(query_params?.search);
    const date_range_filter = query_params?.start_date && query_params?.end_date
        ? {
            gte: new Date(query_params.start_date),
            lte: new Date(query_params.end_date),
        }
        : undefined;
    const query = await reservation.findMany({
        where: {
            status: { in: query_params?.status?.split(",") },
            user: {
                email: {
                    equals: user_email,
                },
            },
            restaurant: {
                AND: [
                    {
                        restaurant_information: {
                            city: { search: query_params?.city, mode: "insensitive" },
                        },
                    },
                    {
                        customization: {
                            name: { search: full_text_search, mode: "insensitive" },
                        },
                    },
                ],
            },
            date_of_reservation: date_range_filter,
        },
        select: {
            id: true,
            status: true,
            date_of_reservation: true,
            number_of_person: true,
            restaurant: {
                select: {
                    id: true,
                    name: true,
                    created_at: true,
                    restaurant_information: {
                        select: {
                            city: true,
                            country: true,
                            address: true,
                            restaurant_type: true,
                            location: true,
                        },
                    },
                    customization: {
                        select: {
                            name: true,
                            headers_path: true,
                        },
                    },
                    restaurant_stadistic: true,
                },
            },
        },
        orderBy: { status: "desc" },
    });
    return query;
};
exports.getMyReservations = getMyReservations;
