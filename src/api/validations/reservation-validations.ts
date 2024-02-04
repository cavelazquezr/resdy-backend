import { TsoaResponse } from "tsoa";
import {
	checkIfIsRestaurantAdmin,
	checkIfRestaurantExists,
	checkIfThereAreUserReservationsForDate,
	checkIfUserExists,
} from "../../utils/validations";
import { ReservationCreateInput } from "../../types/reservations";
import { getReservationById } from "../models/reservation-models";
import { verifyToken } from "../../utils";

export const getRestaurantReservationsValidations = async (
	restaurant_name: string,
	notFoundCallback: TsoaResponse<404, { details: string }>,
): Promise<boolean | string> => {
	const restaurantExists = await checkIfRestaurantExists(restaurant_name);
	if (!restaurantExists) {
		return Promise.reject(
			notFoundCallback(404, { details: `The restaurant with name "${restaurant_name}" does not exist.` }),
		);
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
	const { email: user_email } = verifyToken(authorization);
	const restaurantExists = await checkIfRestaurantExists(restaurant_name);
	if (!restaurantExists) {
		return Promise.reject(
			notFoundCallback(404, { details: `The restaurant with name "${restaurant_name}" does not exist.` }),
		);
	}
	const currentTimestamp = new Date().getTime();
	if (date_of_reservation.getTime() < currentTimestamp) {
		return Promise.reject(unprocessableCallback(422, { details: `You cannot create a reservation for past days` }));
	}
	const existsReservationForDate = await checkIfThereAreUserReservationsForDate(
		user_email,
		restaurant_name,
		date_of_reservation,
	);
	if (existsReservationForDate) {
		return Promise.reject(unprocessableCallback(422, { details: `You already have a reservation for this day` }));
	}
	return true;
};

export const updateReservationValidation = async (
	authorization: string,
	reservation_id: string,
	unauthorizedCallback: TsoaResponse<401, { details: string }>,
	notFoundCallback: TsoaResponse<404, { details: string }>,
): Promise<boolean | string> => {
	const reservation = await getReservationById(reservation_id);
	if (!reservation) {
		return Promise.reject(notFoundCallback(404, { details: `Reservation of id ${reservation_id} does not exist.` }));
	}
	const isRestaurantAdmin = await checkIfIsRestaurantAdmin(authorization, reservation.restaurant_id);
	if (!isRestaurantAdmin) {
		return Promise.reject(unauthorizedCallback(401, { details: `You are not authorized to update this reservation.` }));
	}
	return true;
};

export const getMyReservationValidations = async (
	authorization: string,
	notFoundCallback: TsoaResponse<404, { details: string }>,
): Promise<boolean | string> => {
	const { email } = verifyToken(authorization);
	const userExists = await checkIfUserExists(undefined, email);
	if (!userExists) {
		return notFoundCallback(404, { details: "User with the provided email doesn't exist" });
	}
	return true;
};
