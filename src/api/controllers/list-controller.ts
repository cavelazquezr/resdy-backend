import { Header, Controller, Res, Body, Route, Tags, Path, TsoaResponse, Post, Get, Put, Delete } from "tsoa";
import { ListFav } from "@rootTypes/fav-list";
import { getListHandler } from "../models/list-models";

@Tags("List Service")
@Route("list")
export class ListController extends Controller {
	@Get("/{user_id}")
	public async getList(
		@Path() user_id: string,
		@Res() unauthorizedCallback: TsoaResponse<403, { reason: string }>,
	): Promise<ListFav[] | string> {
		return getListHandler(user_id);
	}
}
