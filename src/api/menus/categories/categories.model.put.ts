import { DishesCategories } from "@prisma/client";
import { client } from "../../../services/prisma";
import { TsoaResponse } from "tsoa";
import { verifyToken } from "../../../services/access";
import { UserStatus } from "../../../types/messages";
import { allowedCategoriesRecord, CategoryCollection } from "../../../types/categories";

export const putCategoryHandler = async (
	authorization: string,
	webId: string,
	category: CategoryCollection,
	unauthorizedCallback: TsoaResponse<403, { reason: string }>,
): Promise<DishesCategories | string> => {
	try {
		const { email } = verifyToken(authorization);
		const admin = await client.user.findUnique({ where: { email: email } });
		const currentWeb = await client.web.findUnique({ where: { id: webId } });

		if (admin?.id !== currentWeb?.adminId) {
			return unauthorizedCallback(403, { reason: UserStatus.UNAUTHORIZED });
		}

		const webCategories = await client.dishesCategories.findUnique({
			where: { webId: webId },
		});
		const categories = webCategories?.categories as allowedCategoriesRecord;
		const updatedCategories = await client.dishesCategories.update({
			where: { webId: webCategories?.webId },
			data: {
				...webCategories,
				categories: {
					allowedCategories: [...categories.allowedCategories, category],
				},
			},
		});

		return updatedCategories;
	} catch {
		return unauthorizedCallback(403, { reason: UserStatus.UNAUTHORIZED });
	}
};
