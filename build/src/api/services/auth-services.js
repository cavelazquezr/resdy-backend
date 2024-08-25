"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserInfo = exports.createUserService = exports.authenticateUserService = exports.getCurrentUserService = void 0;
const tslib_1 = require("tslib");
const jsonwebtoken_1 = tslib_1.__importDefault(require("jsonwebtoken"));
const auth_models_1 = require("../models/auth-models");
const utils_1 = require("../../utils");
const s3_1 = require("../../services/aws/s3");
const getCurrentUserService = async (authorization) => {
    const current_user = (await (0, auth_models_1.getCurrentUserInfo)(authorization));
    const avatar_url = current_user.avatar_path ? await (0, s3_1.getObjectSignedUrl)(current_user.avatar_path) : undefined;
    return { ...current_user, avatar_url: avatar_url ? avatar_url : undefined };
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
const updateUserInfo = async (authorization, payload) => {
    const { email } = (0, utils_1.verifyToken)(authorization);
    const updated_user = await (0, auth_models_1.updateUser)(email, payload);
    return updated_user;
};
exports.updateUserInfo = updateUserInfo;
