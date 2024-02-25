import client from "../config/client";
import { Prisma } from "@prisma/client";
import { parseSeedData } from "../utils/readCSVFile";

const seedModel = async (seedData: Record<string, any[]>) => {
	try {
		await Promise.all(
			(seedData["user"] as Prisma.UserCreateInput[]).map(async (user) => {
				await client.user.upsert({
					where: { email: user.email },
					update: user,
					create: user,
				});
			}),
		);
		await Promise.all(
			(seedData["restaurant"] as Prisma.RestaurantCreateInput[]).map(async (restaurantInput) => {
				const { admin, ...restautantUpdateInput } = restaurantInput;

				const { restaurant: restaurantFromInformation, ...information } = seedData["restaurantInformation"].find(
					(information) => information.restaurant === restaurantInput.id,
				);

				const { restaurant: restaurantFromCustomization, ...customization } = seedData["customization"].find(
					(customization) => customization.restaurant === restaurantInput.id,
				);

				const categories = seedData["category"]
					.filter((category) => category.restaurant === restaurantInput.id)
					.map(({ restaurant: restaurantFromCategory, ...rest }) => rest);

				const dishes = seedData["dishes"]
					.filter((dish) => dish.restaurant === restaurantInput.id)
					.map(({ restaurant: restaurantFromDish, category, ...rest }) => ({
						category: { connect: { id: category as string } },
						...rest,
					}));

				const ratings = seedData["rating"]
					.filter((rating) => rating.restaurant === restaurantInput.id)
					.map(({ restaurant: restaurantFromRating, user, ...rest }) => ({
						user: { connect: { id: user as string } },
						...rest,
					}));

				const reservations = seedData["reservation"]
					.filter((reservation) => reservation.restaurant === restaurantInput.id)
					.map(({ restaurant: restaurantFromReservation, user, ...rest }) => ({
						user: { connect: { id: user as string } },
						...rest,
					}));

				await client.restaurant.upsert({
					where: { name: restaurantInput.name },
					update: restautantUpdateInput,
					create: {
						name: restaurantInput.name,
						admin: {
							connect: {
								id: restaurantInput.admin as string,
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
						reservation: {
							create: reservations,
						},
					},
				});
			}),
		);
		Promise.all(
			(seedData["saveList"] as Prisma.SaveListCreateInput[]).map(async (list) => {
				const listItem = seedData["saveListItem"]
					.filter((item) => item.list === list.id)
					.map(({ restaurant, list, ...rest }) => ({
						...rest,
						restaurant: { connect: { id: restaurant as string } },
					}));
				const { user, ...rest } = list;
				await client.saveList.upsert({
					where: { id: list.id },
					update: rest,
					create: {
						...rest,
						user: { connect: { id: user as string } },
						SaveListItem: {
							create: listItem,
						},
					},
				});
			}),
		);
	} catch (error) {
		throw error;
	}
};

const seedDb = async () => {
	try {
		const data = await parseSeedData();
		await seedModel(data as Record<string, any[]>);
		console.log("🌱 Database seeded 🌱");
	} catch (error) {
		console.error("❌ Error  seeding database ❌:", error);
	} finally {
		await client.$disconnect();
	}
};

seedDb();
