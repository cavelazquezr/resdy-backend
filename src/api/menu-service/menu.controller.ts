import { Controller, Res, Route, Tags, Path, TsoaResponse, Get } from "tsoa";
import { MenuOutput } from "../../types/menu";
import { getMenuHandler } from "./menu.model.get";

@Tags("Menu service")
@Route("menu")
export class MenuController extends Controller {
	@Get("{restaurant_id}")
	public async getMenu(
		@Path() restaurant_id: string,
		@Res() unauthorizedCallback: TsoaResponse<403, { reason: string }>,
	): Promise<MenuOutput[] | string> {
		return getMenuHandler(restaurant_id, unauthorizedCallback);
	}
}
