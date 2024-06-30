import { checkIfRestaurantExists } from "../../utils/validations";
import { handleCatchError } from "../../utils/handleCatchError";

export const getMenuValidations = async (restaurant_name: string): Promise<boolean | string> => {
	const restaurantExists = await checkIfRestaurantExists(restaurant_name);
	if (!restaurantExists) {
		return handleCatchError({
			status: 404,
			message: `El restaurante con el nombre "${restaurant_name}" no existe`,
		});
	}
	return true;
};
