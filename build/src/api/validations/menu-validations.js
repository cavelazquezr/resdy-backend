"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMenuValidations = void 0;
const messages_1 = require("../../types/messages");
const validations_1 = require("../../utils/validations");
const getMenuValidations = async (restaurant_name, notFoundCallback) => {
    const restaurantExists = await (0, validations_1.checkIfRestaurantExists)(restaurant_name);
    if (!restaurantExists) {
        return notFoundCallback(404, { details: messages_1.UserStatus.WEB_DOESNT_EXIST });
    }
    return true;
};
exports.getMenuValidations = getMenuValidations;
