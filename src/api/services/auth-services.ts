import jwt from "jsonwebtoken";
import { CreateUserInput, UserCredentials, UserOutput } from "../../types/user";
import { createNewUser, getCurrentUserInfo } from "../models/auth-models";

export const getCurrentUserService = async (authorization: string): Promise<UserOutput | null> => {
	const current_user = await getCurrentUserInfo(authorization);
	return current_user;
};

export const authenticateUserService = async (credentials: UserCredentials): Promise<{ token: string }> => {
	const { email } = credentials;
	const token = jwt.sign({ email }, "secretKey", { expiresIn: "1h" });
	return { token: token };
};

export const createUserService = async (user_record: CreateUserInput): Promise<UserOutput> => {
	const new_user = await createNewUser(user_record);
	return new_user;
};
