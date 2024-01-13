import { Prisma, User } from "@prisma/client";
import { client } from "../../services/prisma";
import { UserStatus } from "../../types/messages";
import { TsoaResponse } from "tsoa";
import { verifyToken } from "../../services/access";

export const deleteRestaurantHandler = async () => {
	console.log("Desarrollar metodo 😁");
	return "Desarrollar metodo 😁";
};
