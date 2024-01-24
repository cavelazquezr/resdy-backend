import { Restaurant } from "@prisma/client";
import { Header, Controller, Res, Get, Post, Body, Query, Route, Tags, Delete, TsoaResponse } from "tsoa";
import { getRestaurantHandler } from "./webs.model.get";
import { postRestaurantHandler } from "./webs.model.post";
import { deleteRestaurantHandler } from "./webs.model.delete";
import { CreateRestaurantInput, RestaurantOutput } from "../../types/restaurant";

@Tags("Restaurant service")
@Route("restaurant")
export class RestaurantController extends Controller {
	@Get()
	public async getRestaurant(
		@Res() unauthorizedCallback: TsoaResponse<403, { reason: string }>,
		@Query() name?: string,
		@Query() city?: string,
		@Query() restaurant_type?: string,
		@Query() country?: string,
	): Promise<RestaurantOutput[] | string> {
		return getRestaurantHandler(unauthorizedCallback, name, city, restaurant_type, country);
	}

	@Post()
	public async postRestaurant(
		@Header() authorization: string,
		@Body() restaurant: CreateRestaurantInput,
		@Res() unauthorizedCallback: TsoaResponse<403, { reason: string }>,
	): Promise<Restaurant | string> {
		return postRestaurantHandler(authorization, restaurant, unauthorizedCallback);
	}

	//Endpoint a desarrollar 😁
	@Delete()
	public async deleteWeb() {
		return deleteRestaurantHandler();
	}
}
