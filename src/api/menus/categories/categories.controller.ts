import { DishesCategories } from "@prisma/client";
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
import { CategoryCollection } from "../../../types/categories";
import { getCategoriesHandler } from "./categories.model.get";
import { deleteCategoryHandler } from "./categories.model.delete";

@Tags("Menu module")
@Route("webs")
export class CategoriesController extends Controller {
	@Get("/categories/{webId}")
	public async getCategories(
		@Path() webId: string,
		@Res() unauthorizedCallback: TsoaResponse<403, { reason: string }>,
	): Promise<CategoryCollection[] | string> {
		return getCategoriesHandler(webId, unauthorizedCallback);
	}

	@Put("/categories/{webId}")
	public async putCategory(
		@Header() authorization: string,
		@Path() webId: string,
		@Body() category: CategoryCollection,
		@Res() unauthorizedCallback: TsoaResponse<403, { reason: string }>,
	): Promise<DishesCategories | string> {
		return putCategoryHandler(authorization, webId, category, unauthorizedCallback);
	}

	//Endpoint a desarrollar
	@Delete("/categories/{webId}")
	public async deleteWeb() {
		return deleteCategoryHandler();
	}
}
