"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("../config/client");
const readCSVFile_1 = require("../utils/readCSVFile");
const seedModel = async (seedData) => {
    try {
        await Promise.all(seedData["user"].map(async (user) => {
            await client_1.client.user.upsert({
                where: { email: user.email },
                update: user,
                create: user,
            });
        }));
        await Promise.all(seedData["restaurant"].map(async (restaurantInput) => {
            const { admin, ...restautantUpdateInput } = restaurantInput;
            const { restaurant: restaurantFromInformation, ...information } = seedData["restaurantInformation"].find((information) => information.restaurant === restaurantInput.id);
            const { restaurant: restaurantFromCustomization, ...customization } = seedData["customization"].find((customization) => customization.restaurant === restaurantInput.id);
            const categories = seedData["category"]
                .filter((category) => category.restaurant === restaurantInput.id)
                .map(({ restaurant: restaurantFromCategory, ...rest }) => rest);
            const dishes = seedData["dishes"]
                .filter((dish) => dish.restaurant === restaurantInput.id)
                .map(({ restaurant: restaurantFromDish, category, ...rest }) => ({
                category: { connect: { id: category } },
                ...rest,
            }));
            const ratings = seedData["rating"]
                .filter((rating) => rating.restaurant === restaurantInput.id)
                .map(({ restaurant: restaurantFromRating, user, ...rest }) => ({
                user: { connect: { id: user } },
                ...rest,
            }));
            await client_1.client.restaurant.upsert({
                where: { name: restaurantInput.name },
                update: restautantUpdateInput,
                create: {
                    name: restaurantInput.name,
                    admin: {
                        connect: {
                            id: restaurantInput.admin,
                        },
                    },
                    restaurant_information: {
                        create: information,
                    },
                    customization: {
                        create: customization,
                    },
                    category: {
                        create: categories,
                    },
                    dishes: {
                        create: dishes,
                    },
                    ratings: {
                        create: ratings,
                    },
                },
            });
        }));
    }
    catch (error) {
        throw error;
    }
};
const seedDb = async () => {
    try {
        const data = await (0, readCSVFile_1.parseSeedData)();
        await seedModel(data);
        console.log("🌱 Database seeded 🌱");
    }
    catch (error) {
        console.error("❌ Error  seeding database ❌:", error);
    }
    finally {
        await client_1.client.$disconnect();
    }
};
seedDb();
