import { Controller, Get, Route, Path, Res, Tags, TsoaResponse, Post, Header, Body } from "tsoa";
import { ReservationCreateInput, ReservationOutput } from "../../types/reservations";
import { createReservationService, getRestaurantReservationsService } from "../services/reservation-services";
import { createReservationValidations, getRestaurantReservationsValidations } from "../validations/reservation-validations";
import { Reservation } from "@prisma/client";

@Tags("Reservation service")
@Route("reservation")
export class ReservationController extends Controller {
	@Get("{restaurant_name}")
	public async getRatings(
		@Path() restaurant_name: string,
		@Res() notFoundCallback: TsoaResponse<404, { details: string }>,
	): Promise<ReservationOutput[] | string> {
		await getRestaurantReservationsValidations(restaurant_name, notFoundCallback);
		return getRestaurantReservationsService(restaurant_name);
	}

	@Post("{restaurant_name}")
	public async postCategory(
		@Header() authorization: string,
		@Path() restaurant_name: string,
		@Body() reservation_input: ReservationCreateInput,
		@Res() notFoundCallback: TsoaResponse<404, { details: string }>,
		@Res() unprocessableCallback: TsoaResponse<422, { details: string }>,
	): Promise<Reservation | string> {
		await createReservationValidations(authorization, restaurant_name, reservation_input, notFoundCallback, unprocessableCallback);
		return createReservationService(authorization, restaurant_name, reservation_input);
	}
}
