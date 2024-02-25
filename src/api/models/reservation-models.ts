import client from "../../config/client";
import { MyReservationsQueryParams, ReservationCreateInput, ReservationUpdateInput } from "../../types/reservations";
import { convertToAmpersandSeparated } from "../../utils";

const { reservation } = client;

export const getReservationById = async (reservation_id: string) => {
	const query = await reservation.findUnique({
		where: { id: reservation_id },
	});
	return query;
};

export const getReservationByUserAndDay = async (
	user_email: string,
	restaurant_name: string,
	date_of_reservation: Date,
) => {
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
					restaurant: {
						name: restaurant_name,
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

export const updateReservation = async (reservation_id: string, reservation_input: ReservationUpdateInput) => {
	const query = await reservation.update({
		where: {
			id: reservation_id,
		},
		data: {
			status: reservation_input.status,
		},
	});
	return query;
};

export const getMyReservations = async (user_email: string, query_params?: MyReservationsQueryParams) => {
	const full_text_search = query_params?.search && convertToAmpersandSeparated(query_params?.search);
	const query = await reservation.findMany({
		where: {
			status: { equals: query_params?.status },
			user: {
				email: {
					equals: user_email,
				},
			},
			restaurant: {
				AND: [
					{
						restaurant_information: {
							city: { search: query_params?.city, mode: "insensitive" },
						},
					},
					{
						customization: {
							name: { search: full_text_search, mode: "insensitive" },
						},
					},
				],
			},
		},
		select: {
			id: true,
			status: true,
			date_of_reservation: true,
			restaurant: {
				select: {
					name: true,
					restaurant_information: {
						select: {
							city: true,
							country: true,
							address: true,
							restaurant_type: true,
						},
					},
					customization: {
						select: {
							name: true,
							header_url: true,
						},
					},
					ratings: true,
					dishes: true,
				},
			},
		},
		orderBy: { status: "desc" },
	});
	return query;
};
