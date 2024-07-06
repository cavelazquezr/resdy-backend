import { Controller, Route, Tags, Header, Path, Body, Get, Put, Post, Delete } from "tsoa";
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
	public async getRestautantCategories(@Path() restaurant_name: string): Promise<WithIsUsed<CategoryProps>[]> {
		await getRestautantCategoriesValidations(restaurant_name);
		return getRestautantCategoriesService(restaurant_name);
	}

	@Post("{restaurant_name}")
	public async postCategory(
		@Header() authorization: string,
		@Path() restaurant_name: string,
		@Body() category_input: CategoryCreateInput,
	): Promise<CategoryOutput> {
		await createCategoryValidations(authorization, restaurant_name);
		return createCategoryService(restaurant_name, category_input);
	}

	@Put("{category_id}")
	public async putCategory(
		@Header() authorization: string,
		@Path() category_id: string,
		@Body() category_input: CategoryUpdateInput,
	): Promise<CategoryOutput> {
		await updateCategoryValidation(authorization, category_id, category_input);
		return updateCategoryService(category_id, category_input);
	}

	@Delete()
	public async deleteCategory(
		@Header() authorization: string,
		@Body() body_params: { category_ids: string[] },
	): Promise<void> {
		const { category_ids } = body_params;
		await deleteCategoriesValidation(authorization, category_ids);
		return deleteCategoriesService(category_ids);
	}
}
