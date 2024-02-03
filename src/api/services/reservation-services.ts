import { Reservation } from "@prisma/client";
import { ReservationCreateInput, ReservationOutput, ReservationUpdateInput } from "../../types/reservations";
import { verifyToken } from "../../utils";
import { createReservation, getRestaurantReservations, updateReservation } from "../models/reservation-models";
import { createRating } from "../models/rating-models";
import { checkIfIsUserHasRatedRestaurant } from "../../utils/validations";

export const getRestaurantReservationsService = async (restaurant_name: string): Promise<ReservationOutput[]> => {
	const reservations = await getRestaurantReservations(restaurant_name);
	const reservation_records: ReservationOutput[] = reservations.map((rating) => {
		const { user, ...ratingRecord } = rating;
		return {
			...ratingRecord,
			updated_at: rating.updated_at ?? null,
			user: {
				...user,
				avatar_url: user.avatar_url ?? null,
			},
		};
	});

	return reservation_records;
};

export const createReservationService = async (
	authorization: string,
	restaurant_name: string,
	reservation_input: ReservationCreateInput,
): Promise<Reservation> => {
	const { email: user_email } = verifyToken(authorization);
	const newReservation: Reservation = await createReservation(user_email, restaurant_name, reservation_input);
	return newReservation;
};

export const updateReservationService = async (
	reservation_id: string,
	reservation_input: ReservationUpdateInput,
): Promise<Reservation> => {
	try {
		const updatedReservation: Reservation = await updateReservation(reservation_id, reservation_input);
		if (updatedReservation.status === "finished") {
			const { user_id, restaurant_id } = updatedReservation;
			const hasRatedRestaurant: boolean = await checkIfIsUserHasRatedRestaurant(user_id, restaurant_id);
			if (!hasRatedRestaurant) {
				await createRating(user_id, restaurant_id);
			}
		}
		return updatedReservation;
	} catch (err) {
		return Promise.reject(err);
	}
};
