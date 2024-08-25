"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRating = exports.updateRating = exports.getMyRatings = exports.getRestaurantRatings = exports.getRatingsCountFromRestautant = exports.getRatingsFromRestaurant = exports.getRatingById = void 0;
const tslib_1 = require("tslib");
const utils_1 = require("../../utils");
const client_1 = tslib_1.__importDefault(require("../../config/client"));
const { rating } = client_1.default;
const getRatingById = async (rating_id) => {
    const query = await rating.findUnique({
        where: { id: rating_id },
    });
    return query;
};
exports.getRatingById = getRatingById;
const getRatingsFromRestaurant = async (restaurant_name) => {
    const query = await rating.findMany({
        where: {
            restaurant: { name: restaurant_name },
        },
    });
    return query;
};
exports.getRatingsFromRestaurant = getRatingsFromRestaurant;
const getRatingsCountFromRestautant = async (restaurant_name) => {
    const query = await rating.count({
        where: {
            restaurant: { name: restaurant_name },
        },
    });
    return query;
};
exports.getRatingsCountFromRestautant = getRatingsCountFromRestautant;
const getRestaurantRatings = async (restaurant_name) => {
    const query = await rating.findMany({
        where: {
            restaurant: {
                name: restaurant_name,
            },
            status: "finished",
        },
        select: {
            id: true,
            rating: true,
            title: true,
            comment: true,
            answer: true,
            created_at: true,
            updated_at: true,
            status: true,
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
exports.getRestaurantRatings = getRestaurantRatings;
const getMyRatings = async (user_email, query_params) => {
    const full_text_search = query_params?.search && (0, utils_1.convertToAmpersandSeparated)(query_params?.search);
    const query = await rating.findMany({
        where: {
            status: { equals: query_params?.status },
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
        },
        select: {
            id: true,
            rating: true,
            title: true,
            status: true,
            comment: true,
            answer: true,
            created_at: true,
            updated_at: true,
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
exports.getMyRatings = getMyRatings;
const updateRating = async (rating_id, rating_record) => {
    const { id, ...rest } = rating_record;
    const query = await rating.update({
        where: { id: rating_id },
        data: {
            status: "finished",
            ...rest,
        },
        select: {
            rating: true,
            title: true,
            comment: true,
            created_at: true,
        },
    });
    return query;
};
exports.updateRating = updateRating;
const createRating = async (user_id, restaurant_id) => {
    const query = await rating.create({
        data: {
            status: "to_rate",
            user: {
                connect: {
                    id: user_id,
                },
            },
            restaurant: {
                connect: {
                    id: restaurant_id,
                },
            },
        },
    });
    return query;
};
exports.createRating = createRating;
