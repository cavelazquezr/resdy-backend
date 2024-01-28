import { Restaurant } from "@prisma/client";
import { Header, Controller, Res, Get, Post, Body, Query, Route, Tags, Delete, TsoaResponse } from "tsoa";

import { CreateRestaurantInput, GetRestaurantsQueryParams, RestaurantOutput } from "../../types/restaurant";
import { getRestaurantsService } from "../services/restaurant-services";

@Tags("Restaurant service")
@Route("restaurant")
export class RestaurantController extends Controller {
	@Get()
	public async getRestaurant(
		@Query() name?: string,
		@Query() city?: string,
		@Query() restaurant_type?: string,
		@Query() country?: string,
		@Query() sort?: string,
		// @Res() unauthorizedCallback: TsoaResponse<403, { reason: string }>,
	): Promise<RestaurantOutput[] | string> {
		const query_params: GetRestaurantsQueryParams = {
			name,
			city,
			restaurant_type,
			country,
		};
		return getRestaurantsService(query_params);
	}

	// @Post()
	// public async postRestaurant(
	// 	@Header() authorization: string,
	// 	@Body() restaurant: CreateRestaurantInput,
	// 	@Res() unauthorizedCallback: TsoaResponse<403, { reason: string }>,
	// ): Promise<Restaurant | string> {
	// 	return createRestaurantService(authorization, restaurant);
	// }

	// //Endpoint a desarrollar 😁
	// @Delete()
	// public async deleteWeb() {
	// 	return deleteRestaurantService();
	// }
}
