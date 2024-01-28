import { WithIsUsed } from "../../types";
import { CategoryCreateInput, CategoryOutput, CategoryProps, CategoryUpdateInput } from "../../types/categories";
import { createCategory, getRestaurantCategories, updateCategory } from "../models/category-models";

export const getRestautantCategoriesService = async (restaurant_name: string): Promise<WithIsUsed<CategoryProps>[]> => {
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

export const updateCategoryService = async (category_id: string, category_input: CategoryUpdateInput) => {
	const updatedCategory: CategoryOutput = await updateCategory(category_id, category_input);
	return updatedCategory;
};

export const createCategoryService = async (category_id: string, category_input: CategoryCreateInput) => {
	const newCategory: CategoryOutput = await createCategory(category_id, category_input);
	return newCategory;
};
