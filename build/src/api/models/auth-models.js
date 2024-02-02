"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNewUser = exports.getUserByEmail = exports.getCurrentUserInfo = void 0;
const utils_1 = require("../../utils");
const client_1 = require("../../config/client");
const { user } = client_1.client;
const getCurrentUserInfo = async (authorization) => {
    const { email } = (0, utils_1.verifyToken)(authorization);
    const query = await user.findUnique({
        where: { email: email },
        select: {
            id: true,
            email: true,
            firstname: true,
            lastname: true,
            avatar_url: true,
            created_at: true,
            is_active: true,
            is_owner: true,
        },
    });
    return query;
};
exports.getCurrentUserInfo = getCurrentUserInfo;
const getUserByEmail = async (email) => {
    const query = await user.findUnique({
        where: { email: email },
    });
    return query;
};
exports.getUserByEmail = getUserByEmail;
const createNewUser = async (user_record) => {
    const query = await user.create({ data: user_record });
    return query;
};
exports.createNewUser = createNewUser;
