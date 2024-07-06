import { handleValidate } from "../../utils/handleValidate";
import { checkIfRestaurantNameIsUsed, checkIfUserExists } from "../../utils/validations";

export const verifyIfEmailIsUsedValidations = async (email: string): Promise<void> => {
	await handleValidate(async (errors) => {
		const userExists = await checkIfUserExists(undefined, email);
		if (userExists) {
			errors.email = {
				status: 409,
				message: "Este correo ya está en uso",
			};
		}
	});
};

export const verifyIfNameIsUsedValidations = async (name: string): Promise<void> => {
	await handleValidate(async (errors) => {
		const restaurantExists = await checkIfRestaurantNameIsUsed(name);
		if (restaurantExists) {
			errors.name = {
				status: 409,
				message: "Este nombre de restaurante ya está en uso",
			};
		}
	});
};
