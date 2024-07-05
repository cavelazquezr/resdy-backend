import { RestaurantCreateInput } from "../../types/restaurant";
import { handleCatchError } from "../../utils/handleCatchError";
import { checkIfRestaurantExists, checkIfUserExists } from "../../utils/validations";

export const createRestaurantValidations = async (payload: RestaurantCreateInput): Promise<boolean | string> => {
	const restaurantExists = await checkIfRestaurantExists(payload.name);
	if (restaurantExists) {
		return handleCatchError({
			status: 409,
			message: `Ya existe un restaurante con el nombre "${payload.name}"`,
			path: "/restaurant",
		});
	}
	const userExists = await checkIfUserExists(undefined, payload.email);
	if (userExists) {
		return handleCatchError({
			status: 409,
			message: `Ya existe un usuario con el email "${payload.email}"`,
			path: "/restaurant",
		});
	}
	return true;
};
