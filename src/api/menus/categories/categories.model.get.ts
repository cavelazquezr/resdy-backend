import { client } from "../../../services/prisma";
import { TsoaResponse } from "tsoa";
import { CategoryCollection, allowedCategoriesRecord } from "../../../types/categories";
import { UserStatus } from "../../../types/messages";

export const getCategoriesHandler = async (
	webId: string,
	unauthorizedCallback: TsoaResponse<403, { reason: string }>,
): Promise<CategoryCollection[] | string> => {
	try {
		const categoriesRegistered = await client.dishesCategories.findUnique({
			where: { webId: webId },
		});
		const dishesRegistered = await client.dishes.findMany({ where: { webId: webId } });

		if (categoriesRegistered) {
			const categories = categoriesRegistered.categories as allowedCategoriesRecord;
			if (dishesRegistered.length > 0) {
				const categoriesRecord = categories.allowedCategories.map((category) => {
					return {
						...category,
						hasRecordUsingCategory: dishesRegistered.some((dish) => {
							return dish.category === category.value;
						}),
					};
				});
				return categoriesRecord;
			}
			return categories.allowedCategories;
		}
		return unauthorizedCallback(403, { reason: UserStatus.WEB_DOESNT_EXISTS });
	} catch {
		return unauthorizedCallback(403, { reason: UserStatus.UNAUTHORIZED });
	}
};
