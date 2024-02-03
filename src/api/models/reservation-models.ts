import client from "../../config/client";
import { ReservationCreateInput } from "../../types/reservations";

const { reservation } = client;

export const getReservationById = async (reservation_id: string) => {
	const query = await reservation.findUnique({
		where: { id: reservation_id },
	});
	return query;
};

export const getReservationByUserAndDay = async (user_email: string, date_of_reservation: Date) => {
	const startOfDay = new Date(date_of_reservation);
	startOfDay.setHours(0, 0, 0, 0);

	const endOfDay = new Date(date_of_reservation);
	endOfDay.setHours(23, 59, 59, 999);

	const query = await reservation.findMany({
		where: {
			AND: [
				{
					user: {
						email: user_email,
					},
				},
				{
					date_of_reservation: {
						gte: startOfDay,
						lte: endOfDay,
					},
				},
			],
		},
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

export const createReservation = async (
	user_email: string,
	restaurant_name: string,
	reservation_input: ReservationCreateInput,
) => {
	const query = await reservation.create({
		data: {
			...reservation_input,
			status: "to_be_confirmed",
			restaurant: {
				connect: {
					name: restaurant_name,
				},
			},
			user: {
				connect: {
					email: user_email,
				},
			},
		},
	});
	return query;
};
