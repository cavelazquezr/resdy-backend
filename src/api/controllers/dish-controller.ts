import { Header, Controller, Body, Route, Tags, Path, Post, Get, Put, Delete } from "tsoa";
import { DishCreateInput, DishesByCategoryOutput, DishOutput, DishUpdateInput } from "../../types/dishes";
import {
	deleteDishesService,
	getDishesService,
	getMyDishesService,
	postDishesService,
	updateDishService,
} from "../services/dish-services";
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
	@Get("admin/myDishes")
	public async getMyDishes(@Header() authorization: string): Promise<Array<DishOutput>> {
		return getMyDishesService(authorization);
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

	@Delete("{dish_id}")
	public async deleteDish(@Header() authorization: string, @Path() dish_id: string): Promise<void> {
		await deleteDishValidation(authorization, dish_id);
		return deleteDishesService(dish_id);
	}
}
