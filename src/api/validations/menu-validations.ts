import { checkIfRestaurantExists } from "../../utils/validations";
import { handleValidate } from "../../utils/handleValidate";

export const getMenuValidations = async (restaurant_name: string): Promise<void> => {
	await handleValidate(async (errors) => {
		const restaurantExists = await checkIfRestaurantExists(restaurant_name);
		if (!restaurantExists) {
			errors.restaurant = { message: `El restaurante con el nombre "${restaurant_name}" no existe`, status: 404 };
		}
	});
};
