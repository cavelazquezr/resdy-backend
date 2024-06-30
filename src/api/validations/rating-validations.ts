import { checkIfIsRatingOwner, checkIfRestaurantExists, checkIfUserExists } from "../../utils/validations";
import { verifyToken } from "../../utils";
import { getRatingById } from "../models/rating-models";
import { handleCatchError } from "../../utils/handleCatchError";

export const getMyRatingsValidations = async (authorization: string): Promise<boolean | string> => {
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

export const getRestaurantRatingsValidations = async (restaurant_name: string): Promise<boolean | string> => {
	const restaurantExists = await checkIfRestaurantExists(restaurant_name);
	if (!restaurantExists) {
		return handleCatchError({
			status: 404,
			message: `El restaurante con el nombre "${restaurant_name}" no existe`,
		});
	}
	return true;
};

export const getRestaurantRatingStatsValidations = async (restaurant_name: string): Promise<boolean | string> => {
	const restaurantExists = await checkIfRestaurantExists(restaurant_name);
	if (!restaurantExists) {
		return handleCatchError({
			status: 403,
			message: `El restaurante con el nombre "${restaurant_name}" no existe`,
		});
	}
	return true;
};

export const putRatingValidations = async (authorization: string, rating_id: string): Promise<boolean | string> => {
	const rating = await getRatingById(rating_id);
	if (rating?.status === "finished") {
		return handleCatchError({
			status: 422,
			message: "No puedes modificar una reseña que ya ha sido finalizada",
		});
	}
	if (!rating) {
		return handleCatchError({
			status: 422,
			message: "La reseña no existe",
		});
	}
	const isOwner = await checkIfIsRatingOwner(authorization, rating_id);
	if (!isOwner) {
		return handleCatchError({
			status: 403,
			message: "No tienes permisos para modificar esta reseña",
		});
	}
	return true;
};
