import { Dishes, DishesCategories, Prisma } from "@prisma/client";
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
	@Get("/dishes/{webId}")
	public async getDishes(
		@Path() webId: string,
		@Res() unauthorizedCallback: TsoaResponse<403, { reason: string }>,
	): Promise<Dishes[] | string> {
		return getDishesHandler(webId, unauthorizedCallback);
	}

	@Post("/dishes/{webId}")
	public async postDishes(
		@Header() authorization: string,
		@Path() webId: string,
		@Body() dish: Prisma.DishesCreateWithoutWebInput,
		@Res() unauthorizedCallback: TsoaResponse<403, { reason: string }>,
	): Promise<string | Dishes> {
		return postDishesHandler(authorization, webId, dish, unauthorizedCallback);
	}
}
