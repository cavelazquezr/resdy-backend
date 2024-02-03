import client from "../../config/client";

const { reservation } = client;

export const getReservationById = async (reservation_id: string) => {
	const query = await reservation.findUnique({
		where: { id: reservation_id },
	});
	return query;
};

export const getRestaurantReservations = async (restaurant_name: string) => {
	const query = await reservation.findMany({
		where: {
			restaurant: {
				name: restaurant_name,
			},
		},
		select: {
			id: true,
			number_of_person: true,
			date_of_reservation: true,
			status: true,
			created_at: true,
			updated_at: true,
			user_id: true,
			restaurant_id: true,
			user: {
				select: {
					firstname: true,
					lastname: true,
					avatar_url: true,
				},
			},
		},
	});
	return query;
};
