import { Controller, Get, Post, Query, Body, Route, Tags } from "tsoa";

import {
	GetDiscoveryRestaurantsQueryParams,
	GetRestaurantsQueryParams,
	LandingRestaurantInfo,
	RestaurantCreateInput,
	RestaurantOutput,
	RestaurantRecord,
	SortRestaurantBy,
} from "../../types/restaurant";
import {
	createRestaurantService,
	getDiscoveryRestaurants,
	getLandingRestaurantsService,
	getRestaurantsService,
} from "../services/restaurant-services";
import { RestaurantCardOutput } from "../../types/common";
import { ResultsSummary } from "../../types";
import { CatchErrorDetails } from "../../utils/handleCatchError";
import { handleRequest } from "../../utils/handleRequest";
import { createRestaurantValidations } from "../validations/restaurant-validations";

@Tags("Restaurant service")
@Route("restaurant")
export class RestaurantController extends Controller {
	@Get()
	public async getRestaurant(
		@Query() name?: string,
		@Query() city?: string,
		@Query() restaurant_type?: string,
		@Query() country?: string,
	): Promise<Array<RestaurantRecord> | CatchErrorDetails> {
		const query_params: GetRestaurantsQueryParams = {
			name,
			city,
			restaurant_type,
			country,
		};
		return handleRequest<Array<RestaurantRecord>>(this, async () => {
			return getRestaurantsService(query_params);
		});
	}
	@Get("landing")
	public async getLandingRestaurant(
		@Query() city?: string,
		@Query() country?: string,
	): Promise<ResultsSummary<RestaurantCardOutput<unknown>> | CatchErrorDetails> {
		const query_params: GetRestaurantsQueryParams = {
			city,
			country,
		};
		return handleRequest<LandingRestaurantInfo>(this, async () => {
			return getLandingRestaurantsService(query_params);
		});
	}
	@Get("discover")
	public async getDiscoverRestaurant(
		@Query() city?: string,
		@Query() country?: string,
		@Query() swLat?: number,
		@Query() swLng?: number,
		@Query() neLat?: number,
		@Query() neLng?: number,
		@Query() restaurant_type?: string,
		@Query() sortBy?: SortRestaurantBy,
	): Promise<ResultsSummary<RestaurantCardOutput<unknown>> | CatchErrorDetails> {
		const query_params: GetDiscoveryRestaurantsQueryParams = {
			city,
			country,
			swLat,
			swLng,
			neLat,
			neLng,
			restaurant_type,
			sortBy,
		};
		return handleRequest<ResultsSummary<RestaurantCardOutput<unknown>>>(this, async () => {
			return getDiscoveryRestaurants(query_params);
		});
	}
	@Post()
	public async createRestaurant(
		@Body() restaurant: RestaurantCreateInput,
	): Promise<{ token: string } | CatchErrorDetails> {
		return handleRequest<{ token: string }>(this, async () => {
			await createRestaurantValidations(restaurant);
			return createRestaurantService(restaurant);
		});
	}
}
