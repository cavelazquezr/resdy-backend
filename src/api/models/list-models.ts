import client from "../../config/client";

const { saveList } = client;

export const getListHandler = async (user_id: string) => {
	const query = await saveList.findMany({
		where: {
			id: user_id,
		},
		select: {
			id: true,
		},
	});
	return query;
};
