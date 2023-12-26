"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRestaurantHandler = void 0;
const prisma_1 = require("../../services/prisma");
const messages_1 = require("../../types/messages");
const getRestaurantHandler = async (unauthorizedCallback, name, city, restautantType, country) => {
    try {
        const qRestaurants = await prisma_1.client.restaurant.findMany({
            select: {
                id: true,
                name: true,
                restaurant_information: {
                    select: {
                        city: true,
                        country: true,
                        phone: true,
                        address: true,
                        restaurant_type: true,
                        location: true,
                    },
                },
                customization: {
                    select: {
                        name: true,
                        logo_url: true,
                    },
                },
                dishes: true,
            },
            where: {
                restaurant_information: {
                    city: { contains: city },
                    country: { contains: country },
                    restaurant_type: { contains: restautantType },
                },
                customization: {
                    name: { contains: name },
                },
            },
        });
        if (qRestaurants.length === 0) {
            return unauthorizedCallback(403, { reason: messages_1.UserStatus.NOT_FOUND });
        }
        const calculatePriceAverage = (dishes) => {
            if (dishes.length === 0) {
                return 0;
            }
            const total = dishes.reduce((sum, dish) => sum + parseFloat(dish.price.toString()), 0);
            const average = total / dishes.length;
            const roundedAverage = Math.round(average / 2) * 2;
            return roundedAverage;
        };
        const restaurantsRecord = qRestaurants.map((restaurant) => {
            const { name, restaurant_information, customization } = restaurant;
            return {
                name: name,
                brand_name: customization?.name ?? undefined,
                logo_url: customization?.logo_url ?? undefined,
                city: restaurant_information?.city ?? undefined,
                address: restaurant_information?.address ?? undefined,
                phone: restaurant_information?.phone ?? undefined,
                country: restaurant_information?.country ?? undefined,
                restaurant_type: restaurant_information?.restaurant_type ?? undefined,
                rating: 0,
                rating_count: 0,
                price_average: calculatePriceAverage(restaurant.dishes),
                location: restaurant_information?.location,
            };
        });
        return restaurantsRecord;
    }
    catch (error) {
        console.error("Error in getWebsHandler:", error);
        return unauthorizedCallback(403, { reason: messages_1.UserStatus.UNAUTHORIZED });
    }
};
exports.getRestaurantHandler = getRestaurantHandler;
