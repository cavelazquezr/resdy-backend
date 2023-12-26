import path from "path";
import fs from "fs";
import { readCSVFile } from "../utils/readCSVFile";
import { parseTypeObject } from "../utils/parseTypeJson";
import { client } from "../services/prisma";
import { Prisma } from "@prisma/client";

const dataPath = path.join(__dirname, "data");

const seedDb = async () => {
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

	const seedData = await parseSeedData();
	seedModel(seedData as Record<string, any[]>);
};

const seedModel = async (seedData: Record<string, any[]>) => {
	try {
		await Promise.all(
			Object.entries(seedData).map(async ([model, rows]) => {
				if (model === "user") {
					for (const user of rows as Prisma.UserCreateInput[]) {
						await client.user.upsert({
							where: { email: user.email },
							update: user,
							create: user,
						});
					}
				}
				if (model === "restaurant") {
					for (const restaurant of rows as Prisma.RestaurantCreateInput[]) {
						const { admin, ...restautantUpdateInput } = restaurant;
						await client.restaurant.upsert({
							where: { name: restaurant.name },
							update: restautantUpdateInput,
							create: {
								name: restaurant.name,
								admin: {
									connect: {
										id: restaurant.admin as string,
									},
								},
							},
						});
					}
				}
				if (model === "restaurantInformation") {
					for (const information of rows as Prisma.RestaurantInformationCreateInput[]) {
						const { restaurant, ...informationUpdateInput } = information;
						await client.restaurantInformation.upsert({
							where: { restaurant_id: information.restaurant as string },
							update: informationUpdateInput,
							create: {
								...information,
								restaurant: {
									connect: {
										id: information.restaurant as string,
									},
								},
							},
						});
					}
				}
				if (model === "customization") {
					for (const customization of rows as Prisma.CustomizationCreateInput[]) {
						const { restaurant, ...informationUpdateInput } = customization;
						await client.customization.upsert({
							where: { restaurant_id: customization.restaurant as string },
							update: informationUpdateInput,
							create: {
								...customization,
								restaurant: {
									connect: {
										id: customization.restaurant as string,
									},
								},
							},
						});
					}
				}
				if (model === "dishesCategories") {
					for (const category of rows as Prisma.DishesCategoriesCreateInput[]) {
						const { restaurant, ...categoryUpdateInput } = category;
						await client.dishesCategories.upsert({
							where: { id: category.id as string },
							update: categoryUpdateInput,
							create: {
								...category,
								restaurant: {
									connect: {
										id: category.restaurant as string,
									},
								},
							},
						});
					}
				}
				if (model === "dishes") {
					for (const dish of rows as Prisma.DishesCreateInput[]) {
						const { restaurant, category, ...dishUpdateInput } = dish;
						await client.dishes.upsert({
							where: { id: dish.id as string },
							update: dishUpdateInput,
							create: {
								...dish,
								category: {
									connect: {
										id: dish.category as string,
									},
								},
								restaurant: {
									connect: {
										id: dish.restaurant as string,
									},
								},
							},
						});
					}
				}
			}),
		);
		console.log("🌱 Database seeded 🌱");
	} catch (err) {
		console.error("Error seeding database:", err);
	} finally {
		await client.$disconnect();
	}
};

seedDb();
