import { Controller, Route, Tags, Header, Path, Body, Get, Put, Post, Delete } from "tsoa";
import { CategoryOutput, CategoryProps, CategoryUpdateInput, CategoryCreateInput } from "../../types/categories";
import { WithIsUsed } from "../../types";
import {
	createCategoryService,
	deleteCategoriesService,
	getMyRestaurantCategoriesService,
	getRestaurantCategoriesService,
	updateCategoryService,
	updateCategoryOrderService,
} from "../services/category-services";
import {
	createCategoryValidations,
	deleteCategoriesValidation,
	getRestaurantCategoriesValidations,
	reorderCategoriesValidation,
	updateCategoryValidation,
} from "../validations/category-validations";

@Tags("Category service")
@Route("category")
export class CategoriesController extends Controller {
	@Get("/{restaurant_name}")
	public async getRestaurantCategories(@Path() restaurant_name: string): Promise<WithIsUsed<CategoryProps>[]> {
		await getRestaurantCategoriesValidations(restaurant_name);
		return getRestaurantCategoriesService(restaurant_name);
	}
	@Get("/admin/myCategories")
	public async getMyRestaurantCategories(@Header() authorization: string): Promise<WithIsUsed<CategoryProps>[]> {
		return getMyRestaurantCategoriesService(authorization);
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

	@Put("/reorder")
	public async reorderCategories(
		@Header() authorization: string,
		@Body() categories: { id: string; order: number }[],
	): Promise<void> {
		await reorderCategoriesValidation(authorization, categories);
		return updateCategoryOrderService(categories);
	}

	@Delete("{category_id}")
	public async deleteCategory(@Header() authorization: string, @Path() category_id: string): Promise<void> {
		await deleteCategoriesValidation(authorization, category_id);
		return deleteCategoriesService(category_id);
	}
}
