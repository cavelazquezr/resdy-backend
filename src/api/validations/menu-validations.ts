import { TsoaResponse } from "tsoa";
import { UserStatus } from "../../types/messages";
import { checkIfRestaurantExists } from "../../utils/validations";

export const getMenuValidations = async (
	restaurant_name: string,
	notFoundCallback: TsoaResponse<404, { details: string }>,
): Promise<boolean | string> => {
	const restaurantExists = await checkIfRestaurantExists(restaurant_name);
	if (!restaurantExists) {
		return notFoundCallback(404, { details: UserStatus.WEB_DOESNT_EXIST });
	}
	return true;
};


