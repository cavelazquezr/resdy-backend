"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.putRatingValidations = exports.getRestaurantRatingStatsValidations = exports.getRestaurantRatingsValidations = exports.getMyRatingsValidations = void 0;
const messages_1 = require("../../types/messages");
const validations_1 = require("../../utils/validations");
const utils_1 = require("../../utils");
const rating_models_1 = require("../models/rating-models");
const getMyRatingsValidations = async (authorization, unauthorizedCallback) => {
    const { email } = (0, utils_1.verifyToken)(authorization);
    const userExists = await (0, validations_1.checkIfUserExists)(undefined, email);
    if (!userExists) {
        return unauthorizedCallback(403, { reason: messages_1.UserStatus.USER_NOT_FOUND });
    }
    return true;
};
exports.getMyRatingsValidations = getMyRatingsValidations;
const getRestaurantRatingsValidations = async (restaurant_name, unauthorizedCallback) => {
    const restaurantExists = await (0, validations_1.checkIfRestaurantExists)(restaurant_name);
    if (!restaurantExists) {
        return unauthorizedCallback(403, { reason: messages_1.UserStatus.WEB_DOESNT_EXIST });
    }
    return true;
};
exports.getRestaurantRatingsValidations = getRestaurantRatingsValidations;
const getRestaurantRatingStatsValidations = async (restaurant_name, unauthorizedCallback) => {
    const restaurantExists = await (0, validations_1.checkIfRestaurantExists)(restaurant_name);
    if (!restaurantExists) {
        return unauthorizedCallback(403, { reason: messages_1.UserStatus.WEB_DOESNT_EXIST });
    }
    return true;
};
exports.getRestaurantRatingStatsValidations = getRestaurantRatingStatsValidations;
const putRatingValidations = async (authorization, rating_id, unauthorizedCallback) => {
    const rating = await (0, rating_models_1.getRatingById)(rating_id);
    if (rating?.status === "finished") {
        return unauthorizedCallback(403, { reason: messages_1.UserStatus.RATING_IS_FINISHED });
    }
    if (!rating) {
        return unauthorizedCallback(403, { reason: messages_1.UserStatus.NOT_FOUND });
    }
    const isOwner = await (0, validations_1.checkIfIsRatingOwner)(authorization, rating_id);
    if (!isOwner) {
        return unauthorizedCallback(403, { reason: messages_1.UserStatus.UNAUTHORIZED });
    }
    return true;
};
exports.putRatingValidations = putRatingValidations;
