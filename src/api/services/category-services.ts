import { WithIsUsed } from "../../types";
import {
	CategoryCreateInput,
	CategoryOutput,
	CategoryProps,
	CategoryUpdateInput,
	MyCategoriesRecord,
} from "../../types/categories";
import { getEmail } from "../../utils";
import { checkIfCategoryIsUsed } from "../../utils/validations";
import {
	createCategory,
	deleteCategories,
	getMyRestaurantCategories,
	getRestaurantCategories,
	updateCategory,
	updateCategoryOrder,
} from "../models/category-models";

export const getRestaurantCategoriesService = async (restaurant_name: string): Promise<WithIsUsed<CategoryProps>[]> => {
	const { categories, dishes } = await getRestaurantCategories(restaurant_name);
	const categoriesRecords: WithIsUsed<CategoryProps>[] = categories.map((category) => {
		const { id } = category;
		return {
			...category,
			is_used:
				!!dishes.length &&
				dishes.some((dish) => {
					return dish.category_id === id;
				}),
		};
	});
	return categoriesRecords;
};

export const getMyRestaurantCategoriesService = async (
	authorization: string,
): Promise<WithIsUsed<MyCategoriesRecord>[]> => {
	const email = getEmail(authorization);
	const { categories, dishes } = await getMyRestaurantCategories(email);
	const categoriesRecords: WithIsUsed<MyCategoriesRecord>[] = await Promise.all(
		categories.map(async (category) => {
			const isUsed = await checkIfCategoryIsUsed(category.id);
			return {
				...category,
				dishes: dishes.filter((dish) => dish.category_id === category.id).length,
				is_used: isUsed,
			};
		}),
	);
	return categoriesRecords;
};

export const updateCategoryService = async (category_id: string, category_input: CategoryUpdateInput) => {
	const updatedCategory: CategoryOutput = await updateCategory(category_id, category_input);
	return updatedCategory;
};

export const createCategoryService = async (category_id: string, category_input: CategoryCreateInput) => {
	const newCategory: CategoryOutput = await createCategory(category_id, category_input);
	return newCategory;
};

export const deleteCategoriesService = async (category_id: string): Promise<void> => {
	await deleteCategories(category_id);
};

export const updateCategoryOrderService = async (categories: { id: string; order: number }[]) => {
	await updateCategoryOrder(categories);
};
