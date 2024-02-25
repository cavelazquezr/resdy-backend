import { Header, Controller, Res, Body, Route, Tags, Path, TsoaResponse, Post, Get, Put, Delete, Query } from "tsoa";
import { FavListItem, FavListOutput } from "@rootTypes/fav-list";
import {
	addToMyFavListService,
	deleteFromMyFavListService,
	getMyFavListService,
	updateMyFavListService,
	addItemToFavListService,
	deleteItemFromFavListService,
	getFavListItemService,
} from "../services/fav-list-services";

@Tags("List Service")
@Route("/lists")
export class ListController extends Controller {
	@Get("{user_id}")
	public async getList(
		@Query() user_id: string,
		@Header() authorization: string,
		@Res() unauthorizedCallback: TsoaResponse<403, { reason: string }>,
	): Promise<FavListOutput[] | string> {
		return getMyFavListService(user_id, authorization);
	}

	@Post("{user_id}")
	public async postList(
		@Query() user_id: string,
		@Header() authorization: string,
		@Res() unauthorizedCallback: TsoaResponse<403, { reason: string }>,
	): Promise<FavListItem | string> {
		return addToMyFavListService(user_id, authorization);
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
