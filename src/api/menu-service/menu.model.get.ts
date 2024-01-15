import { TsoaResponse } from "tsoa";
import { MenuOutput } from "../../types/menu";
import { client } from "../../services/prisma";
import { UserStatus } from "../../types/messages";

export const getMenuHandler = async (
	restaurant_id: string,
	unauthorizedCallback: TsoaResponse<403, { reason: string }>,
): Promise<MenuOutput[] | string> => {
	const qRestaurant = await client.restaurant.findUnique({
		where: { id: restaurant_id },
	});
	if (!qRestaurant) {
		return unauthorizedCallback(403, { reason: UserStatus.WEB_DOESNT_EXIST });
	}
	const qCategories = await client.dishesCategories.findMany({
		where: {
			restaurant: {
				id: { equals: restaurant_id },
			},
		},
		select: {
			label: true,
			dishes: true,
		},
	});
	const menuRecords: MenuOutput[] = qCategories.map((category) => {
		const { label, dishes } = category;
		return {
			category: label,
			dishes: dishes.map((dish) => {
				const { description, photo_url, allergen, restaurant_id, category_id, ...restDish } = dish;
				return {
					...restDish,
					description: description ?? undefined,
					photo_url: photo_url ?? undefined,
					allergen: allergen?.split(",") ?? [],
				};
			}),
		};
	});
	return menuRecords;
};
