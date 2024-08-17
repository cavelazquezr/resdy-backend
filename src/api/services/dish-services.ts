import { DishCreateInput, DishesByCategoryOutput, DishOutput, DishUpdateInput } from "../../types/dishes";
import { getEmail } from "../../utils";
import {
	createDish,
	deleteDishes,
	getMyDishes,
	getRestaurantDishesByCategories,
	updateDish,
} from "../models/dish-models";

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

export const getMyDishesService = async (authorization: string): Promise<Array<DishOutput>> => {
	const email = getEmail(authorization);
	const dishes: Array<DishOutput> = await getMyDishes(email);

	return dishes;
};

export const updateDishService = async (dish_id: string, dish_input: DishUpdateInput) => {
	const updatedDish: DishOutput = await updateDish(dish_id, dish_input);
	return updatedDish;
};

export const postDishesService = async (
	restaurant_name: string,
	dish_input: DishCreateInput,
): Promise<DishOutput> => {
	const newDish: DishOutput = await createDish(restaurant_name, dish_input);
	return newDish;
};

export const deleteDishesService = async (dish_id: string): Promise<void> => {
	await deleteDishes(dish_id);
};
