import { Prisma } from "@prisma/client";
import { client } from "../src/services/prisma";
import { users } from "./data/users";
import { restaurants } from "./data/restaurants";

const load = async () => {
	try {
		for (const user of users as Prisma.UserCreateInput[]) {
			await client.user.upsert({
				where: { email: user.email },
				update: {},
				create: user,
			});
		}

		for (const restaurant of restaurants as Prisma.WebCreateWithoutAdminInput[]) {
			await client.web.upsert({
				where: { name: restaurant.name },
				update: {},
				create: {
					name: restaurant.name,
					admin: { connect: { email: "admin@resdy.net" } },
					customization: {
						create: restaurant.customization?.create,
					},
					webInformation: {
						create: restaurant.webInformation?.create,
					},
					dishesCategories: {
						create: restaurant.dishesCategories?.create,
					},
					dishes: {
						create: restaurant.dishes?.create,
					},
					restaurantRatings: {
						create: {},
					},
				},
			});
		}

		console.log("🌱 Database seeded 🌱");
	} catch (error) {
		console.error("Error seeding database:", error);
	} finally {
		await client.$disconnect();
	}
};

load()
