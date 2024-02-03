import { Reservation } from "@prisma/client";
import { ReservationCreateInput, ReservationOutput } from "../../types/reservations";
import { verifyToken } from "../../utils";
import { createReservation, getRestaurantReservations } from "../models/reservation-models";

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
) => {
	const { email: user_email } = verifyToken(authorization);
	const newReservation: Reservation = await createReservation(user_email, restaurant_name, reservation_input);
	return newReservation;
};
