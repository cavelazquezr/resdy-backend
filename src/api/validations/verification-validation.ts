import { CatchErrorDetails, handleCatchError } from "../../utils/handleCatchError";
import { checkIfRestaurantNameIsUsed, checkIfUserExists } from "../../utils/validations";

export const verifyIfEmailIsUsedValidations = async (email: string): Promise<void | CatchErrorDetails> => {
	const userExists = await checkIfUserExists(undefined, email);
	if (userExists) {
		return handleCatchError({
			status: 409,
			message: `Este correo ya está en uso`,
		});
	}
};

export const verifyIfNameIsUsedValidations = async (name: string): Promise<void | CatchErrorDetails> => {
	const restaurantExists = await checkIfRestaurantNameIsUsed(name);
	if (restaurantExists) {
		return handleCatchError({
			status: 409,
			message: "Este nombre de restaurante ya está en uso",
		});
	}
};
