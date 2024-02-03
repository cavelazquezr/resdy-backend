import { Controller, Get, Route, Path, Res, Tags, TsoaResponse } from "tsoa";
import { ReservationOutput } from "../../types/reservations";
import { getRestaurantReservationsService } from "../services/reservation-services";
import { getRestaurantReservationsValidations } from "../validations/reservation-validations";

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
}
