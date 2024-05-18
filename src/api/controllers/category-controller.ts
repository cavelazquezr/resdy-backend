import { Controller, Res, Route, Tags, Header, Path, Body, TsoaResponse, Get, Put, Post, Delete } from "tsoa";
import { CategoryOutput, CategoryProps, CategoryUpdateInput, CategoryCreateInput } from "../../types/categories";
import { WithIsUsed } from "../../types";
import {
	createCategoryService,
	deleteCategoriesService,
	getRestautantCategoriesService,
	updateCategoryService,
} from "../services/category-services";
import {
	createCategoryValidations,
	deleteCategoriesValidation,
	getRestautantCategoriesValidations,
	updateCategoryValidation,
} from "../validations/category-validations";

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

	@Post("{restaurant_name}")
	public async postCategory(
		@Header() authorization: string,
		@Path() restaurant_name: string,
		@Body() category_input: CategoryCreateInput,
		@Res() unauthorizedCallback: TsoaResponse<401, { details: string }>,
		@Res() notFoundCallback: TsoaResponse<404, { details: string }>,
	): Promise<CategoryOutput | string> {
		await createCategoryValidations(authorization, restaurant_name, unauthorizedCallback, notFoundCallback);
		return createCategoryService(restaurant_name, category_input);
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

	@Delete()
	public async deleteCategory(
		@Header() authorization: string,
		@Body() body_params: { category_ids: string[] },
		@Res() unauthorizedCallback: TsoaResponse<401, { details: string }>,
		@Res() notFoundCallback: TsoaResponse<404, { details: string }>,
		@Res() unprocessableCallback: TsoaResponse<422, { details: string }>,
	): Promise<void | string> {
		const { category_ids } = body_params;
		await deleteCategoriesValidation(
			authorization,
			category_ids,
			unauthorizedCallback,
			notFoundCallback,
			unprocessableCallback,
		);
		return deleteCategoriesService(category_ids);
	}
}
