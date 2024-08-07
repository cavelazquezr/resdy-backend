import { Controller, Route, Tags, Path, Get } from "tsoa";
import { MenuRecord } from "../../types/menu";
import { getMenuService } from "../services/menu-services";
import { getMenuValidations } from "../validations/menu-validations";

@Tags("Menu service")
@Route("menu")
export class MenuController extends Controller {
	@Get("{restaurant_name}")
	public async getMenu(@Path() restaurant_name: string): Promise<MenuRecord[]> {
		await getMenuValidations(restaurant_name);
		return getMenuService(restaurant_name);
	}
}
