import { TsoaResponse } from "tsoa";
import {
	checkIfRestaurantExists,
	checkIfThereAreUserReservationsForDate,
	checkIfTokenIsValid,
} from "../../utils/validations";
import { ReservationCreateInput } from "../../types/reservations";
import { getReservationByUserAndDay } from "../models/reservation-models";
import { verify } from "crypto";
import { verifyToken } from "../../utils";

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

export const createReservationValidations = async (
	authorization: string,
	restaurant_name: string,
	reservation_input: ReservationCreateInput,
	notFoundCallback: TsoaResponse<404, { details: string }>,
	unprocessableCallback: TsoaResponse<422, { details: string }>,
): Promise<boolean | string> => {
	const { date_of_reservation } = reservation_input;
	const isTokenValid = await checkIfTokenIsValid(authorization);
	if (!isTokenValid) {
		return unprocessableCallback(422, { details: "The token is not valid." });
	}
	const { email: user_email } = verifyToken(authorization);
	const restaurantExists = await checkIfRestaurantExists(restaurant_name);
	if (!restaurantExists) {
		return notFoundCallback(404, { details: `The restaurant with name "${restaurant_name}" does not exist.` });
	}
	const currentTimestamp = new Date().getTime();
	if (date_of_reservation.getTime() < currentTimestamp) {
		return unprocessableCallback(422, { details: `You cannot create a reservation for past days` });
	}
	const existsReservationForDate = await checkIfThereAreUserReservationsForDate(user_email, date_of_reservation);
	if (existsReservationForDate) {
		return unprocessableCallback(422, { details: `You already have a reservation for this day` });
	}
	return true;
};
