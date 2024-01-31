import path from "path";
import fs from "fs";
import { readCSVFile } from "../utils/readCSVFile";
import { parseTypeObject } from "../utils/parseTypeJson";
import { client } from "../config/client";
import { Prisma } from "@prisma/client";

const dataPath = path.join(__dirname, "data");

const parseSeedData = async () => {
	const csvFiles = await new Promise((resolve, reject) => {
		const csvFileList = {};
		fs.readdir(dataPath, async (err, files) => {
			if (err) {
				reject(err);
			}

			const promises = files.map(async (file) => {
				const fileNameWithoutExtension = path.parse(file).name;

				try {
					const json = await readCSVFile(`${dataPath}/${file}`);
					const parsedJsonList = await Promise.all(
						(json as Record<string, string>[]).map(async (item) => {
							const newJson = await parseTypeObject(item);
							return newJson;
						}),
					);

					csvFileList[fileNameWithoutExtension] = parsedJsonList as never;
				} catch (err) {
					console.log(err);
					csvFileList[fileNameWithoutExtension] = [] as never;
				}
			});
			Promise.all(promises)
				.then(() => resolve(csvFileList))
				.catch((error) => reject(error));
		});
	});

	return csvFiles;
};

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
		const seedData = await parseSeedData();
		await seedModel(seedData as Record<string, any[]>);
		console.log("🌱 Database seeded 🌱");
	} catch (error) {
		console.error("❌ Error seeding database ❌:", error);
	} finally {
		await client.$disconnect();
	}
};

seedDb();
