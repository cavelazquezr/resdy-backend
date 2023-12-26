"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postUserHandler = void 0;
const prisma_1 = require("../../services/prisma");
const postUserHandler = async (props) => {
    const newUser = await prisma_1.client.user.create({ data: props });
    return newUser;
};
exports.postUserHandler = postUserHandler;
