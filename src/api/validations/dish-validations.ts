import { TsoaResponse } from "tsoa";
import { checkIfCategoryExists, checkIfIsRestaurantAdmin, checkIfRestaurantExists } from "../../utils/validations";
import { getCategoryById } from "../models/category-models";

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
