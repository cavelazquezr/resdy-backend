import { FavListCreateInput } from "../../types/list";
import { verifyToken } from "../../utils";
import { getCurrentUserInfo } from "../models/auth-models";

import {
	CreateFavList,
	DeleteFavList,
	UpdateFavList,
	getMyFavList,
	getFavListItem,
	addItemToFavList,
	deleteItemFromFavList,
} from "../models/list-models";
import { FavListOutput, FavListItem } from "@rootTypes/fav-list";

export const getMyFavListService = async (authorization: string): Promise<FavListOutput[]> => {
	const current_user = await getCurrentUserInfo(authorization);
	if (current_user) {
		const { id: user_id } = current_user;
		const FavList: FavListOutput[] = await getMyFavList(user_id);
		return FavList;
	}
	return [];
};

export const createFavListService = async (
	authorization: string,
	list_input: FavListCreateInput,
): Promise<FavListItem> => {
	const { email: user_email } = verifyToken(authorization);
	const addItem: FavListItem = await CreateFavList(user_email, list_input);
	return addItem;
};

export const deleteFromMyFavListService = async (authorization: string, list_id: string): Promise<void> => {
	const { email: user_email } = verifyToken(authorization);
	const deleteItem: void = await DeleteFavList(list_id, user_email);
	return deleteItem;
};

export const updateMyFavListService = async (
	authorization: string,
	list_id: string,
	list_name: string,
): Promise<void> => {
	const { email: user_email } = verifyToken(authorization);
	const updateItem: void = await UpdateFavList(user_email, list_id, list_name);
	return updateItem;
};

export const getFavListItemService = async (list_id: string): Promise<FavListItem[]> => {
	const FavList: FavListOutput[] = await getFavListItem(list_id);
	return FavList;
};

export const deleteItemFromFavListService = async (
	authorization: string,
	list_id: string,
	item_id: string,
): Promise<void> => {
	const deleteItem: void = await deleteItemFromFavList(list_id, item_id);
	return deleteItem;
};

export const addItemToFavListService = async (
	authorization: string,
	list_id: string,
	restaurant_id: string,
): Promise<void> => {
	const addItem: void = await addItemToFavList(list_id, restaurant_id);
	return addItem;
};
