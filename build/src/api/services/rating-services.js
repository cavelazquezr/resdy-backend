"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.putRatingService = exports.getMyRatingsService = exports.getRestaurantRatingStatsService = exports.getRestaurantRatingsService = void 0;
const rating_models_1 = require("../models/rating-models");
const auth_models_1 = require("../models/auth-models");
const utils_1 = require("../../utils");
const getRestaurantRatingsService = async (restaurant_name) => {
    const ratings = await (0, rating_models_1.getRestaurantRatings)(restaurant_name);
    const rating_records = ratings.map((rating) => {
        const { user, ...ratingRecord } = rating;
        return {
            rating: ratingRecord.rating ?? undefined,
            title: ratingRecord.title ?? undefined,
            comment: ratingRecord.comment ?? undefined,
            created_at: ratingRecord.created_at,
            user_info: {
                ...user,
                avatar_url: user.avatar_url ?? undefined,
            },
            replied_at: ratingRecord.updated_at ?? undefined,
            answer: ratingRecord.answer ?? undefined,
        };
    });
    return rating_records;
};
exports.getRestaurantRatingsService = getRestaurantRatingsService;
const getRestaurantRatingStatsService = async (restaurant_name) => {
    const ratings = await (0, rating_models_1.getRatingsFromRestaurant)(restaurant_name);
    const ratings_count = await (0, rating_models_1.getRatingsCountFromRestautant)(restaurant_name);
    const rating_records = {
        rating: (0, utils_1.calculateRatingAverage)(ratings).toString(),
        rating_count: ratings_count,
        stats: (0, utils_1.getStatsFromRatings)(ratings),
    };
    return rating_records;
};
exports.getRestaurantRatingStatsService = getRestaurantRatingStatsService;
const getMyRatingsService = async (authorization, query_params) => {
    const current_user = await (0, auth_models_1.getCurrentUserInfo)(authorization);
    if (current_user) {
        const ratings = await (0, rating_models_1.getMyRatings)(current_user.email, query_params);
        const rating_records = ratings.map((rating) => {
            const { restaurant: { name, customization, restaurant_information }, ...ratingRecord } = rating;
            return {
                id: rating.id,
                name,
                brand_name: customization?.name ?? undefined,
                header_url: customization?.header_url ?? undefined,
                city: restaurant_information?.city ?? undefined,
                address: restaurant_information?.address ?? undefined,
                restaurant_type: restaurant_information?.restaurant_type ?? undefined,
                rating_info: {
                    status: ratingRecord.status,
                    created_at: ratingRecord.created_at,
                    rating: ratingRecord.rating ?? undefined,
                    title: ratingRecord.title ?? undefined,
                    comment: ratingRecord.comment ?? undefined,
                    replied_at: ratingRecord.updated_at ?? undefined,
                    answer: ratingRecord.answer ?? undefined,
                },
            };
        });
        return {
            ratings: rating_records,
        };
    }
    return {
        ratings: [],
    };
};
exports.getMyRatingsService = getMyRatingsService;
const putRatingService = async (rating_id, rating_record) => {
    const rating = await (0, rating_models_1.updateRating)(rating_id, rating_record);
    return rating;
};
exports.putRatingService = putRatingService;
