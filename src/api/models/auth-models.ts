import { verifyToken } from "../../utils";
import { UserCreateInput, UserUpdateInput } from "../../types/user";
import client from "../../config/client";

const { user } = client;

export const getCurrentUserInfo = async (authorization: string) => {
	const { email } = verifyToken(authorization);
	const query = await user.findUnique({
		where: { email: email },
		select: {
			id: true,
			email: true,
			firstname: true,
			lastname: true,
			phone: true,
			created_at: true,
			is_active: true,
			is_owner: true,
			avatar_path: true,
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

export const createNewUser = async (user_record: UserCreateInput) => {
	const query = await user.create({ data: user_record });
	return query;
};
export const updateUser = async (user_email: string, payload: UserUpdateInput) => {
	const updateData: Partial<UserUpdateInput> = { ...payload };
	if (updateData.old_password) {
		const { old_password, ...cleanedInput } = updateData;
		const cleanData = cleanedInput;
		const query = await user.update({
			where: {
				email: user_email,
			},
			data: cleanData,
		});
		return query;
	}

	const query = await user.update({
		where: {
			email: user_email,
		},
		data: updateData,
	});

	return query;
};
