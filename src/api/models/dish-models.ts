import { client } from "../../config/client";
import { CreateDishInput } from "../../types/dishes";

const { category, dishes } = client;

export const getRestaurantDishesByCategories = async (restaurant_name: string) => {
	const query = await category.findMany({
		where: {
			restaurant: {
				name: restaurant_name,
			},
		},
		select: {
			label: true,
			dishes: true,
		},
	});
	return query;
};

export const createDish = async (restaurant_name: string, category_id: string, dish: CreateDishInput) => {
	const query = await dishes.create({
		data: {
			...dish,
			category: {
				connect: {
					id: category_id,
				},
			},
			restaurant: {
				connect: {
					name: restaurant_name,
				},
			},
		},
	});
	return query;
};
