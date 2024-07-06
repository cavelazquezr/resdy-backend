import { RestaurantCreateInput } from "../../types/restaurant";
import { handleValidate } from "../../utils/handleValidate";
import { checkIfRestaurantExists, checkIfUserExists } from "../../utils/validations";

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
