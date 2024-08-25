"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.putRatingService = exports.getMyRatingsService = exports.getRestaurantRatingStatsService = exports.getRestaurantRatingsService = void 0;
const rating_models_1 = require("../models/rating-models");
const auth_models_1 = require("../models/auth-models");
const utils_1 = require("../../utils");
const s3_1 = require("../../services/aws/s3");
const restaurant_models_1 = require("../models/restaurant-models");
const getRestaurantRatingsService = async (restaurant_name) => {
    const ratings = await (0, rating_models_1.getRestaurantRatings)(restaurant_name);
    const rating_records = ratings.map(async (rating) => {
        const { user, ...ratingRecord } = rating;
        const defaultRatingRecord = {
            id: ratingRecord.id,
            rating: ratingRecord.rating ?? null,
            title: ratingRecord.title ?? null,
            comment: ratingRecord.comment ?? null,
            created_at: ratingRecord.created_at,
            status: ratingRecord.status,
            replied_at: ratingRecord.updated_at ?? null,
            answer: ratingRecord.answer ?? null,
        };
        return Promise.resolve({
            ...defaultRatingRecord,
            user_info: {
                firstname: user.firstname,
                lastname: user.lastname ?? undefined,
                avatar_url: (await (0, s3_1.getObjectSignedUrl)(`users/${user.id}/${user.id}-avatar`)) ?? undefined,
            },
        });
    });
    return Promise.all(rating_records);
};
exports.getRestaurantRatingsService = getRestaurantRatingsService;
const getRestaurantRatingStatsService = async (restaurant_name) => {
    const ratings = await (0, rating_models_1.getRatingsFromRestaurant)(restaurant_name);
    const ratings_count = await (0, rating_models_1.getRatingsCountFromRestautant)(restaurant_name);
    const rating_records = {
        rating: (0, utils_1.calculateRatingAverage)(ratings).toString(),
        rating_count: ratings_count,
        stats: (0, utils_1.getStatsFromRatings)(ratings),
        answered_ratings: ratings.filter((rating) => rating.answer).length,
        unanswered_ratings: ratings.filter((rating) => !rating.answer).length,
    };
    return rating_records;
};
exports.getRestaurantRatingStatsService = getRestaurantRatingStatsService;
const getMyRatingsService = async (authorization, query_params) => {
    const current_user = await (0, auth_models_1.getCurrentUserInfo)(authorization);
    if (current_user) {
        const ratings = await (0, rating_models_1.getMyRatings)(current_user.email, query_params);
        const rating_records = await Promise.all(ratings.map(async (rating) => {
            const { restaurant: { id: restaurant_id, name, customization, restaurant_information, restaurant_stadistic, created_at, }, ...rating_record } = rating;
            const restaurant_summary = await (0, restaurant_models_1.getRestaurantSummary)(restaurant_id);
            const headersUrlPromises = customization
                ? customization.headers_path.map((path) => {
                    return (0, s3_1.getObjectSignedUrl)(path);
                })
                : [];
            const headers_url = await Promise.all(headersUrlPromises);
            return {
                id: rating_record.id,
                name: name,
                status: rating_record.status,
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
                    rating: rating_record.rating ?? null,
                    title: rating_record.title ?? null,
                    comment: rating_record.comment ?? null,
                    answer: rating_record.answer ?? null,
                    created_at: rating_record.created_at,
                    replied_at: rating_record.updated_at ?? null,
                },
                created_at: created_at,
                total_bookings: restaurant_stadistic?.total_bookings ?? 0,
            };
        }));
        return rating_records;
    }
    return [];
};
exports.getMyRatingsService = getMyRatingsService;
const putRatingService = async (rating_id, rating_record) => {
    const rating = await (0, rating_models_1.updateRating)(rating_id, rating_record);
    return rating;
};
exports.putRatingService = putRatingService;
