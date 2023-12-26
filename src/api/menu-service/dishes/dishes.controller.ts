import { Dishes, Prisma } from "@prisma/client";
import {
	Header,
	Controller,
	Res,
	Body,
	Put,
	Route,
	Tags,
	Path,
	TsoaResponse,
	Delete,
	Post,
	Get,
} from "tsoa";
import { getDishesHandler } from "./dishes.model.get";
import { postDishesHandler } from "./dishes.model.post";

@Tags("Menu module")
@Route("webs")
export class DishesController extends Controller {
	@Get("/dishes/{restaurant_id}")
	public async getDishes(
		@Path() restaurant_id: string,
		@Res() unauthorizedCallback: TsoaResponse<403, { reason: string }>,
	): Promise<Dishes[] | string> {
		return getDishesHandler(restaurant_id, unauthorizedCallback);
	}

	@Post("/dishes/{restaurant_id}/{category_id}")
	public async postDishes(
		@Header() authorization: string,
		@Path() restaurant_id: string,
		@Path() category_id: string,
		@Body() dish: Prisma.DishesCreateInput,
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
