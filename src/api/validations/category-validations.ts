import {
	checkIfCategoryExists,
	checkIfCategoryIsUsed,
	checkIfIsRestaurantAdmin,
	checkIfRestaurantExists,
} from "../../utils/validations";
import { CategoryUpdateInput } from "../../types/categories";
import { getCategoryById } from "../models/category-models";
import { getCurrentRestaurantInfoByName } from "../models/restaurant-models";
import { handleValidate } from "../../utils/handleValidate";

export const getRestautantCategoriesValidations = async (restaurant_name: string): Promise<void> => {
	await handleValidate(async (errors) => {
		const restaurantExists = await checkIfRestaurantExists(restaurant_name);
		if (!restaurantExists) {
			errors.restaurant = { message: `El restaurante con el nombre "${restaurant_name}" no existe`, status: 404 };
		}
	});
};

export const updateCategoryValidation = async (
	authorization: string,
	category_id: string,
	category_input: CategoryUpdateInput,
): Promise<void> => {
	await handleValidate(async (errors) => {
		const categoryExists = await checkIfCategoryExists(category_id);
		if (!categoryExists) {
			errors.category = { message: `La categoría con el id ${category_id} no existe`, status: 404 };
		}

		const category = await getCategoryById(category_id);
		if (category) {
			const { restaurant_id, is_active } = category;
			const isRestaurantAdmin = await checkIfIsRestaurantAdmin(authorization, restaurant_id);
			if (!isRestaurantAdmin) {
				errors.authorization = {
					message: `No estás autorizado para modificar categorías de este restaurante.`,
					status: 401,
				};
			}
			if (is_active === true && category_input.hide === false) {
				errors.category_input = { message: "No puedes mostrar una categoría que ya está mostrada", status: 422 };
			}
			if (is_active === false && category_input.hide === true) {
				errors.category_input = { message: "No puedes ocultar una categoría que ya está oculta", status: 422 };
			}
		}
	});
};

export const createCategoryValidations = async (authorization: string, restaurant_name: string): Promise<void> => {
	await handleValidate(async (errors) => {
		const restaurantExists = await checkIfRestaurantExists(restaurant_name);
		if (!restaurantExists) {
			errors.restaurant = { message: `El restaurante con el nombre "${restaurant_name}" no existe`, status: 404 };
		}

		const restaurant = await getCurrentRestaurantInfoByName(restaurant_name);
		if (restaurant) {
			const isRestaurantAdmin = await checkIfIsRestaurantAdmin(authorization, restaurant.id);
			if (!isRestaurantAdmin) {
				errors.authorization = {
					message: `No estás autorizado para crear categorías en este restaurante.`,
					status: 401,
				};
			}
		}
	});
};

export const deleteCategoriesValidation = async (authorization: string, category_id: string): Promise<void> => {
	await handleValidate(async (errors) => {
		const category = await getCategoryById(category_id);
		if (category) {
			const { restaurant_id } = category;
			const isRestaurantAdmin = await checkIfIsRestaurantAdmin(authorization, restaurant_id);
			if (!isRestaurantAdmin) {
				errors.authorization = {
					message: `No estás autorizado para eliminar categorías de este restaurante.`,
					status: 401,
				};
			}
		} else {
			errors.category = { message: `La categoría con el id ${category_id} no existe`, status: 404 };
		}
	});
};
