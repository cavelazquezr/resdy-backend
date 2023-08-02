import { Prisma, User } from "@prisma/client";
import { TsoaResponse } from "tsoa";
import { client } from "../../services/prisma";
import { UserStatus } from "../../types/messages";
import { verifyToken } from "../../services/access";

export const putWebHandler = async () => {
	console.log("Desarrollar metodo 😁");
	return "Desarrollar metodo 😁";
};
