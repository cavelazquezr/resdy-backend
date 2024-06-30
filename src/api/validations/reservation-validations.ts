import {
	checkIfIsRestaurantAdmin,
	checkIfRestaurantExists,
	checkIfThereAreUserReservationsForDate,
	checkIfUserExists,
} from "../../utils/validations";
import { ReservationCreateInput } from "../../types/reservations";
import { getReservationById } from "../models/reservation-models";
import { verifyToken } from "../../utils";
import { handleCatchError } from "../../utils/handleCatchError";

export const getRestaurantReservationsValidations = async (restaurant_name: string): Promise<boolean | string> => {
	const restaurantExists = await checkIfRestaurantExists(restaurant_name);
	if (!restaurantExists) {
		return handleCatchError({
			status: 404,
			message: `El restaurante con el nombre "${restaurant_name}" no existe`,
		});
	}
	return true;
};

export const createReservationValidations = async (
	authorization: string,
	restaurant_name: string,
	reservation_input: ReservationCreateInput,
): Promise<boolean | string> => {
	const { date_of_reservation } = reservation_input;
	const { email: user_email } = verifyToken(authorization);
	const restaurantExists = await checkIfRestaurantExists(restaurant_name);
	if (!restaurantExists) {
		return handleCatchError({
			status: 404,
			message: `El restaurante con el nombre "${restaurant_name}" no existe`,
		});
	}
	const currentTimestamp = new Date().getTime();
	if (date_of_reservation.getTime() < currentTimestamp) {
		return handleCatchError({
			status: 422,
			message: "No puedes crear una reserva para días pasados",
		});
	}
	const existsReservationForDate = await checkIfThereAreUserReservationsForDate(
		user_email,
		restaurant_name,
		date_of_reservation,
	);
	if (existsReservationForDate) {
		return handleCatchError({
			status: 422,
			message: "Ya tienes una reserva para este día",
		});
	}
	return true;
};

export const updateReservationValidation = async (
	authorization: string,
	reservation_id: string,
): Promise<boolean | string> => {
	const reservation = await getReservationById(reservation_id);
	if (!reservation) {
		return handleCatchError({
			status: 404,
			message: `La reserva de id "${reservation_id}" no existe`,
		});
	}
	const isRestaurantAdmin = await checkIfIsRestaurantAdmin(authorization, reservation.restaurant_id);
	if (!isRestaurantAdmin) {
		return handleCatchError({
			status: 401,
			message: `No estas autorizado para realizar esta acción`,
		});
	}
	return true;
};

export const getMyReservationValidations = async (authorization: string): Promise<boolean | string> => {
	const { email } = verifyToken(authorization);
	const userExists = await checkIfUserExists(undefined, email);
	if (!userExists) {
		return handleCatchError({
			status: 404,
			message: `No existe el usuario con el email "${email}"`,
		});
	}
	return true;
};
