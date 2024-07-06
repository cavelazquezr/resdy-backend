import { checkIfIsRatingOwner, checkIfRestaurantExists, checkIfUserExists } from "../../utils/validations";
import { verifyToken } from "../../utils";
import { getRatingById } from "../models/rating-models";
import { handleValidate } from "../../utils/handleValidate";

export const getMyRatingsValidations = async (authorization: string): Promise<void> => {
	await handleValidate(async (errors) => {
		const { email } = verifyToken(authorization);
		const userExists = await checkIfUserExists(undefined, email);
		if (!userExists) {
			errors.user = { status: 404, message: "El usuario no existe" };
		}
	});
};

export const getRestaurantRatingsValidations = async (restaurant_name: string): Promise<void> => {
	await handleValidate(async (errors) => {
		const restaurantExists = await checkIfRestaurantExists(restaurant_name);
		if (!restaurantExists) {
			errors.restaurant = { status: 404, message: `El restaurante con el nombre "${restaurant_name}" no existe` };
		}
	});
};

export const getRestaurantRatingStatsValidations = async (restaurant_name: string): Promise<void> => {
	await handleValidate(async (errors) => {
		const restaurantExists = await checkIfRestaurantExists(restaurant_name);
		if (!restaurantExists) {
			errors.restaurant = { status: 403, message: `El restaurante con el nombre "${restaurant_name}" no existe` };
		}
	});
};

export const putRatingValidations = async (authorization: string, rating_id: string): Promise<void> => {
	await handleValidate(async (errors) => {
		const rating = await getRatingById(rating_id);
		if (rating?.status === "finished") {
			errors.rating = { status: 422, message: "No puedes modificar una reseña que ya ha sido finalizada" };
		}
		if (!rating) {
			errors.rating = { status: 422, message: "La reseña no existe" };
		}
		const isOwner = await checkIfIsRatingOwner(authorization, rating_id);
		if (!isOwner) {
			errors.authorization = { status: 403, message: "No tienes permisos para modificar esta reseña" };
		}
	});
};
