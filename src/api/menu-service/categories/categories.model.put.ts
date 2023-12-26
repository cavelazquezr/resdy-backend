import { DishesCategories, Prisma } from "@prisma/client";
import { client } from "../../../services/prisma";
import { TsoaResponse } from "tsoa";
import { isAdminOfCurrentRestaurant } from "../../../services/access";
import { UserStatus } from "../../../types/messages";

export const putCategoryHandler = async (
	authorization: string,
	category_id: string,
	category: Prisma.DishesCategoriesUpdateWithoutRestaurantInput,
	unauthorizedCallback: TsoaResponse<403, { reason: string }>,
): Promise<DishesCategories | string> => {
	try {
		return client.$transaction(async (tx) => {
			const qCurrentCategory = await tx.dishesCategories.findFirst({
				where: {
					id: {
						equals: category_id,
					},
				},
			});
			if (qCurrentCategory) {
				const { restaurant_id } = qCurrentCategory;
				const isAdmin = await isAdminOfCurrentRestaurant(authorization, restaurant_id);
				if (!isAdmin) {
					return unauthorizedCallback(403, { reason: UserStatus.UNAUTHORIZED });
				}
				const updatedCategory = await client.dishesCategories.update({
					where: {
						id: restaurant_id,
					},
					data: {
						...category,
					},
				});

				return updatedCategory;
			}
			return unauthorizedCallback(403, { reason: UserStatus.CATEGORY_DOESNT_EXIST });
		});
	} catch {
		return unauthorizedCallback(403, { reason: UserStatus.UNAUTHORIZED });
	}
};
