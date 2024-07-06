import {
	checkIfIsRestaurantAdmin,
	checkIfRestaurantExists,
	checkIfThereAreUserReservationsForDate,
	checkIfUserExists,
} from "../../utils/validations";
import { ReservationCreateInput } from "../../types/reservations";
import { getReservationById } from "../models/reservation-models";
import { verifyToken } from "../../utils";
import { handleValidate } from "../../utils/handleValidate";

export const getRestaurantReservationsValidations = async (restaurant_name: string): Promise<void> => {
	await handleValidate(async (errors) => {
		const restaurantExists = await checkIfRestaurantExists(restaurant_name);
		if (!restaurantExists) {
			errors.restaurant = {
				status: 404,
				message: `El restaurante con el nombre "${restaurant_name}" no existe`,
			};
		}
	});
};

export const createReservationValidations = async (
	authorization: string,
	restaurant_name: string,
	reservation_input: ReservationCreateInput,
): Promise<void> => {
	await handleValidate(async (errors) => {
		const { date_of_reservation } = reservation_input;
		const { email: user_email } = verifyToken(authorization);

		const restaurantExists = await checkIfRestaurantExists(restaurant_name);
		if (!restaurantExists) {
			errors.restaurant = {
				status: 404,
				message: `El restaurante con el nombre "${restaurant_name}" no existe`,
			};
		}

		const currentTimestamp = new Date().getTime();
		if (date_of_reservation.getTime() < currentTimestamp) {
			errors.date = {
				status: 422,
				message: "No puedes crear una reserva para días pasados",
			};
		}

		const existsReservationForDate = await checkIfThereAreUserReservationsForDate(
			user_email,
			restaurant_name,
			date_of_reservation,
		);
		if (existsReservationForDate) {
			errors.reservation = {
				status: 422,
				message: "Ya tienes una reserva para este día",
			};
		}
	});
};

export const updateReservationValidation = async (authorization: string, reservation_id: string): Promise<void> => {
	await handleValidate(async (errors) => {
		const reservation = await getReservationById(reservation_id);
		if (!reservation) {
			errors.reservation = {
				status: 404,
				message: `La reserva de id "${reservation_id}" no existe`,
			};
			return;
		}

		const isRestaurantAdmin = await checkIfIsRestaurantAdmin(authorization, reservation.restaurant_id);
		if (!isRestaurantAdmin) {
			errors.authorization = {
				status: 401,
				message: `No estás autorizado para realizar esta acción`,
			};
		}
	});
};

export const getMyReservationValidations = async (authorization: string): Promise<void> => {
	await handleValidate(async (errors) => {
		const { email } = verifyToken(authorization);
		const userExists = await checkIfUserExists(undefined, email);
		if (!userExists) {
			errors.user = {
				status: 404,
				message: `No existe el usuario con el email "${email}"`,
			};
		}
	});
};
