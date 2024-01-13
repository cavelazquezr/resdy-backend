import { DishesCategories, Prisma } from "@prisma/client";
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
	Get,
} from "tsoa";
import { putCategoryHandler } from "./categories.model.put";
import { CategoryOutput } from "../../../types/categories";
import { getCategoriesHandler } from "./categories.model.get";
import { deleteCategoryHandler } from "./categories.model.delete";
import { UpdateCategoryInput } from "../../../types/menu";

@Tags("Menu service")
@Route("menu")
export class CategoriesController extends Controller {
	@Get("/category/{restaurant_id}")
	public async getCategories(
		@Path() restaurant_id: string,
		@Res() unauthorizedCallback: TsoaResponse<403, { reason: string }>,
	): Promise<CategoryOutput[] | string> {
		return getCategoriesHandler(restaurant_id, unauthorizedCallback);
	}

	@Put("/category/{category_id}")
	public async putCategory(
		@Header() authorization: string,
		@Path() category_id: string,
		@Body() category: UpdateCategoryInput,
		@Res() unauthorizedCallback: TsoaResponse<403, { reason: string }>,
	): Promise<DishesCategories | string> {
		return putCategoryHandler(authorization, category_id, category, unauthorizedCallback);
	}

	//Endpoint a desarrollar
	@Delete("/categories/{webId}")
	public async deleteWeb() {
		return deleteCategoryHandler();
	}
}
