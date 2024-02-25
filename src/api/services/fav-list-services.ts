import { verifyToken } from "../../utils";

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

export const getMyFavListService = async (user_id: string, authorization: string): Promise<FavListOutput[]> => {
	const FavList = await getMyFavList(user_id, authorization);
	return FavList;
};

export const addToMyFavListService = async (authorization: string, restaurant_id: string): Promise<FavListItem> => {
	const { email: user_email } = verifyToken(authorization);
	const addItem: FavListItem = await CreateFavList(user_email, restaurant_id);
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
