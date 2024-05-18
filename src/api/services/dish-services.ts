import { DishCreateInput, DishesByCategoryOutput, DishOutput, DishUpdateInput } from "../../types/dishes";
import { createDish, deleteDishes, getRestaurantDishesByCategories, updateDish } from "../models/dish-models";

export const getDishesService = async (restaurant_name: string): Promise<DishesByCategoryOutput[]> => {
	const categoriesAndDishes = await getRestaurantDishesByCategories(restaurant_name);
	const dishesRecord: DishesByCategoryOutput[] = categoriesAndDishes.map((category) => {
		const { label, dishes } = category;
		return {
			category: label,
			dishes: dishes,
		};
	});
	return dishesRecord;
};

export const updateDishService = async (dish_id: string, dish_input: DishUpdateInput) => {
	const updatedDish: DishOutput = await updateDish(dish_id, dish_input);
	return updatedDish;
};

export const postDishesService = async (
	restaurant_name: string,
	category_id: string,
	dish_input: DishCreateInput,
): Promise<DishOutput> => {
	const newDish: DishOutput = await createDish(restaurant_name, category_id, dish_input);
	return newDish;
};

export const deleteDishesService = async (dish_ids: string[]): Promise<void> => {
	await deleteDishes(dish_ids);
};
