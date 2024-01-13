import { client } from "../../../services/prisma";
import { TsoaResponse } from "tsoa";
import { CategoryOutput } from "../../../types/categories";
import { UserStatus } from "../../../types/messages";

export const getCategoriesHandler = async (
	restaurant_id: string,
	unauthorizedCallback: TsoaResponse<403, { reason: string }>,
): Promise<CategoryOutput[] | string> => {
	try {
		return client.$transaction(async (tx) => {
			const qCategories = await tx.dishesCategories.findMany({
				where: { restaurant_id: restaurant_id },
			});
			const qDishes = await tx.dishes.findMany({
				where: { restaurant_id: restaurant_id },
			});

			if (qCategories.length > 0 && qDishes.length > 0) {
				const categoriesRecord = qCategories.map((category) => {
					const { id, label } = category;
					return {
						id: id,
						label: label,
						hasRecordUsingCategory: qDishes.some((dish) => {
							return dish.category_id === id;
						}),
					};
				});
				return categoriesRecord;
			}
			return unauthorizedCallback(403, { reason: UserStatus.CATEGORY_DOESNT_EXIST });
		});
	} catch {
		return unauthorizedCallback(403, { reason: UserStatus.UNAUTHORIZED });
	}
};
