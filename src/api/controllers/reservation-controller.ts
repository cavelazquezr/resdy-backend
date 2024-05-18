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

@Tags("Reservation service")
@Route("reservation")
export class ReservationController extends Controller {
	@Get("myReservations")
	public async getMyReservations(
		@Header() authorization: string,
		@Res() notFoundCallback: TsoaResponse<404, { details: string }>,
		@Query() status?: string,
		@Query() city?: string,
		@Query() search?: string,
		@Query() start_date?: string,
		@Query() end_date?: string,
	): Promise<Array<RestaurantCardOutput<ReservationDetailOutput>>> {
		const query_params: MyReservationsQueryParams = {
			status,
			city,
			search,
			start_date,
			end_date,
		};
		await getMyReservationValidations(authorization, notFoundCallback);
		return getMyReservationsService(authorization, query_params);
	}
	@Get("{restaurant_name}")
	public async getReservations(
		@Path() restaurant_name: string,
		@Res() notFoundCallback: TsoaResponse<404, { details: string }>,
	): Promise<ReservationOutput[] | string> {
		await getRestaurantReservationsValidations(restaurant_name, notFoundCallback);
		return getRestaurantReservationsService(restaurant_name);
	}

	@Post("{restaurant_name}")
	public async postReservation(
		@Header() authorization: string,
		@Path() restaurant_name: string,
		@Body() reservation_input: ReservationCreateInput,
		@Res() notFoundCallback: TsoaResponse<404, { details: string }>,
		@Res() unprocessableCallback: TsoaResponse<422, { details: string }>,
	): Promise<Reservation | string> {
		await createReservationValidations(
			authorization,
			restaurant_name,
			reservation_input,
			notFoundCallback,
			unprocessableCallback,
		);
		return createReservationService(authorization, restaurant_name, reservation_input);
	}

	@Put("{reservation_id}")
	public async putReservation(
		@Header() authorization: string,
		@Path() reservation_id: string,
		@Body() reservation_input: ReservationUpdateInput,
		@Res() unauthorizedCallback: TsoaResponse<401, { details: string }>,
		@Res() notFoundCallback: TsoaResponse<404, { details: string }>,
	): Promise<Reservation | string> {
		await updateReservationValidation(authorization, reservation_id, unauthorizedCallback, notFoundCallback);
		return updateReservationService(reservation_id, reservation_input);
	}
}
