import { Controller, Res, Route, Tags, Path, TsoaResponse, Get } from "tsoa";
import { MenuRecord } from "../../types/menu";
import { getMenuService } from "../services/menu-services";
import { getMenuValidations } from "../validations/menu-validations";

@Tags("Menu service")
@Route("menu")
export class MenuController extends Controller {
	@Get("{restaurant_name}")
	public async getMenu(
		@Path() restaurant_name: string,
		@Res() notFoundCallback: TsoaResponse<404, { details: string }>,
	): Promise<MenuRecord[] | string> {
		await getMenuValidations(restaurant_name, notFoundCallback);
		return getMenuService(restaurant_name);
	}
}
