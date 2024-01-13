import { Controller, Get, Route, Path, Res, Tags, TsoaResponse } from "tsoa";
import { getRatingStatsHandler, getRatingsHandler } from "./rating.model.get";
import { RatingStatsOutput, RatingsOutput } from "../../types/rating";

@Tags("Rating service")
@Route("rating")
export class RatingController extends Controller {
	@Get("{restaurant_id}")
	public async getRatingsStats(
		@Path() restaurant_id: string,
		@Res() unauthorizedCallback: TsoaResponse<403, { reason: string }>,
	): Promise<RatingsOutput[] | string> {
		return getRatingsHandler(restaurant_id, unauthorizedCallback);
	}
	@Get("stats/{restaurant_id}")
	public async getRatingStats(@Path() restaurant_id: string): Promise<RatingStatsOutput | string> {
		return getRatingStatsHandler(restaurant_id);
	}
}
