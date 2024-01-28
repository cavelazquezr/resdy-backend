import { client } from "../../config/client";
import { DishCreateInput, DishUpdateInput } from "../../types/dishes";

const { category, dishes } = client;

export const getDishById = async (dish_id: string) => {
	const query = await dishes.findUnique({
		where: {
			id: dish_id,
		},
	});
	return query;
};


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

export const updateDish = async (dish_id: string, dish_input: DishUpdateInput) => {
	const { hide, ...input } = dish_input;
	const query = await dishes.update({
		where: {
			id: dish_id,
		},
		data: {
			...input,
			is_active: hide ? false : true,
		},
	});
	return query;
};

export const createDish = async (restaurant_name: string, category_id: string, dish: DishCreateInput) => {
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
