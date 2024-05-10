import { MenuOutput } from "../../types/menu";
import { getRestaurantCategoriesWithDishes } from "../models/menu-models";

export const getMenuService = async (restaurant_name: string): Promise<MenuOutput[]> => {
	const categoriesAndDishes = await getRestaurantCategoriesWithDishes(restaurant_name);
	const menuRecords: MenuOutput[] = categoriesAndDishes.map((category) => {
		const { label, dishes } = category;
		return {
			category: label,
			dishes: dishes,
		};
	});
	return menuRecords;
};
