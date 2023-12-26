"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDishesHandler = void 0;
const messages_1 = require("../../../types/messages");
const prisma_1 = require("../../../services/prisma");
const getDishesHandler = async (restaurant_id, unauthorizedCallback) => {
    try {
        const dishes = await prisma_1.client.dishes.findMany({
            where: { restaurant_id: restaurant_id },
        });
        if (dishes.length === 0) {
            return unauthorizedCallback(403, { reason: messages_1.UserStatus.NOT_FOUND });
        }
        return dishes;
    }
    catch {
        return unauthorizedCallback(403, { reason: messages_1.UserStatus.UNAUTHORIZED });
    }
};
exports.getDishesHandler = getDishesHandler;
