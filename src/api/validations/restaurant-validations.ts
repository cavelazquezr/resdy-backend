import { RestaurantCreateInput, UpdateRestaurantInput } from "../../types/restaurant";
import { handleValidate } from "../../utils/handleValidate";
import { checkIfIsRestaurantAdmin, checkIfRestaurantExists, checkIfUserExists } from "../../utils/validations";

export const createRestaurantValidations = async (payload: RestaurantCreateInput): Promise<void> => {
	await handleValidate(async (errors) => {
		const restaurantExists = await checkIfRestaurantExists(payload.name);
		if (restaurantExists) {
			errors.name = {
				status: 409,
				message: `Ya existe un restaurante con el nombre "${payload.name}"`,
			};
		}

		const userExists = await checkIfUserExists(undefined, payload.email);
		if (userExists) {
			errors.email = {
				status: 409,
				message: `Ya existe un usuario con el email "${payload.email}"`,
			};
		}
	});
};

export const updateRestaurantValidations = async (
	authorization: string,
	restaurant_id: string,
): Promise<void> => {
	await handleValidate(async (errors) => {
		const isRestaurantAdmin = await checkIfIsRestaurantAdmin(authorization, restaurant_id);
		if (!isRestaurantAdmin) {
			errors.authorization = {
				message: `No estás autorizado para modificar categorías de este restaurante.`,
				status: 401,
			};
		}
	});
};
