"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdminOfCurrentRestaurant = exports.verifyToken = exports.getEmail = exports.isOAuthToken = void 0;
const tslib_1 = require("tslib");
const jsonwebtoken_1 = tslib_1.__importDefault(require("jsonwebtoken"));
const client_1 = require("../config/client");
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
const isAdminOfCurrentRestaurant = async (authorization, restaurant_id) => {
    const { email } = (0, exports.verifyToken)(authorization);
    const admin = await client_1.client.user.findUnique({ where: { email: email } });
    const currentRestaurant = await client_1.client.restaurant.findUnique({
        where: { id: restaurant_id },
    });
    return admin?.id !== currentRestaurant?.admin_id;
};
exports.isAdminOfCurrentRestaurant = isAdminOfCurrentRestaurant;
