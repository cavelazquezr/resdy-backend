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
} from "../services/list-services";
import { getMyFavListValidations } from "../validations/list-validations";
import { FavListCreateInput } from "../../types/list";
import { handleRequest } from "../../utils/handleRequest";
import { CatchErrorDetails } from "../../utils/handleCatchError";

@Tags("List Service")
@Route("/lists")
export class ListController extends Controller {
	@Get()
	public async getList(
		@Header() authorization: string,
	): Promise<FavListOutput[] | CatchErrorDetails> {
		return handleRequest<FavListOutput[]>(this, async () => {
			await getMyFavListValidations(authorization);
			return getMyFavListService(authorization);
		});
	}

	@Post()
	public async postList(
		@Header() authorization: string,
		@Body() list_input: FavListCreateInput,
	): Promise<FavListItem | CatchErrorDetails> {
		return handleRequest<FavListItem>(this, async () => {
			return createFavListService(authorization, list_input);
		});
	}

	@Delete("{user_id}")
	public async deleteList(
		@Header() authorization: string,
		@Query() user_id: string,
	): Promise<void | CatchErrorDetails> {
		return handleRequest<void>(this, async () => {
			return deleteFromMyFavListService(user_id, authorization);
		});
	}

	@Put("{user_id}")
	public async putFavList(
		// TODO: Authorization not used?
		@Header() authorization: string,
		@Query() user_id: string,
		@Query() list_id: string,
		@Body() list_name: string,
	): Promise<void | CatchErrorDetails> {
		return handleRequest<void>(this, async () => {
			return updateMyFavListService(user_id, list_id, list_name);
		});
	}

	@Get("{user_id}/{list_id}")
	public async getListItem(
		// TODO: Authorization not used?
		@Header() authorization: string,
		@Path() list_id: string,
	): Promise<FavListOutput[] | CatchErrorDetails> {
		return handleRequest<FavListOutput[]>(this, async () => {
			return getFavListItemService(list_id);
		});
	}

	@Post("{user_id}/{list_id}")
	public async postListItem(
		@Path() user_id: string,
		@Path() list_id: string,
		@Body() restaurant_id: string,
		// TODO: Authorization not used?
		@Header() authorization: string,
	): Promise<void | CatchErrorDetails> {
		return handleRequest<void>(this, async () => {
			// TODO: Validations?
			return addItemToFavListService(user_id, list_id, restaurant_id);
		});
	}

	@Delete("{user_id}/{list_id}")
	public async deleteListItem(
		@Path() user_id: string,
		@Path() list_id: string,
		@Header() authorization: string,
	): Promise<void | CatchErrorDetails> {
		return handleRequest<void>(this, async () => {
			// TODO: Validations?
			return deleteItemFromFavListService(user_id, list_id, authorization);
		});
	}
}
