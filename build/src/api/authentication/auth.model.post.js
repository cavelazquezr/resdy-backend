"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateUserHandler = void 0;
const tslib_1 = require("tslib");
const jsonwebtoken_1 = tslib_1.__importDefault(require("jsonwebtoken"));
const prisma_1 = require("../../services/prisma");
const messages_1 = require("../../types/messages");
const authenticateUserHandler = async (credentials, unauthorizedCallback) => {
    const { email, password } = credentials;
    const user = await prisma_1.client.user.findUnique({
        where: { email },
    });
    if (!user || user.password !== password) {
        return unauthorizedCallback(403, { reason: messages_1.UserStatus.INCORRECT_CREDENTIALS });
    }
    // Generate and return the JWT token
    const token = jsonwebtoken_1.default.sign({ email }, "secretKey");
    return { token: token };
};
exports.authenticateUserHandler = authenticateUserHandler;
