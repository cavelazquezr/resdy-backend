"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.putCategoryHandler = void 0;
const prisma_1 = require("../../../services/prisma");
const access_1 = require("../../../services/access");
const messages_1 = require("../../../types/messages");
const putCategoryHandler = async (authorization, category_id, category, unauthorizedCallback) => {
    try {
        return prisma_1.client.$transaction(async (tx) => {
            const qCurrentCategory = await tx.dishesCategories.findFirst({
                where: {
                    id: {
                        equals: category_id,
                    },
                },
            });
            if (qCurrentCategory) {
                const { restaurant_id } = qCurrentCategory;
                const isAdmin = await (0, access_1.isAdminOfCurrentRestaurant)(authorization, restaurant_id);
                if (!isAdmin) {
                    return unauthorizedCallback(403, { reason: messages_1.UserStatus.UNAUTHORIZED });
                }
                const updatedCategory = await prisma_1.client.dishesCategories.update({
                    where: {
                        id: restaurant_id,
                    },
                    data: {
                        ...category,
                    },
                });
                return updatedCategory;
            }
            return unauthorizedCallback(403, { reason: messages_1.UserStatus.CATEGORY_DOESNT_EXIST });
        });
    }
    catch {
        return unauthorizedCallback(403, { reason: messages_1.UserStatus.UNAUTHORIZED });
    }
};
exports.putCategoryHandler = putCategoryHandler;
