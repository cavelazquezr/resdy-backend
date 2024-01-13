import { Controller, Get, Route, Path, Header, Res, Query, Tags, TsoaResponse } from "tsoa";
import { getMyRatingsHandler, getRatingStatsHandler, getRatingsHandler } from "./rating.model.get";
import { MyRatingOutput, RatingStatsOutput, RatingsOutput } from "../../types/rating";

@Tags("Rating service")
@Route("rating")
export class RatingController extends Controller {
	@Get("myRatings")
	public async getMyRatingStats(
		@Header() authorization: string,
		@Res() unauthorizedCallback: TsoaResponse<403, { reason: string }>,
		@Query() status?: string,
		@Query() city?: string,
		@Query() address?: string,
		@Query() restaurant_type?: string,
	): Promise<MyRatingOutput[] | string> {
		return getMyRatingsHandler(authorization, unauthorizedCallback, status, city, address, restaurant_type);
	}
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
