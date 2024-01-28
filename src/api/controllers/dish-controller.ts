import { Header, Controller, Res, Body, Route, Tags, Path, TsoaResponse, Post, Get } from "tsoa";
import { CreateDishInput, DishesByCategoryOutput, DishOutput } from "../../types/dishes";
import { getDishesService, postDishesService } from "../services/dish-services";
import { getDishesValidations, postDishesValidations } from "../validations/dish-validations";

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
		@Body() dish: CreateDishInput,
		@Res() unauthorizedCallback: TsoaResponse<401, { details: string }>,
		@Res() notFoundCallback: TsoaResponse<404, { details: string }>,
	): Promise<DishOutput | string> {
		await postDishesValidations(authorization, category_id, unauthorizedCallback, notFoundCallback);
		return postDishesService(restaurant_name, category_id, dish);
	}
}
