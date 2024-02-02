import { verifyToken } from "../../utils";
import { CreateUserInput } from "../../types/user";
import client from "../../config/client";

const { user } = client;

export const getCurrentUserInfo = async (authorization: string) => {
	const { email } = verifyToken(authorization);
	const query = await user.findUnique({
		where: { email: email as string },
		select: {
			id: true,
			email: true,
			firstname: true,
			lastname: true,
			avatar_url: true,
			created_at: true,
			is_active: true,
			is_owner: true,
		},
	});
	return query;
};

export const getUserByEmail = async (email: string) => {
	const query = await user.findUnique({
		where: { email: email },
	});
	return query;
};

export const createNewUser = async (user_record: CreateUserInput) => {
	const query = await user.create({ data: user_record });
	return query;
};
