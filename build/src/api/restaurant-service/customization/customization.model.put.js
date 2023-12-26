"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.putCustomizationHandler = void 0;
const prisma_1 = require("../../../services/prisma");
const access_1 = require("../../../services/access");
const messages_1 = require("../../../types/messages");
const putCustomizationHandler = async (authorization, customization, unauthorizedCallback) => {
    const { restaurant_id } = customization;
    const isAdmin = await (0, access_1.isAdminOfCurrentRestaurant)(authorization, restaurant_id);
    if (!isAdmin) {
        return unauthorizedCallback(403, { reason: messages_1.UserStatus.UNAUTHORIZED });
    }
    const updatedInformation = prisma_1.client.customization.update({
        where: { restaurant_id: restaurant_id },
        data: { ...customization },
    });
    return updatedInformation;
};
exports.putCustomizationHandler = putCustomizationHandler;
;
