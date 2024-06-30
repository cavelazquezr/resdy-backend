import { Controller, Get, Put, Body, Route, Path, Header, Res, Query, Tags, TsoaResponse } from "tsoa";
import {
	MyRatingQueryParams,
	RatingStatsOutput,
	RatingsOutput,
	RatingRecord,
	RatingUpdateRecord,
	RatingDetailOutput,
} from "../../types/rating";
import {
	getMyRatingsService,
	getRestaurantRatingStatsService,
	getRestaurantRatingsService,
	putRatingService,
} from "../services/rating-services";
import {
	getMyRatingsValidations,
	getRestaurantRatingStatsValidations,
	getRestaurantRatingsValidations,
	putRatingValidations,
} from "../validations/rating-validations";
import { RestaurantCardOutput } from "../../types/common";
import { handleRequest } from "../../utils/handleRequest";
import { CatchErrorDetails } from "../../utils/handleCatchError";

@Tags("Rating service")
@Route("rating")
export class RatingController extends Controller {
	@Get("myRatings")
	public async getMyRating(
		@Header() authorization: string,
		@Query() status?: string,
		@Query() city?: string,
		@Query() search?: string,
	): Promise<Array<RestaurantCardOutput<RatingDetailOutput>> | CatchErrorDetails> {
		const query_params: MyRatingQueryParams = {
			status,
			city,
			search,
		};
		return handleRequest<Array<RestaurantCardOutput<RatingDetailOutput>>>(this, async () => {
			await getMyRatingsValidations(authorization);
			return getMyRatingsService(authorization, query_params);
		});
	}
	@Get("{restaurant_name}")
	public async getRatings(@Path() restaurant_name: string): Promise<RatingRecord[] | CatchErrorDetails> {
		return handleRequest<RatingRecord[]>(this, async () => {
			await getRestaurantRatingsValidations(restaurant_name);
			return getRestaurantRatingsService(restaurant_name);
		});
	}

	@Get("stats/{restaurant_name}")
	public async getRatingStats(@Path() restaurant_name: string): Promise<RatingStatsOutput | CatchErrorDetails> {
		return handleRequest<RatingStatsOutput>(this, async () => {
			await getRestaurantRatingStatsValidations(restaurant_name);
			return getRestaurantRatingStatsService(restaurant_name);
		});
	}

	@Put("{rating_id}")
	public async putRating(
		@Header() authorization: string,
		@Path() rating_id: string,
		@Body() rating_record: RatingUpdateRecord,
	): Promise<RatingsOutput | CatchErrorDetails> {
		return handleRequest<RatingsOutput>(this, async () => {
			await putRatingValidations(authorization, rating_id);
			return putRatingService(rating_id, rating_record);
		});
	}
}
