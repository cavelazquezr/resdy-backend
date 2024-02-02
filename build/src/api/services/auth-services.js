"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserService = exports.authenticateUserService = exports.getCurrentUserService = void 0;
const tslib_1 = require("tslib");
const jsonwebtoken_1 = tslib_1.__importDefault(require("jsonwebtoken"));
const auth_models_1 = require("../models/auth-models");
const getCurrentUserService = async (authorization) => {
    const current_user = await (0, auth_models_1.getCurrentUserInfo)(authorization);
    return current_user;
};
exports.getCurrentUserService = getCurrentUserService;
const authenticateUserService = async (credentials) => {
    const { email } = credentials;
    const token = jsonwebtoken_1.default.sign({ email }, "secretKey", { expiresIn: "1h" });
    return { token: token };
};
exports.authenticateUserService = authenticateUserService;
const createUserService = async (user_record) => {
    const new_user = await (0, auth_models_1.createNewUser)(user_record);
    return new_user;
};
exports.createUserService = createUserService;
