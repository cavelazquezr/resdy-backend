import { TsoaResponse } from "tsoa";
import { checkIfRestaurantExists } from "../../utils/validations";

export const getRestaurantReservationsValidations = async (
	restaurant_name: string,
	notFoundCallback: TsoaResponse<404, { details: string }>,
): Promise<boolean | string> => {
	const restaurantExists = await checkIfRestaurantExists(restaurant_name);
	if (!restaurantExists) {
		return notFoundCallback(404, { details: `The restaurant with name "${restaurant_name}" does not exist.` });
	}
	return true;
};