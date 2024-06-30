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
import { handleRequest } from "../../utils/handleRequest";
import { CatchErrorDetails } from "../../utils/handleCatchError";

@Tags("Category service")
@Route("category")
export class CategoriesController extends Controller {
	@Get("/{restaurant_name}")
	public async getRestautantCategories(
		@Path() restaurant_name: string,
	): Promise<WithIsUsed<CategoryProps>[] | CatchErrorDetails> {
		return handleRequest<WithIsUsed<CategoryProps>[]>(this, async () => {
			await getRestautantCategoriesValidations(restaurant_name);
			return getRestautantCategoriesService(restaurant_name);
		});
	}

	@Post("{restaurant_name}")
	public async postCategory(
		@Header() authorization: string,
		@Path() restaurant_name: string,
		@Body() category_input: CategoryCreateInput,
	): Promise<CategoryOutput | CatchErrorDetails> {
		return handleRequest<CategoryOutput>(this, async () => {
			await createCategoryValidations(authorization, restaurant_name);
			return createCategoryService(restaurant_name, category_input);
		});
	}

	@Put("{category_id}")
	public async putCategory(
		@Header() authorization: string,
		@Path() category_id: string,
		@Body() category_input: CategoryUpdateInput,
	): Promise<CategoryOutput | CatchErrorDetails> {
		return handleRequest<CategoryOutput>(this, async () => {
			await updateCategoryValidation(authorization, category_id, category_input);
			return updateCategoryService(category_id, category_input);
		});
	}

	@Delete()
	public async deleteCategory(
		@Header() authorization: string,
		@Body() body_params: { category_ids: string[] },
	): Promise<void | CatchErrorDetails> {
		const { category_ids } = body_params;
		return handleRequest<void>(this, async () => {
			await deleteCategoriesValidation(authorization, category_ids);
			return deleteCategoriesService(category_ids);
		});
	}
}
