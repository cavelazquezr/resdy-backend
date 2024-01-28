import { TsoaResponse } from "tsoa";
import { checkIfCategoryExists, checkIfIsRestaurantAdmin, checkIfRestaurantExists } from "../../utils/validations";
import { CategoryUpdateInput } from "../../types/categories";
import { getCategoryById } from "../models/category-models";

export const getRestautantCategoriesValidations = async (
	restaurant_name: string,
	notFoundCallback: TsoaResponse<404, { details: string }>,
): Promise<boolean | string> => {
	const restaurantExists = await checkIfRestaurantExists(restaurant_name);
	if (!restaurantExists) {
		return notFoundCallback(404, { details: `The restaurant with name "${restaurant_name}" does not exist.` });
	}
	return true;
};

export const updateCategoryValidation = async (
	authorization: string,
	category_id: string,
	category_input: CategoryUpdateInput,
	unauthorizedCallback: TsoaResponse<401, { details: string }>,
	notFoundCallback: TsoaResponse<404, { details: string }>,
	unprocessableCallback: TsoaResponse<422, { details: string }>,
): Promise<boolean | string> => {
	const categoryExists = await checkIfCategoryExists(category_id);
	if (!categoryExists) {
		return notFoundCallback(404, {
			details: `Category of id ${category_id} does not exist.`,
		});
	}
	const category = await getCategoryById(category_id);
	if (category) {
		const { restaurant_id, is_active } = category;
		const isRestaurantAdmin = await checkIfIsRestaurantAdmin(authorization, restaurant_id);
		if (!isRestaurantAdmin) {
			return unauthorizedCallback(401, { details: `You are not authorized to modify categories of this restaurant.` });
		}
		if (is_active === true && category_input.hide === false) {
			return unprocessableCallback(422, {
				details: `You can not show a category that is already shown`,
			});
		}
		if (is_active === false && category_input.hide === true) {
			return unprocessableCallback(422, {
				details: `You can not hide a category that is already hidden`,
			});
		}
		const unprocessableBody = !!category_input.label && !!category_input.hide;
		if (unprocessableBody) {
			return unprocessableCallback(422, {
				details: `You can not modify category's label and hide/show a category at same time`,
			});
		}
	}
	return true;
};
