"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.createNewUser = exports.getUserByEmail = exports.getCurrentUserInfo = void 0;
const tslib_1 = require("tslib");
const utils_1 = require("../../utils");
const client_1 = tslib_1.__importDefault(require("../../config/client"));
const { user } = client_1.default;
const getCurrentUserInfo = async (authorization) => {
    const { email } = (0, utils_1.verifyToken)(authorization);
    const query = await user.findUnique({
        where: { email: email },
        select: {
            id: true,
            email: true,
            firstname: true,
            lastname: true,
            phone: true,
            created_at: true,
            is_active: true,
            is_owner: true,
            avatar_path: true,
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
const updateUser = async (user_email, payload) => {
    const updateData = { ...payload };
    if (updateData.old_password) {
        const { old_password, ...cleanedInput } = updateData;
        const cleanData = cleanedInput;
        const query = await user.update({
            where: {
                email: user_email,
            },
            data: cleanData,
        });
        return query;
    }
    const query = await user.update({
        where: {
            email: user_email,
        },
        data: updateData,
    });
    return query;
};
exports.updateUser = updateUser;
