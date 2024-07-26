import client from "../config/client";
import { Prisma } from "@prisma/client";
import { parseSeedData } from "../utils/readCSVFile";
import { getCoordinates } from "../utils/getCoordinates";

const seedModel = async (seedData: Record<string, any[]>) => {
	try {
		await Promise.all(
			(seedData["user"] as Prisma.UserCreateInput[]).map(async (user) => {
				await client.user.upsert({
					where: { email: user.email },
					update: user,
					create: { ...user, avatar_path: `users/${user.id}/${user.id}-avatar` },
				});
			}),
		);
		await Promise.all(
			(seedData["saveList"] as Prisma.SaveListCreateInput[]).map(async (list) => {
				const { user, ...listInput } = list;
				await client.saveList.upsert({
					where: { id: list.id },
					update: listInput,
					create: {
						user: {
							connect: { id: user as string },
						},
						...listInput,
					},
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

				const { restaurant: restaurantFromStadistics, ...stadistics } = seedData["restaurantStadistic"].find(
					(stadistic) => stadistic.restaurant === restaurantInput.id,
				);

				const location = await getCoordinates({
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
						category: { connect: { id: category as string } },
						...rest,
					}));

				const ratings = seedData["rating"]
					.filter((rating) => rating.restaurant === restaurantInput.id)
					.map(({ restaurant: restaurantFromRating, user, ...rest }) => ({
						user: { connect: { id: user as string } },
						...rest,
					}));

				const saveListItem = seedData["saveListItem"]
					.filter((listItem) => listItem.restaurant === restaurantInput.id)
					.map(({ restaurant: restaurantFromListItem, list, ...rest }) => ({
						list: { connect: { id: list as string } },
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
