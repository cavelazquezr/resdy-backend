import { checkIfUserExists } from "../../utils/validations";
import { verifyToken } from "../../utils";
import { handleCatchError } from "../../utils/handleCatchError";

export const getMyFavListValidations = async (authorization: string): Promise<boolean | string> => {
	const { email } = verifyToken(authorization);
	const userExists = await checkIfUserExists(undefined, email);
	if (!userExists) {
		return handleCatchError({
			status: 404,
			message: "El usuario no existe",
		});
	}
	return true;
};

// export const getRestaurantRatingsValidations = async (
// 	restaurant_name: string,
// 	unauthorizedCallback: TsoaResponse<403, { reason: string }>,
// ): Promise<boolean | string> => {
// 	const restaurantExists = await checkIfRestaurantExists(restaurant_name);
// 	if (!restaurantExists) {
// 		return unauthorizedCallback(403, { reason: UserStatus.WEB_DOESNT_EXIST });
// 	}
// 	return true;
// };

// export const getRestaurantRatingStatsValidations = async (
// 	restaurant_name: string,
// 	unauthorizedCallback: TsoaResponse<403, { reason: string }>,
// ): Promise<boolean | string> => {
// 	const restaurantExists = await checkIfRestaurantExists(restaurant_name);
// 	if (!restaurantExists) {
// 		return unauthorizedCallback(403, { reason: UserStatus.WEB_DOESNT_EXIST });
// 	}
// 	return true;
// };

// export const putRatingValidations = async (
// 	authorization: string,
// 	rating_id: string,
// 	unauthorizedCallback: TsoaResponse<403, { reason: string }>,
// ): Promise<boolean | string> => {
// 	const rating = await getRatingById(rating_id);
// 	if (rating?.status === "finished") {
// 		return unauthorizedCallback(403, { reason: UserStatus.RATING_IS_FINISHED });
// 	}
// 	if (!rating) {
// 		return unauthorizedCallback(403, { reason: UserStatus.NOT_FOUND });
// 	}
// 	const isOwner = await checkIfIsRatingOwner(authorization, rating_id);
// 	if (!isOwner) {
// 		return unauthorizedCallback(403, { reason: UserStatus.UNAUTHORIZED });
// 	}
// 	return true;
// };
