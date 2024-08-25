"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const client_1 = tslib_1.__importDefault(require("../config/client"));
const readCSVFile_1 = require("../utils/readCSVFile");
const getCoordinates_1 = require("../utils/getCoordinates");
const seedModel = async (seedData) => {
    try {
        await Promise.all(seedData["user"].map(async (user) => {
            await client_1.default.user.upsert({
                where: { email: user.email },
                update: user,
                create: { ...user, avatar_path: `users/${user.id}/${user.id}-avatar` },
            });
        }));
        await Promise.all(seedData["saveList"].map(async (list) => {
            const { user, ...listInput } = list;
            await client_1.default.saveList.upsert({
                where: { id: list.id },
                update: listInput,
                create: {
                    user: {
                        connect: { id: user },
                    },
                    ...listInput,
                },
            });
        }));
        await Promise.all(seedData["restaurant"].map(async (restaurantInput) => {
            const { admin, ...restautantUpdateInput } = restaurantInput;
            const { restaurant: restaurantFromInformation, ...information } = seedData["restaurantInformation"].find((information) => information.restaurant === restaurantInput.id);
            const { restaurant: restaurantFromCustomization, ...customization } = seedData["customization"].find((customization) => customization.restaurant === restaurantInput.id);
            const { restaurant: restaurantFromStadistics, ...stadistics } = seedData["restaurantStadistic"].find((stadistic) => stadistic.restaurant === restaurantInput.id);
            const location = await (0, getCoordinates_1.getCoordinates)({
                city: information.city,
                address: information.address,
                country: information.country,
                postal_code: information.postal_code,
            });
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
            const saveListItem = seedData["saveListItem"]
                .filter((listItem) => listItem.restaurant === restaurantInput.id)
                .map(({ restaurant: restaurantFromListItem, list, ...rest }) => ({
                list: { connect: { id: list } },
                ...rest,
            }));
            const reservations = seedData["reservation"]
                .filter((reservation) => reservation.restaurant === restaurantInput.id)
                .map(({ restaurant: restaurantFromReservation, user, ...rest }) => ({
                user: { connect: { id: user } },
                ...rest,
            }));
            await client_1.default.restaurant.upsert({
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
                        create: { ...information, location },
                    },
                    customization: {
                        create: { ...customization, headers_path: [`restaurants/${restaurantInput.name}/headers/header-1`] },
                    },
                    restaurant_stadistic: {
                        create: stadistics,
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
                    reservation: {
                        create: reservations,
                    },
                    save_list_item: {
                        create: saveListItem,
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
        await client_1.default.$disconnect();
    }
};
seedDb();
