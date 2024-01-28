import { CreateDishInput, DishesByCategoryOutput, DishOutput } from "../../types/dishes";
import { createDish, getRestaurantDishesByCategories } from "../models/dish-models";

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

export const postDishesService = async (
	restaurant_name: string,
	category_id: string,
	dish: CreateDishInput,
): Promise<DishOutput> => {
	const newDish: DishOutput = await createDish(restaurant_name, category_id, dish);
	return newDish;
};
