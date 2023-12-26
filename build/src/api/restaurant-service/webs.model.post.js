"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRestaurantHandler = void 0;
const client_1 = require("@prisma/client");
const prisma_1 = require("../../services/prisma");
const access_1 = require("../../services/access");
const messages_1 = require("../../types/messages");
const postRestaurantHandler = async (authorization, restaurant, unauthorizedCallback) => {
    const { email } = (0, access_1.verifyToken)(authorization);
    const admin = await prisma_1.client.user.findUnique({ where: { email } });
    try {
        return prisma_1.client.$transaction(async (tx) => {
            const new_restaurant = await tx.restaurant.create({
                data: {
                    name: restaurant.name,
                    admin: { connect: { id: admin?.id } },
                },
            });
            await tx.customization.create({
                data: {
                    ...restaurant.customization,
                    restaurant: { connect: { id: new_restaurant.id } },
                },
            });
            await tx.restaurantInformation.create({
                data: {
                    ...restaurant.restaurant_information,
                    restaurant: { connect: { id: new_restaurant.id } },
                },
            });
            return new_restaurant;
        });
    }
    catch (error) {
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
            // Unique constraint violation for 'name' field
            return unauthorizedCallback(403, {
                reason: messages_1.UserStatus.WEB_ALREADY_EXISTS,
            });
        }
        throw error; // Rethrow the error if it's not a unique constraint violation
    }
};
exports.postRestaurantHandler = postRestaurantHandler;
