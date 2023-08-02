import { Prisma } from "@prisma/client";

export const users: Prisma.UserCreateInput[] = [
	{
		email: "admin@resdy.net",
		firstname: "admin",
		lastname: "admin",
		password: "resdy",
	},
	{
		email: "95.carlos.velazquez@gmail.com",
		firstname: "Carlos",
		lastname: "Velazquez",
		password: "123456",
	},
];
