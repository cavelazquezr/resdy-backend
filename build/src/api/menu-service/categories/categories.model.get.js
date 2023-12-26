"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCategoriesHandler = void 0;
const prisma_1 = require("../../../services/prisma");
const messages_1 = require("../../../types/messages");
const getCategoriesHandler = async (restaurant_id, unauthorizedCallback) => {
    try {
        return prisma_1.client.$transaction(async (tx) => {
            const qCategories = await tx.dishesCategories.findMany({
                where: { restaurant_id: restaurant_id },
            });
            const qDishes = await tx.dishes.findMany({
                where: { restaurant_id: restaurant_id },
            });
            if (qCategories.length > 0 && qDishes.length > 0) {
                const categoriesRecord = qCategories.map((category) => {
                    const { id, label } = category;
                    return {
                        id: id,
                        label: label,
                        hasRecordUsingCategory: qDishes.some((dish) => {
                            return dish.category_id === id;
                        }),
                    };
                });
                return categoriesRecord;
            }
            return unauthorizedCallback(403, { reason: messages_1.UserStatus.CATEGORY_DOESNT_EXIST });
        });
    }
    catch {
        return unauthorizedCallback(403, { reason: messages_1.UserStatus.UNAUTHORIZED });
    }
};
exports.getCategoriesHandler = getCategoriesHandler;
