import client from "../../config/client";
import { CategoryUpdateInput, CategoryCreateInput } from "../../types/categories";

const { category } = client;

export const getCategoryById = async (category_id: string) => {
	const query = await category.findUnique({
		where: {
			id: category_id,
		},
	});
	return query;
};

export const getRestaurantCategories = async (restaurant_name: string) => {
	const transaction = await client.$transaction(async (tx) => {
		const categoriesQuery = await tx.category.findMany({
			where: {
				restaurant: {
					name: restaurant_name,
				},
			},
			select: {
				id: true,
				label: true,
				is_active: true,
				created_at: true,
				updated_at: true,
			},
		});
		const dishesQuery = await tx.dishes.findMany({
			where: {
				restaurant: {
					name: restaurant_name,
				},
			},
			select: {
				category_id: true,
			},
		});
		return { categories: categoriesQuery, dishes: dishesQuery };
	});
	return transaction;
};

export const updateCategory = async (category_id: string, category_input: CategoryUpdateInput) => {
	const { hide, ...input } = category_input;
	const query = await category.update({
		where: {
			id: category_id,
		},
		data: {
			...input,
			is_active: hide ? false : true,
		},
	});
	return query;
};

export const createCategory = async (restaurant_name: string, category_input: CategoryCreateInput) => {
	const query = await category.create({
		data: {
			...category_input,
			restaurant: {
				connect: {
					name: restaurant_name,
				},
			},
		},
	});
	return query;
};

export const deleteCategories = async (category_ids: string[]) => {
	await category.deleteMany({
		where: {
			id: {
				in: category_ids,
			},
		},
	});
};
