"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsersHandler = void 0;
const prisma_1 = require("../../services/prisma");
const messages_1 = require("../../types/messages");
const getUsersHandler = async (props) => {
    const users = await prisma_1.client.user.findMany({ where: props });
    if (users.length === 0) {
        return messages_1.UserStatus.NOT_FOUND;
    }
    return users;
};
exports.getUsersHandler = getUsersHandler;
