import { TsoaResponse } from "tsoa";
import {
	checkIfCategoryExists,
	checkIfDishExists,
	checkIfIsRestaurantAdmin,
	checkIfRestaurantExists,
} from "../../utils/validations";
import { getCategoryById } from "../models/category-models";
import { DishUpdateInput } from "../../types/dishes";
import { getDishById } from "../models/dish-models";

export const getDishesValidations = async (
	restaurant_name: string,
	notFoundCallback: TsoaResponse<404, { details: string }>,
): Promise<boolean | string> => {
	const restaurantExists = await checkIfRestaurantExists(restaurant_name);
	if (!restaurantExists) {
		return notFoundCallback(404, { details: `The restaurant with name "${restaurant_name}" does not exist.` });
	}
	return true;
};

export const postDishesValidations = async (
	authorization: string,
	category_id: string,
	unauthorizedCallback: TsoaResponse<401, { details: string }>,
	notFoundCallback: TsoaResponse<404, { details: string }>,
): Promise<boolean | string> => {
	const categoryExists = await checkIfCategoryExists(category_id);
	if (!categoryExists) {
		return notFoundCallback(404, {
			details: `Category of id ${category_id} does not exist.`,
		});
	}
	const category = await getCategoryById(category_id);
	if (category) {
		const { restaurant_id } = category;
		const isRestaurantAdmin = await checkIfIsRestaurantAdmin(authorization, restaurant_id);
		if (!isRestaurantAdmin) {
			return unauthorizedCallback(401, { details: `You are not authorized to create dishes in this restaurant.` });
		}
	}
	return true;
};

export const updateDishValidation = async (
	authorization: string,
	dish_id: string,
	dish_input: DishUpdateInput,
	unauthorizedCallback: TsoaResponse<401, { details: string }>,
	notFoundCallback: TsoaResponse<404, { details: string }>,
	unprocessableCallback: TsoaResponse<422, { details: string }>,
): Promise<boolean | string> => {
	const { hide, ...input } = dish_input;
	const dishExists = await checkIfDishExists(dish_id);
	if (!dishExists) {
		return notFoundCallback(404, {
			details: `Dish of id ${dish_id} does not exist.`,
		});
	}
	const dish = await getDishById(dish_id);
	if (dish) {
		const { restaurant_id, is_active } = dish;
		const isRestaurantAdmin = await checkIfIsRestaurantAdmin(authorization, restaurant_id);
		if (!isRestaurantAdmin) {
			return unauthorizedCallback(401, { details: `You are not authorized to modify dishes of this restaurant.` });
		}
		if (is_active === true && hide === false) {
			return unprocessableCallback(422, {
				details: `You can not show a dish that is already shown`,
			});
		}
		if (is_active === false && hide === true) {
			return unprocessableCallback(422, {
				details: `You can not hide a dish that is already hidden`,
			});
		}
		const unprocessableBody = Object.values(input).length > 0 && !!dish_input.hide;
		if (unprocessableBody) {
			return unprocessableCallback(422, {
				details: `You can not modify dish's properties and hide/show a category at same time`,
			});
		}
	}
	return true;
};
