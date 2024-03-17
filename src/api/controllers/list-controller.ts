import { Header, Controller, Res, Body, Route, Tags, Path, TsoaResponse, Post, Get, Put, Delete, Query } from "tsoa";
import { FavListItem, FavListOutput } from "@rootTypes/fav-list";
import {
	deleteFromMyFavListService,
	getMyFavListService,
	updateMyFavListService,
	addItemToFavListService,
	deleteItemFromFavListService,
	getFavListItemService,
	createFavListService,
} from "../services/fav-list-services";
import { getMyFavListValidations } from "../validations/fav-list-validations";
import { FavListCreateInput } from "../../types/list";

@Tags("List Service")
@Route("/lists")
export class ListController extends Controller {
	@Get()
	public async getList(
		@Header() authorization: string,
		@Res() unauthorizedCallback: TsoaResponse<401, { reason: string }>,
	): Promise<FavListOutput[] | string> {
		await getMyFavListValidations(authorization, unauthorizedCallback);
		return getMyFavListService(authorization);
	}

	@Post()
	public async postList(
		@Header() authorization: string,
		@Query() list_input: FavListCreateInput,
		@Res() unauthorizedCallback: TsoaResponse<403, { reason: string }>,
	): Promise<FavListItem | string> {
		return createFavListService(authorization, list_input);
	}

	@Delete("{user_id}")
	public async deleteList(
		@Query() user_id: string,
		@Header() authorization: string,
		@Res() unauthorizedCallback: TsoaResponse<403, { reason: string }>,
	): Promise<string | void> {
		return deleteFromMyFavListService(user_id, authorization);
	}

	@Put("{user_id}")
	public async putFavList(
		@Query() user_id: string,
		@Query() list_id: string,
		@Body() list_name: string,
		@Header() authorization: string,
		@Res() unauthorizedCallback: TsoaResponse<403, { reason: string }>,
	): Promise<string | void> {
		return updateMyFavListService(user_id, list_id, list_name);
	}

	@Get("{user_id}/{list_id}")
	public async getListItem(
		@Path() list_id: string,
		@Header() authorization: string,
		@Res() unauthorizedCallback: TsoaResponse<403, { reason: string }>,
	): Promise<FavListOutput[] | string> {
		return getFavListItemService(list_id);
	}

	@Post("{user_id}/{list_id}")
	public async postListItem(
		@Path() user_id: string,
		@Path() list_id: string,
		@Body() restaurant_id: string,
		@Header() authorization: string,
		@Res() unauthorizedCallback: TsoaResponse<403, { reason: string }>,
	): Promise<string | void> {
		return addItemToFavListService(user_id, list_id, restaurant_id);
	}

	@Delete("{user_id}/{list_id}")
	public async deleteListItem(
		@Path() user_id: string,
		@Path() list_id: string,
		@Header() authorization: string,
		@Res() unauthorizedCallback: TsoaResponse<403, { reason: string }>,
	): Promise<void | string> {
		return deleteItemFromFavListService(user_id, list_id, authorization);
	}
}
