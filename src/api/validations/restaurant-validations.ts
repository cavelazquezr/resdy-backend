import { RestaurantCreateInput } from "../../types/restaurant";
import { handleCatchError } from "../../utils/handleCatchError";
import { checkIfRestaurantExists, checkIfUserExists } from "../../utils/validations";

export const createRestaurantValidations = async (payload: RestaurantCreateInput): Promise<boolean | string> => {
	const restaurantExists = await checkIfRestaurantExists(payload.name);
	if (restaurantExists) {
		return handleCatchError(409, {
			status: 409,
			message: `The restaurant of name '${payload.name}' already exists`,
			path: "/restaurant",
		});
	}
	const userExists = await checkIfUserExists(undefined, payload.email);
	if (userExists) {
		return handleCatchError(409, {
			status: 409,
			message: `The user with email '${payload.email}' already exists`,
			path: "/restaurant",
		});
	}
	return true;
};
