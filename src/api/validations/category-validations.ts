import {
	checkIfCategoryExists,
	checkIfCategoryIsUsed,
	checkIfIsRestaurantAdmin,
	checkIfRestaurantExists,
} from "../../utils/validations";
import { CategoryUpdateInput } from "../../types/categories";
import { getCategoryById } from "../models/category-models";
import { getCurrentRestaurantInfoByName } from "../models/restaurant-models";
import { handleCatchError } from "../../utils/handleCatchError";

export const getRestautantCategoriesValidations = async (restaurant_name: string): Promise<boolean | string> => {
	const restaurantExists = await checkIfRestaurantExists(restaurant_name);
	if (!restaurantExists) {
		return handleCatchError({
			status: 404,
			message: `El restaurante con el nombre "${restaurant_name}" no existe`,
		});
	}
	return true;
};

export const updateCategoryValidation = async (
	authorization: string,
	category_id: string,
	category_input: CategoryUpdateInput,
): Promise<boolean | string> => {
	const categoryExists = await checkIfCategoryExists(category_id);
	if (!categoryExists) {
		return handleCatchError({
			status: 404,
			message: `La categoría con el id ${category_id} no existe`,
		});
	}
	const category = await getCategoryById(category_id);
	if (category) {
		const { restaurant_id, is_active } = category;
		const isRestaurantAdmin = await checkIfIsRestaurantAdmin(authorization, restaurant_id);
		if (!isRestaurantAdmin) {
			return handleCatchError({
				status: 401,
				message: `No estás autorizado para modificar categorías de este restaurante.`,
			});
		}
		if (is_active === true && category_input.hide === false) {
			return handleCatchError({
				status: 422,
				message: "No puedes mostrar una categoría que ya está mostrada",
			});
		}
		if (is_active === false && category_input.hide === true) {
			return handleCatchError({
				status: 422,
				message: "No puedes ocultar una categoría que ya está oculta",
			});
		}
		const unprocessableBody = !!category_input.label && !!category_input.hide;
		if (unprocessableBody) {
			return handleCatchError({
				status: 422,
				message: "No puedes modificar la etiqueta de la categoría y mostrar/ocultar una categoría al mismo tiempo",
			});
		}
	}
	return true;
};

export const createCategoryValidations = async (
	authorization: string,
	restaurant_name: string,
): Promise<boolean | string> => {
	const restaurantExists = await checkIfRestaurantExists(restaurant_name);
	if (!restaurantExists) {
		return handleCatchError({
			status: 404,
			message: `El restaurante con el nombre "${restaurant_name}" no existe`,
		});
	}
	const restaurant = await getCurrentRestaurantInfoByName(restaurant_name);
	if (restaurant) {
		const isRestaurantAdmin = await checkIfIsRestaurantAdmin(authorization, restaurant.id);
		if (!isRestaurantAdmin) {
			return handleCatchError({
				status: 401,
				message: `No estás autorizado para crear categorías en este restaurante.`,
			});
		}
	}
	return true;
};

export const deleteCategoriesValidation = async (
	authorization: string,
	category_ids: string[],
): Promise<boolean | string> => {
	const invalidCategoryIds: string[] = [];
	const usedCategoryIds: string[] = [];
	await Promise.all(
		category_ids.map(async (category_id) => {
			const dishExists = await checkIfCategoryExists(category_id);
			if (!dishExists) {
				invalidCategoryIds.push(category_id);
			}
			const usedCategory = await checkIfCategoryIsUsed(category_id);
			if (usedCategory) {
				usedCategoryIds.push(category_id);
			}
		}),
	);
	if (invalidCategoryIds.length > 0) {
		return handleCatchError({
			status: 404,
			message: `La categoría/categorías con el/los id(s) ${invalidCategoryIds.join(", ")} no existe(n).`,
		});
	}
	if (usedCategoryIds.length > 0) {
		return handleCatchError({
			status: 422,
			message: `La categoría/categorías con el/los id(s) ${usedCategoryIds.join(
				", ",
			)} no puede(n) ser eliminada(s) ya que contienen platillos asociados.`,
		});
	}
	const category = await getCategoryById(category_ids[0]);
	if (category) {
		const { restaurant_id } = category;
		const isRestaurantAdmin = await checkIfIsRestaurantAdmin(authorization, restaurant_id);
		if (!isRestaurantAdmin) {
			return handleCatchError({
				status: 401,
				message: `No estás autorizado para eliminar categorías de este restaurante.`,
			});
		}
	}
	return true;
};
