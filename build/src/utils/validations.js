"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkIfCredentialMatches = exports.checkIfIsValidToken = exports.checkIfIsRatingOwner = exports.checkIfIsRestaurantAdmin = exports.checkIfUserExists = exports.checkIfDishExists = exports.checkIfCategoryIsUsed = exports.checkIfCategoryExists = exports.checkIfRatingExists = exports.checkIfRestaurantExists = void 0;
const tslib_1 = require("tslib");
const jsonwebtoken_1 = tslib_1.__importDefault(require("jsonwebtoken"));
const _1 = require(".");
const auth_models_1 = require("../api/models/auth-models");
const client_1 = require("../config/client");
const { user, restaurant, rating, category, dishes } = client_1.client;
const checkIfRestaurantExists = async (restaurant_name) => {
    return !!(await restaurant.findUnique({ where: { name: restaurant_name } }));
};
exports.checkIfRestaurantExists = checkIfRestaurantExists;
const checkIfRatingExists = async (rating_id) => {
    return !!(await rating.findUnique({ where: { id: rating_id } }));
};
exports.checkIfRatingExists = checkIfRatingExists;
const checkIfCategoryExists = async (category_id) => {
    return !!(await category.findUnique({ where: { id: category_id } }));
};
exports.checkIfCategoryExists = checkIfCategoryExists;
const checkIfCategoryIsUsed = async (category_id) => {
    const count = await dishes.count({
        where: {
            category: {
                id: category_id,
            },
        },
    });
    return count > 0;
};
exports.checkIfCategoryIsUsed = checkIfCategoryIsUsed;
const checkIfDishExists = async (dish_id) => {
    return !!(await dishes.findUnique({ where: { id: dish_id } }));
};
exports.checkIfDishExists = checkIfDishExists;
const checkIfUserExists = async (user_id, email) => {
    return !!(await user.findUnique({ where: { id: email ? undefined : user_id, email: email } }));
};
exports.checkIfUserExists = checkIfUserExists;
const checkIfIsRestaurantAdmin = async (authorization, restaurant_id) => {
    const { email } = (0, _1.verifyToken)(authorization);
    const user_query = await user.findUnique({ where: { email: email } });
    const restaurant_query = await restaurant.findUnique({
        where: { id: restaurant_id },
    });
    return user_query?.id === restaurant_query?.admin_id;
};
exports.checkIfIsRestaurantAdmin = checkIfIsRestaurantAdmin;
const checkIfIsRatingOwner = async (authorization, rating_id) => {
    const { email } = (0, _1.verifyToken)(authorization);
    const user_query = await user.findUnique({ where: { email: email } });
    const rating_query = await rating.findUnique({
        where: { id: rating_id },
    });
    return user_query?.id === rating_query?.user_id;
};
exports.checkIfIsRatingOwner = checkIfIsRatingOwner;
const checkIfIsValidToken = (authorization) => {
    const token = authorization.replace("Bearer ", ""); // Remove the "Bearer " prefix
    const decodedToken = jsonwebtoken_1.default.verify(token);
    return decodedToken.exp * 1000 > Date.now();
};
exports.checkIfIsValidToken = checkIfIsValidToken;
const checkIfCredentialMatches = async (credentials) => {
    const { email, password } = credentials;
    const user_query = await (0, auth_models_1.getUserByEmail)(email);
    return password === user_query?.password;
};
exports.checkIfCredentialMatches = checkIfCredentialMatches;
