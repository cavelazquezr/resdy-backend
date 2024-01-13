import { Dishes, Prisma } from "@prisma/client";
import {
	Header,
	Controller,
	Res,
	Body,
	Route,
	Tags,
	Path,
	TsoaResponse,
	Post,
	Get,
} from "tsoa";
import { getDishesHandler } from "./dishes.model.get";
import { postDishesHandler } from "./dishes.model.post";
import { CreateDishInput, DishOutput } from "../../../types/menu";

@Tags("Menu service")
@Route("menu")
export class DishesController extends Controller {
	@Get("/dishes/{restaurant_id}")
	public async getDishes(
		@Path() restaurant_id: string,
		@Res() unauthorizedCallback: TsoaResponse<403, { reason: string }>,
	): Promise<DishOutput[] | string> {
		return getDishesHandler(restaurant_id, unauthorizedCallback);
	}

	@Post("/dishes/{restaurant_id}/{category_id}")
	public async postDishes(
		@Header() authorization: string,
		@Path() restaurant_id: string,
		@Path() category_id: string,
		@Body() dish: CreateDishInput,
		@Res() unauthorizedCallback: TsoaResponse<403, { reason: string }>,
	): Promise<string | Dishes> {
		return postDishesHandler(
			authorization,
			restaurant_id,
			category_id,
			dish,
			unauthorizedCallback,
		);
	}
}
