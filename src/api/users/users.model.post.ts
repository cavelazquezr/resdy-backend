import { Prisma, User } from "@prisma/client";
import { client } from "../../services/prisma";
import { CreateUserInput } from "../../types/user";

export const postUserHandler = async (props: CreateUserInput): Promise<User> => {
	const newUser = await client.user.create({ data: props });
	return newUser;
};
