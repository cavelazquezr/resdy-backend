import { Header, Controller, Res, Body, Route, Tags, Path, TsoaResponse, Post, Get, Put, Delete } from "tsoa";
import { DishCreateInput, DishesByCategoryOutput, DishOutput, DishUpdateInput } from "../../types/dishes";
import { deleteDishesService, getDishesService, postDishesService, updateDishService } from "../services/dish-services";
import {
	deleteDishValidation,
	getDishesValidations,
	postDishesValidations,
	updateDishValidation,
} from "../validations/dish-validations";

@Tags("Dishes service")
@Route("dishes")
export class DishesController extends Controller {
	@Get("{restaurant_name}")
	public async getDishes(
		@Path() restaurant_name: string,
		@Res() notFoundCallback: TsoaResponse<404, { details: string }>,
	): Promise<DishesByCategoryOutput[] | string> {
		await getDishesValidations(restaurant_name, notFoundCallback);
		return getDishesService(restaurant_name);
	}

	@Post("{restaurant_name}/{category_id}")
	public async postDishes(
		@Header() authorization: string,
		@Path() restaurant_name: string,
		@Path() category_id: string,
		@Body() dish_input: DishCreateInput,
		@Res() unauthorizedCallback: TsoaResponse<401, { details: string }>,
		@Res() notFoundCallback: TsoaResponse<404, { details: string }>,
	): Promise<DishOutput | string> {
		await postDishesValidations(authorization, category_id, unauthorizedCallback, notFoundCallback);
		return postDishesService(restaurant_name, category_id, dish_input);
	}

	@Put("{dish_id}")
	public async putDish(
		@Header() authorization: string,
		@Path() dish_id: string,
		@Body() dish_input: DishUpdateInput,
		@Res() unauthorizedCallback: TsoaResponse<401, { details: string }>,
		@Res() notFoundCallback: TsoaResponse<404, { details: string }>,
		@Res() unprocessableCallback: TsoaResponse<422, { details: string }>,
	): Promise<DishOutput | string> {
		await updateDishValidation(
			authorization,
			dish_id,
			dish_input,
			unauthorizedCallback,
			notFoundCallback,
			unprocessableCallback,
		);
		return updateDishService(dish_id, dish_input);
	}

	@Delete()
	public async deleteDish(
		@Header() authorization: string,
		@Body() body_params: { dish_ids: string[] },
		@Res() unauthorizedCallback: TsoaResponse<401, { details: string }>,
		@Res() notFoundCallback: TsoaResponse<404, { details: string }>,
	): Promise<void | string> {
		const { dish_ids } = body_params;
		await deleteDishValidation(authorization, dish_ids, unauthorizedCallback, notFoundCallback);
		return deleteDishesService(dish_ids);
	}
}
