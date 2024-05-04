import jwt from "jsonwebtoken";
import { UserCreateInput, UserCredentials, UserOutput, UserRecord, UserUpdateInput } from "../../types/user";
import { createNewUser, getCurrentUserInfo, updateUser } from "../models/auth-models";
import { verifyToken } from "../../utils";
import { getObjectSignedUrl } from "../../config/S3";

export const getCurrentUserService = async (authorization: string): Promise<UserRecord | null> => {
	const current_user = await getCurrentUserInfo(authorization) as UserRecord;
	const key = `users/${current_user.id}/${current_user.id}-avatar`;
	current_user["avatar_url"] = await getObjectSignedUrl(key);
	return current_user;
};

export const authenticateUserService = async (credentials: UserCredentials): Promise<{ token: string }> => {
	const { email } = credentials;
	const token = jwt.sign({ email }, "secretKey", { expiresIn: "1h" });
	return { token: token };
};

export const createUserService = async (user_record: UserCreateInput): Promise<UserOutput> => {
	const new_user = await createNewUser(user_record);
	return new_user;
};

export const updateUserInfo = async (authorization: string, payload: UserUpdateInput): Promise<UserOutput> => {
	const { email } = verifyToken(authorization);
	const updated_user = await updateUser(email, payload);
	return updated_user;
};
