import { Dishes, Prisma } from "@prisma/client";
import { TsoaResponse } from "tsoa";
import { verifyToken } from "../../../services/access";
import { client } from "../../../services/prisma";
import { UserStatus } from "../../../types/messages";

export const postDishesHandler = async (
	authorization: string,
	webId: string,
	dish: Prisma.DishesCreateWithoutWebInput,
	unauthorizedCallback: TsoaResponse<403, { reason: string }>,
): Promise<Dishes | string> => {
	try {
		const { email } = verifyToken(authorization);
		const admin = await client.user.findUnique({ where: { email: email } });
		const currentWeb = await client.web.findUnique({ where: { id: webId } });

		if (admin?.id !== currentWeb?.adminId) {
			return unauthorizedCallback(403, { reason: UserStatus.UNAUTHORIZED });
		}

		console.log({ ...dish, webId: currentWeb?.id });

		const createdDish = await client.dishes.create({
			data: { ...dish, web: { connect: { id: currentWeb?.id } } },
		});

		console.log(createdDish);

		return createdDish;
	} catch {
		return unauthorizedCallback(403, { reason: UserStatus.UNAUTHORIZED });
	}
};
