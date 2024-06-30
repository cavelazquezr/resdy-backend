import {
	checkIfCategoryExists,
	checkIfDishExists,
	checkIfIsRestaurantAdmin,
	checkIfRestaurantExists,
} from "../../utils/validations";
import { getCategoryById } from "../models/category-models";
import { DishUpdateInput } from "../../types/dishes";
import { getDishById } from "../models/dish-models";
import { handleCatchError } from "../../utils/handleCatchError";

export const getDishesValidations = async (restaurant_name: string): Promise<boolean | string> => {
	const restaurantExists = await checkIfRestaurantExists(restaurant_name);
	if (!restaurantExists) {
		return handleCatchError({
			status: 404,
			message: `El restaurante con el nombre "${restaurant_name}" no existe`,
		});
	}
	return true;
};

export const postDishesValidations = async (authorization: string, category_id: string): Promise<boolean | string> => {
	const categoryExists = await checkIfCategoryExists(category_id);
	if (!categoryExists) {
		return handleCatchError({
			status: 404,
			message: `La categoría con el id "${category_id}" no existe`,
		});
	}
	const category = await getCategoryById(category_id);
	if (category) {
		const { restaurant_id } = category;
		const isRestaurantAdmin = await checkIfIsRestaurantAdmin(authorization, restaurant_id);
		if (!isRestaurantAdmin) {
			return handleCatchError({
				status: 401,
				message: `No estás autorizado para crear platillos en este restaurante.`,
			});
		}
	}
	return true;
};

export const updateDishValidation = async (
	authorization: string,
	dish_id: string,
	dish_input: DishUpdateInput,
): Promise<boolean | string> => {
	const { hide, ...input } = dish_input;
	const dishExists = await checkIfDishExists(dish_id);
	if (!dishExists) {
		return handleCatchError({
			status: 404,
			message: `El platillo con el id ${dish_id} no existe`,
		});
	}
	const dish = await getDishById(dish_id);
	if (dish) {
		const { restaurant_id, is_active } = dish;
		const isRestaurantAdmin = await checkIfIsRestaurantAdmin(authorization, restaurant_id);
		if (!isRestaurantAdmin) {
			return handleCatchError({
				status: 401,
				message: `No estás autorizado para crear platillos en este restaurante.`,
			});
		}
		if (is_active === true && hide === false) {
			return handleCatchError({
				status: 422,
				message: "No puedes mostrar un platillo que ya está mostrado",
			});
		}
		if (is_active === false && hide === true) {
			return handleCatchError({
				status: 422,
				message: "No puedes ocultar un platillo que ya está oculto",
			});
		}
		const unprocessableBody = Object.values(input).length > 0 && !!dish_input.hide;
		if (unprocessableBody) {
			return handleCatchError({
				status: 422,
				message: "No puedes modificar las propiedades de un platillo y ocultar/mostrar una categoría al mismo tiempo",
			});
		}
	}
	return true;
};

export const deleteDishValidation = async (authorization: string, dish_ids: string[]): Promise<boolean | string> => {
	const invalidDishIds: string[] = [];
	await Promise.all(
		dish_ids.map(async (dish_id) => {
			const dishExists = await checkIfDishExists(dish_id);
			if (!dishExists) {
				invalidDishIds.push(dish_id);
			}
		}),
	);
	if (invalidDishIds.length > 0) {
		return handleCatchError({
			status: 404,
			message: `Los platillos con los id(s) ${invalidDishIds.join(", ")} no existen`,
		});
	}
	const dish = await getDishById(dish_ids[0]);
	if (dish) {
		const { restaurant_id } = dish;
		const isRestaurantAdmin = await checkIfIsRestaurantAdmin(authorization, restaurant_id);
		if (!isRestaurantAdmin) {
			return handleCatchError({
				status: 401,
				message: "No estás autorizado para eliminar platillos de este restaurante.",
			});
		}
	}
	return true;
};
