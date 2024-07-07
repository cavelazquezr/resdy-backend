import { Controller, Get, Post, Header, Query, Body, Route, Tags, Put, Path } from "tsoa";

import {
	GetDiscoveryRestaurantsQueryParams,
	GetRestaurantsQueryParams,
	LandingRestaurantInfo,
	RestaurantCreateInput,
	RestaurantOutput,
	RestaurantRecord,
	SortRestaurantBy,
	UpdateRestaurantInput,
} from "../../types/restaurant";
import {
	createRestaurantService,
	getDiscoveryRestaurants,
	getLandingRestaurantsService,
	getMyRestaurantService,
	getRestaurantsService,
	updateRestaurantService,
} from "../services/restaurant-services";
import { RestaurantCardOutput } from "../../types/common";
import { ResultsSummary } from "../../types";
import { createRestaurantValidations, updateRestaurantValidations } from "../validations/restaurant-validations";

@Tags("Restaurant service")
@Route("restaurant")
export class RestaurantController extends Controller {
	@Get()
	public async getRestaurant(
		@Query() name?: string,
		@Query() city?: string,
		@Query() restaurant_type?: string,
		@Query() country?: string,
	): Promise<Array<RestaurantRecord>> {
		const query_params: GetRestaurantsQueryParams = {
			name,
			city,
			restaurant_type,
			country,
		};
		return getRestaurantsService(query_params);
	}
	@Put("{restaurant_id}")
	public async updateRestaurant(
		@Header() authorization: string,
		@Path() restaurant_id: string,
		@Body() restaurant_input: Partial<UpdateRestaurantInput>,
	): Promise<RestaurantOutput> {
		await updateRestaurantValidations(authorization, restaurant_id);
		return updateRestaurantService(restaurant_id, restaurant_input);
	}
	@Get("myRestaurant")
	public async getMyRestaurant(@Header() authorization: string): Promise<RestaurantRecord> {
		return getMyRestaurantService(authorization);
	}
	@Get("landing")
	public async getLandingRestaurant(@Query() city?: string, @Query() country?: string): Promise<LandingRestaurantInfo> {
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
	): Promise<ResultsSummary<RestaurantCardOutput<unknown>>> {
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
	public async createRestaurant(@Body() restaurant: RestaurantCreateInput): Promise<{ token: string }> {
		await createRestaurantValidations(restaurant);
		return createRestaurantService(restaurant);
	}
}
