import { Controller, Get, Query, Route, Tags } from "tsoa";

import { GetRestaurantsQueryParams, LandingRestaurantInfo, RestaurantRecord } from "../../types/restaurant";
import { getLandingRestaurantsService, getRestaurantsService } from "../services/restaurant-services";

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
}
