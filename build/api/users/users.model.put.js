"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.putUserHandler = void 0;
const prisma_1 = require("../../services/prisma");
const messages_1 = require("../../types/messages");
const access_1 = require("../../services/access");
const putUserHandler = async (authorization, user, unauthorizedCallback) => {
    try {
        const decoded = (0, access_1.verifyToken)(authorization);
        if (decoded.email !== user.email) {
            return unauthorizedCallback(403, { reason: messages_1.UserStatus.UNAUTHORIZED });
        }
        const updatedUser = await prisma_1.client.user.update({
            where: { id: user.id },
            data: user,
        });
        if (!updatedUser) {
            return unauthorizedCallback(403, { reason: messages_1.UserStatus.NOT_FOUND });
        }
        return updatedUser;
    }
    catch {
        return unauthorizedCallback(403, { reason: messages_1.UserStatus.UNAUTHORIZED });
    }
};
exports.putUserHandler = putUserHandler;
