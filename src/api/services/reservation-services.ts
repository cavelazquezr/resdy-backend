import { Reservation } from "@prisma/client";
import {
	MyReservationsQueryParams,
	ReservationCreateInput,
	ReservationDetailOutput,
	ReservationOutput,
	ReservationUpdateInput,
} from "../../types/reservations";
import { calculatePriceAverage, calculateRatingAverage, verifyToken } from "../../utils";
import {
	createReservation,
	getMyReservations,
	getRestaurantReservations,
	updateReservation,
} from "../models/reservation-models";
import { createRating } from "../models/rating-models";
import { checkIfIsUserHasRatedRestaurant } from "../../utils/validations";
import { getCurrentUserInfo } from "../models/auth-models";
import { getObjectSignedUrl } from "../../config/S3";
import { getRestaurantSummary } from "../models/restaurant-models";
import { RestaurantCardOutput } from "../../types/common";

export const getRestaurantReservationsService = async (restaurant_name: string): Promise<ReservationOutput[]> => {
	const reservations = await getRestaurantReservations(restaurant_name);
	const reservation_records: Promise<ReservationOutput>[] = reservations.map(async (rating) => {
		const { user, ...ratingRecord } = rating;
		const defaultRatingRecord: Omit<Reservation, "user"> = {
			id: ratingRecord.id,
			number_of_person: ratingRecord.number_of_person,
			date_of_reservation: ratingRecord.date_of_reservation,
			status: ratingRecord.status,
			created_at: ratingRecord.created_at,
			updated_at: ratingRecord.updated_at ?? null,
			user_id: ratingRecord.user_id,
			restaurant_id: ratingRecord.restaurant_id,
		};
		return Promise.resolve({
			...defaultRatingRecord,
			user: {
				firstname: user.firstname,
				lastname: user.lastname ?? null,
				avatar_url: (await getObjectSignedUrl(`users/${user.id}/${user.id}-avatar`)) ?? undefined,
			},
		});
	});

	return Promise.all(reservation_records);
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
): Promise<Array<RestaurantCardOutput<ReservationDetailOutput>>> => {
	const current_user = await getCurrentUserInfo(authorization);
	if (current_user) {
		const reservations = await getMyReservations(current_user.email, query_params);
		const reservation_records: Array<RestaurantCardOutput<ReservationDetailOutput>> = await Promise.all(
			reservations.map(async (reservation) => {
				const {
					restaurant: { id: restaurant_id, name, customization, restaurant_information },
					...reservation_record
				} = reservation;

				const restaurant_summary = await getRestaurantSummary(restaurant_id);

				return {
					id: reservation_record.id,
					name: name,
					status: reservation_record.status,
					brand_name: customization?.name ?? "",
					address: restaurant_information?.address ?? "",
					city: restaurant_information?.city ?? "",
					header_url: customization?.header_url ?? null,
					restaurant_type: restaurant_information?.restaurant_type ?? "",
					summary: {
						rating: restaurant_summary.rating,
						rating_count: restaurant_summary.rating_count,
						price_average: restaurant_summary.price_average,
					},
					detail: {
						number_of_person: reservation_record.number_of_person,
						date_of_reservation: reservation_record.date_of_reservation,
					},
				};
			}),
		);
		return reservation_records;
	}
	return [];
};
