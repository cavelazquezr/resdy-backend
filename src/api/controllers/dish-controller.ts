import { Header, Controller, Body, Route, Tags, Path, Post, Get, Put, Delete } from "tsoa";
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
	public async getDishes(@Path() restaurant_name: string): Promise<DishesByCategoryOutput[]> {
		await getDishesValidations(restaurant_name);
		return getDishesService(restaurant_name);
	}

	@Post("{restaurant_name}/{category_id}")
	public async postDishes(
		@Header() authorization: string,
		@Path() restaurant_name: string,
		@Path() category_id: string,
		@Body() dish_input: DishCreateInput,
	): Promise<DishOutput> {
		await postDishesValidations(authorization, category_id);
		return postDishesService(restaurant_name, category_id, dish_input);
	}

	@Put("{dish_id}")
	public async putDish(
		@Header() authorization: string,
		@Path() dish_id: string,
		@Body() dish_input: DishUpdateInput,
	): Promise<DishOutput> {
		await updateDishValidation(authorization, dish_id, dish_input);
		return updateDishService(dish_id, dish_input);
	}

	@Delete()
	public async deleteDish(@Header() authorization: string, @Body() body_params: { dish_ids: string[] }): Promise<void> {
		const { dish_ids } = body_params;
		await deleteDishValidation(authorization, dish_ids);
		return deleteDishesService(dish_ids);
	}
}
