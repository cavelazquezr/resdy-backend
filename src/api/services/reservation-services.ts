import { Reservation } from "@prisma/client";
import {
	MyReservationOutput,
	MyReservationsQueryParams,
	ReservationCreateInput,
	ReservationOutput,
	ReservationUpdateInput,
} from "../../types/reservations";
import { calculateRatingAverage, verifyToken } from "../../utils";
import {
	createReservation,
	getMyReservations,
	getRestaurantReservations,
	updateReservation,
} from "../models/reservation-models";
import { createRating } from "../models/rating-models";
import { checkIfIsUserHasRatedRestaurant } from "../../utils/validations";
import { getCurrentUserInfo } from "../models/auth-models";

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

export const getMyReservationsService = async (
	authorization: string,
	query_params: MyReservationsQueryParams,
): Promise<MyReservationOutput[]> => {
	const current_user = await getCurrentUserInfo(authorization);
	if (current_user) {
		const reservations = await getMyReservations(current_user.email, query_params);
		const reservation_records: MyReservationOutput[] = reservations.map((reservation) => {
			const {
				restaurant: { name, customization, restaurant_information, ratings },
				...reservationRecord
			} = reservation;

			return {
				id: reservation.id,
				name,
				status: reservationRecord.status,
				brand_name: customization?.name ?? undefined,
				header_url: customization?.header_url ?? undefined,
				city: restaurant_information?.city ?? undefined,
				address: restaurant_information?.address ?? undefined,
				restaurant_type: restaurant_information?.restaurant_type ?? undefined,
				rating_info: {
					rating: calculateRatingAverage(ratings).toString(),
					rating_count: ratings.length,
				},
			};
		});
		return reservation_records;
	}
	return [];
};
