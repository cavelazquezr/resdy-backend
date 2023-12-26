import { Dishes, Prisma } from "@prisma/client";
import { TsoaResponse } from "tsoa";
import { isAdminOfCurrentRestaurant, verifyToken } from "../../../services/access";
import { client } from "../../../services/prisma";
import { UserStatus } from "../../../types/messages";

export const postDishesHandler = async (
	authorization: string,
	restaurant_id: string,
	category_id: string,
	dish: Prisma.DishesCreateInput,
	unauthorizedCallback: TsoaResponse<403, { reason: string }>,
): Promise<Dishes | string> => {
	try {
		const isAdmin = isAdminOfCurrentRestaurant(authorization, restaurant_id);

		if (!isAdmin) {
			return unauthorizedCallback(403, { reason: UserStatus.UNAUTHORIZED });
		}

		const createdDish = await client.dishes.create({
			data: {
				...dish,
				restaurant: { connect: { id: restaurant_id } },
				category: { connect: { id: category_id } },
			},
		});

		return createdDish;
	} catch {
		return unauthorizedCallback(403, { reason: UserStatus.UNAUTHORIZED });
	}
};
