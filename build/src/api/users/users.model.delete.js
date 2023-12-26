"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserHandler = void 0;
const prisma_1 = require("../../services/prisma");
const messages_1 = require("../../types/messages");
const access_1 = require("../../services/access");
const deleteUserHandler = async (authorization, id, unauthorizedCallback) => {
    try {
        const decoded = (0, access_1.verifyToken)(authorization);
        const userToDelete = await prisma_1.client.user.findUnique({ where: { id } });
        if (!userToDelete) {
            return unauthorizedCallback(403, { reason: messages_1.UserStatus.NOT_FOUND });
        }
        if (decoded.email !== userToDelete.email) {
            return unauthorizedCallback(403, { reason: messages_1.UserStatus.UNAUTHORIZED });
        }
        const deletedUser = await prisma_1.client.user.delete({
            where: { id: userToDelete.id },
        });
        return deletedUser;
    }
    catch {
        return unauthorizedCallback(403, { reason: messages_1.UserStatus.UNAUTHORIZED });
    }
};
exports.deleteUserHandler = deleteUserHandler;
