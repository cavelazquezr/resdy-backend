import { MenuRecord } from "../../types/menu";
import { getRestaurantCategoriesWithDishes } from "../models/menu-models";

export const getMenuService = async (restaurant_name: string): Promise<MenuRecord[]> => {
	const categoriesAndDishes = await getRestaurantCategoriesWithDishes(restaurant_name);
	const menuRecords: MenuRecord[] = categoriesAndDishes.map((category) => {
		const { label, dishes } = category;
		return {
			category: label,
			dishes: dishes,
		};
	});
	return menuRecords;
};
