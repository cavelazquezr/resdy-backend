"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertToAmpersandSeparated = exports.getStatsFromRatings = exports.calculateRatingAverage = exports.calculatePriceAverage = exports.verifyToken = exports.getEmail = exports.isOAuthToken = void 0;
const tslib_1 = require("tslib");
const jsonwebtoken_1 = tslib_1.__importDefault(require("jsonwebtoken"));
const isOAuthToken = (token) => {
    return token.startsWith("Bearer ");
};
exports.isOAuthToken = isOAuthToken;
const getEmail = (token) => {
    if (!(0, exports.isOAuthToken)(token))
        return token.replace("Api-Key ", "");
    const decoded = jsonwebtoken_1.default.decode(token.replace("Bearer ", ""));
    return typeof decoded === "object" ? (decoded?.email || "").toLowerCase() : "";
};
exports.getEmail = getEmail;
const verifyToken = (authorization) => {
    if ((0, exports.isOAuthToken)(authorization)) {
        const token = authorization.replace("Bearer ", ""); // Remove the "Bearer " prefix
        return jsonwebtoken_1.default.verify(token, "secretKey");
    }
    else {
        throw new Error("Invalid token");
    }
};
exports.verifyToken = verifyToken;
const calculatePriceAverage = (dishes) => {
    if (dishes.length === 0) {
        return 0;
    }
    const total = dishes.reduce((sum, dish) => sum + parseFloat(dish.price.toString()), 0);
    const average = total / dishes.length;
    const roundedAverage = Math.round(average / 2) * 2;
    return roundedAverage;
};
exports.calculatePriceAverage = calculatePriceAverage;
const calculateRatingAverage = (rating) => {
    if (rating.length === 0) {
        return 0;
    }
    const total = rating.reduce((sum, rating) => sum + parseFloat(rating.rating ? rating.rating.toString() : "0"), 0);
    const average = total / rating.length;
    const roundedAverage = parseFloat(average.toFixed(1));
    return roundedAverage;
};
exports.calculateRatingAverage = calculateRatingAverage;
const getStatsFromRatings = (ratings) => {
    const ratingCounts = {
        "5": 0,
        "4": 0,
        "3": 0,
        "2": 0,
        "1": 0,
    };
    ratings.forEach((rating) => {
        if (rating.rating) {
            const ratingValue = rating.rating.toString();
            if (ratingCounts.hasOwnProperty(ratingValue)) {
                ratingCounts[ratingValue]++;
            }
        }
    });
    return ratingCounts;
};
exports.getStatsFromRatings = getStatsFromRatings;
const convertToAmpersandSeparated = (text) => {
    const wordsArray = text.split(" ");
    const resultString = wordsArray.filter((word) => word !== "").join(" & ");
    return resultString;
};
exports.convertToAmpersandSeparated = convertToAmpersandSeparated;
