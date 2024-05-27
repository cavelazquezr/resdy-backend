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
import { createRestaurantValidations } from "../validations/restaurant-validations";
import { RestaurantCardOutput } from "../../types/common";
import { MapBoundsRecord } from "../../types/map";
import { ResultsSummary } from "../../types";

@Tags("Restaurant service")
@Route("restaurant")
export class RestaurantController extends Controller {
	@Get()
	public async getRestaurant(
		@Query() name?: string,
		@Query() city?: string,
		@Query() restaurant_type?: string,
		@Query() country?: string,
	): Promise<Array<RestaurantRecord> | string> {
		const query_params: GetRestaurantsQueryParams = {
			name,
			city,
			restaurant_type,
			country,
		};
		return getRestaurantsService(query_params);
	}
	@Get("landing")
	public async getLandingRestaurant(
		@Query() city?: string,
		@Query() country?: string,
	): Promise<LandingRestaurantInfo | string> {
		const query_params: GetRestaurantsQueryParams = {
			city,
			country,
		};
		return getLandingRestaurantsService(query_params);
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
	): Promise<ResultsSummary<RestaurantCardOutput<unknown>> | string> {
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
		return getDiscoveryRestaurants(query_params);
	}

	@Post()
	public async createRestaurant(@Body() restaurant: RestaurantCreateInput): Promise<RestaurantOutput | string> {
		await createRestaurantValidations(restaurant);
		return createRestaurantService(restaurant);
	}
}
