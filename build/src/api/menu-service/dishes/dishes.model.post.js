"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postDishesHandler = void 0;
const access_1 = require("../../../services/access");
const prisma_1 = require("../../../services/prisma");
const messages_1 = require("../../../types/messages");
const postDishesHandler = async (authorization, restaurant_id, category_id, dish, unauthorizedCallback) => {
    try {
        const isAdmin = (0, access_1.isAdminOfCurrentRestaurant)(authorization, restaurant_id);
        if (!isAdmin) {
            return unauthorizedCallback(403, { reason: messages_1.UserStatus.UNAUTHORIZED });
        }
        const createdDish = await prisma_1.client.dishes.create({
            data: {
                ...dish,
                restaurant: { connect: { id: restaurant_id } },
                category: { connect: { id: category_id } },
            },
        });
        return createdDish;
    }
    catch {
        return unauthorizedCallback(403, { reason: messages_1.UserStatus.UNAUTHORIZED });
    }
};
exports.postDishesHandler = postDishesHandler;
