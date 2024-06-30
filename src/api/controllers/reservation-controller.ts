import { Controller, Get, Route, Path, Res, Tags, TsoaResponse, Post, Header, Body, Put, Query } from "tsoa";
import {
	MyReservationsQueryParams,
	ReservationCreateInput,
	ReservationDetailOutput,
	ReservationOutput,
	ReservationUpdateInput,
} from "../../types/reservations";
import {
	createReservationService,
	getMyReservationsService,
	getRestaurantReservationsService,
	updateReservationService,
} from "../services/reservation-services";
import {
	createReservationValidations,
	getMyReservationValidations,
	getRestaurantReservationsValidations,
	updateReservationValidation,
} from "../validations/reservation-validations";
import { Reservation } from "@prisma/client";
import { RestaurantCardOutput } from "../../types/common";
import { handleRequest } from "../../utils/handleRequest";
import { CatchErrorDetails } from "../../utils/handleCatchError";

@Tags("Reservation service")
@Route("reservation")
export class ReservationController extends Controller {
	@Get("myReservations")
	public async getMyReservations(
		@Header() authorization: string,
		@Query() status?: string,
		@Query() city?: string,
		@Query() search?: string,
		@Query() start_date?: string,
		@Query() end_date?: string,
	): Promise<Array<RestaurantCardOutput<ReservationDetailOutput>> | CatchErrorDetails> {
		const query_params: MyReservationsQueryParams = {
			status,
			city,
			search,
			start_date,
			end_date,
		};
		await getMyReservationValidations(authorization);
		return getMyReservationsService(authorization, query_params);
	}
	@Get("{restaurant_name}")
	public async getReservations(@Path() restaurant_name: string): Promise<ReservationOutput[] | CatchErrorDetails> {
		return handleRequest<ReservationOutput[]>(this, async () => {
			await getRestaurantReservationsValidations(restaurant_name);
			return getRestaurantReservationsService(restaurant_name);
		});
	}

	@Post("{restaurant_name}")
	public async postReservation(
		@Header() authorization: string,
		@Path() restaurant_name: string,
		@Body() reservation_input: ReservationCreateInput,
	): Promise<Reservation | CatchErrorDetails> {
		return handleRequest<Reservation>(this, async () => {
			await createReservationValidations(authorization, restaurant_name, reservation_input);
			return createReservationService(authorization, restaurant_name, reservation_input);
		});
	}

	@Put("{reservation_id}")
	public async putReservation(
		@Header() authorization: string,
		@Path() reservation_id: string,
		@Body() reservation_input: ReservationUpdateInput,
	): Promise<Reservation | CatchErrorDetails> {
		return handleRequest<Reservation>(this, async () => {
			await updateReservationValidation(authorization, reservation_id);
			return updateReservationService(reservation_id, reservation_input);
		});
	}
}
