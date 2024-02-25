import client from "../../config/client";

const { saveList, saveListItem } = client;

export const getMyFavList = async (user_id: string, authorization: string) => {
	const query = await saveList.findMany({
		where: {
			user_id: user_id,
		},

		select: {
			id: true,
			name: true,
			_count: true,
			SaveListItem: true,
		},
	});
	return query;
};

export const CreateFavList = async (list_name: string, user_id: string) => {
	const query = await saveList.create({
		data: {
			name: list_name,
			user_id: user_id,
		},
	});
	return query;
};

export const DeleteFavList = async (list_id: string, user_id: string) => {
	await saveList.deleteMany({
		where: {
			user_id: user_id,
			id: list_id,
		},
	});
};

export const UpdateFavList = async (list_id: string, list_name: string, user_id: string) => {
	await saveList.updateMany({
		where: {
			user_id: user_id,
			id: list_id,
		},
		data: {
			name: list_name,
		},
	});
};

export const getFavListItem = async (list_id: string) => {
	const query = await saveListItem.findMany({
		where: {
			id: list_id,
		},
		include: {
			restaurant: true,
		},
	});

	return query;
};

export const deleteItemFromFavList = async (list_id: string, item_id: string) => {
	await saveListItem.delete({
		where: {
			list_id: list_id,
			id: item_id,
		},
	});
};

export const addItemToFavList = async (list_id: string, restaurant_id: string) => {
	await saveListItem.create({
		data: {
			list_id: list_id,
			restaurant_id: restaurant_id,
		},
	});
};
