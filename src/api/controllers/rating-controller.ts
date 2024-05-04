import { Controller, Get, Put, Body, Route, Path, Header, Res, Query, Tags, TsoaResponse } from "tsoa";
import {
	MyRatingOutput,
	MyRatingQueryParams,
	RatingStatsOutput,
	RatingsOutput,
	RatingRecord,
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

@Tags("Rating service")
@Route("rating")
export class RatingController extends Controller {
	@Get("myRatings")
	public async getMyRating(
		@Header() authorization: string,
		@Res() unauthorizedCallback: TsoaResponse<403, { reason: string }>,
		@Query() status?: string,
		@Query() city?: string,
		@Query() search?: string,
	): Promise<{ ratings: MyRatingOutput[] } | string> {
		const query_params: MyRatingQueryParams = {
			status,
			city,
			search,
		};
		await getMyRatingsValidations(authorization, unauthorizedCallback);
		return getMyRatingsService(authorization, query_params);
	}
	@Get("{restaurant_name}")
	public async getRatings(
		@Path() restaurant_name: string,
		@Res() unauthorizedCallback: TsoaResponse<403, { reason: string }>,
	): Promise<RatingRecord[] | string> {
		await getRestaurantRatingsValidations(restaurant_name, unauthorizedCallback);
		return getRestaurantRatingsService(restaurant_name);
	}

	@Get("stats/{restaurant_name}")
	public async getRatingStats(
		@Path() restaurant_name: string,
		@Res() unauthorizedCallback: TsoaResponse<403, { reason: string }>,
	): Promise<RatingStatsOutput | string> {
		await getRestaurantRatingStatsValidations(restaurant_name, unauthorizedCallback);
		return getRestaurantRatingStatsService(restaurant_name);
	}

	@Put("{rating_id}")
	public async putRating(
		@Header() authorization: string,
		@Path() rating_id: string,
		@Body() rating_record: RatingRecord,
		@Res() unauthorizedCallback: TsoaResponse<403, { reason: string }>,
	): Promise<RatingsOutput | string> {
		await putRatingValidations(authorization, rating_id, unauthorizedCallback);
		return putRatingService(rating_id, rating_record);
	}
}
