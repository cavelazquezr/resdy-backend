import {
	checkIfCategoryExists,
	checkIfDishExists,
	checkIfIsRestaurantAdmin,
	checkIfRestaurantExists,
} from "../../utils/validations";
import { getCategoryById } from "../models/category-models";
import { DishUpdateInput } from "../../types/dishes";
import { getDishById } from "../models/dish-models";
import { handleValidate } from "../../utils/handleValidate";

export const getDishesValidations = async (restaurant_name: string): Promise<void> => {
	await handleValidate(async (errors) => {
		const restaurantExists = await checkIfRestaurantExists(restaurant_name);
		if (!restaurantExists) {
			errors.restaurant = { message: `El restaurante con el nombre "${restaurant_name}" no existe`, status: 404 };
		}
	});
};

export const postDishesValidations = async (authorization: string, category_id: string): Promise<void> => {
	await handleValidate(async (errors) => {
		const categoryExists = await checkIfCategoryExists(category_id);
		if (!categoryExists) {
			errors.category = { message: `La categoría con el id "${category_id}" no existe`, status: 404 };
		}

		const category = await getCategoryById(category_id);
		if (category) {
			const { restaurant_id } = category;
			const isRestaurantAdmin = await checkIfIsRestaurantAdmin(authorization, restaurant_id);
			if (!isRestaurantAdmin) {
				errors.authorization = {
					message: `No estás autorizado para crear platillos en este restaurante.`,
					status: 401,
				};
			}
		}
	});
};

export const updateDishValidation = async (
	authorization: string,
	dish_id: string,
	dish_input: DishUpdateInput,
): Promise<void> => {
	await handleValidate(async (errors) => {
		const { hide, ...input } = dish_input;
		const dishExists = await checkIfDishExists(dish_id);
		if (!dishExists) {
			errors.dish = { message: `El platillo con el id ${dish_id} no existe`, status: 404 };
		}

		const dish = await getDishById(dish_id);
		if (dish) {
			const { restaurant_id, is_active } = dish;
			const isRestaurantAdmin = await checkIfIsRestaurantAdmin(authorization, restaurant_id);
			if (!isRestaurantAdmin) {
				errors.authorization = {
					message: `No estás autorizado para modificar platillos en este restaurante.`,
					status: 401,
				};
			}
			if (is_active === true && hide === false) {
				errors.dish_input = { message: "No puedes mostrar un platillo que ya está mostrado", status: 422 };
			}
			if (is_active === false && hide === true) {
				errors.dish_input = { message: "No puedes ocultar un platillo que ya está oculto", status: 422 };
			}
			const unprocessableBody = Object.values(input).length > 0 && !!dish_input.hide;
			if (unprocessableBody) {
				errors.dish_input = {
					message: "No puedes modificar las propiedades de un platillo y ocultar/mostrar al mismo tiempo",
					status: 422,
				};
			}
		}
	});
};

export const deleteDishValidation = async (authorization: string, dish_ids: string[]): Promise<void> => {
	await handleValidate(async (errors) => {
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
			errors.dish_ids = { message: `Los platillos con los id(s) ${invalidDishIds.join(", ")} no existen`, status: 404 };
		}

		const dish = await getDishById(dish_ids[0]);
		if (dish) {
			const { restaurant_id } = dish;
			const isRestaurantAdmin = await checkIfIsRestaurantAdmin(authorization, restaurant_id);
			if (!isRestaurantAdmin) {
				errors.authorization = {
					message: `No estás autorizado para eliminar platillos en este restaurante.`,
					status: 401,
				};
			}
		}
	});
};
