"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.putInformationHandler = void 0;
const prisma_1 = require("../../../services/prisma");
const access_1 = require("../../../services/access");
const messages_1 = require("../../../types/messages");
const putInformationHandler = async (authorization, information, unauthorizedCallback) => {
    const { restaurant_id } = information;
    const isAdmin = await (0, access_1.isAdminOfCurrentRestaurant)(authorization, restaurant_id);
    if (!isAdmin) {
        return unauthorizedCallback(403, { reason: messages_1.UserStatus.UNAUTHORIZED });
    }
    const updatedInformation = prisma_1.client.restaurantInformation.update({
        where: { restaurant_id: restaurant_id },
        data: { ...information },
    });
    return updatedInformation;
};
exports.putInformationHandler = putInformationHandler;
