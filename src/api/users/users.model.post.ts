import { Prisma, User } from "@prisma/client";
import { client } from "../../services/prisma";

export const postUserHandler = async (props: Prisma.UserCreateInput): Promise<User> => {
	const newUser = await client.user.create({ data: props });
	return newUser;
};
