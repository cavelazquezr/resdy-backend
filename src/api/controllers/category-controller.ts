import { Controller, Res, Route, Tags, Header, Path, Body, TsoaResponse, Get, Put } from "tsoa";
import { CategoryOutput, CategoryProps, CategoryUpdateInput } from "../../types/categories";
import { WithIsUsed } from "../../types";
import { getRestautantCategoriesService, updateCategoryService } from "../services/category-services";
import { getRestautantCategoriesValidations, updateCategoryValidation } from "../validations/category-validations";

@Tags("Category service")
@Route("category")
export class CategoriesController extends Controller {
	@Get("/{restaurant_name}")
	public async getRestautantCategories(
		@Path() restaurant_name: string,
		@Res() notFoundCallback: TsoaResponse<404, { details: string }>,
	): Promise<WithIsUsed<CategoryProps>[] | string> {
		await getRestautantCategoriesValidations(restaurant_name, notFoundCallback);
		return getRestautantCategoriesService(restaurant_name);
	}

	@Put("{category_id}")
	public async putCategory(
		@Header() authorization: string,
		@Path() category_id: string,
		@Body() category_input: CategoryUpdateInput,
		@Res() unauthorizedCallback: TsoaResponse<401, { details: string }>,
		@Res() notFoundCallback: TsoaResponse<404, { details: string }>,
		@Res() unprocessableCallback: TsoaResponse<422, { details: string }>,
	): Promise<CategoryOutput | string> {
		await updateCategoryValidation(
			authorization,
			category_id,
			category_input,
			unauthorizedCallback,
			notFoundCallback,
			unprocessableCallback,
		);
		return updateCategoryService(category_id, category_input);
	}

	// //Endpoint a desarrollar
	// @Delete("/categories/{webId}")
	// public async deleteWeb() {
	// 	return deleteCategoryHandler();
	// }
}
