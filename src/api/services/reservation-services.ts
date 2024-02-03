import { ReservationOutput } from "../../types/reservations";
import { getRestaurantReservations } from "../models/reservation-models";

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
