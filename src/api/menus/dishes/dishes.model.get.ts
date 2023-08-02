import { Prisma, Dishes } from "@prisma/client";
import { TsoaResponse } from "tsoa";
import { UserStatus } from "../../../types/messages";
import { client } from "../../../services/prisma";

export const getDishesHandler = async (
	webId: string,
	unauthorizedCallback: TsoaResponse<403, { reason: string }>,
): Promise<string | Dishes[]> => {
	try {
		const dishes = await client.dishes.findMany({ where: { webId: webId } });

		if (dishes.length === 0) {
			return unauthorizedCallback(403, { reason: UserStatus.NOT_FOUND });
		}
		return dishes;
	} catch {
		return unauthorizedCallback(403, { reason: UserStatus.UNAUTHORIZED });
	}
};
