import { Controller, Get, Route, Path, Tags } from "tsoa";
import { getRatingStatsHandler } from "./rating.model.get";
import { RatingStatsOutput } from "../../types/rating";

@Tags("Rating service")
@Route("rating")
export class RatingController extends Controller {
	@Get("stats/{restaurant_id}")
	public async getRatingStats(@Path() restaurant_id: string): Promise<RatingStatsOutput | string> {
		return getRatingStatsHandler(restaurant_id);
	}
}
