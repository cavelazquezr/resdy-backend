import { TsoaResponse } from "tsoa";
import { UserStatus } from "../../../types/messages";
import { client } from "../../../services/prisma";
import { DishOutput } from "../../../types/menu";

export const getDishesHandler = async (
	restaurant_id: string,
	unauthorizedCallback: TsoaResponse<403, { reason: string }>,
): Promise<DishOutput[] | string> => {
	try {
		const dishes = await client.dishes.findMany({
			where: { restaurant_id: restaurant_id },
		});

		if (dishes.length === 0) {
			return unauthorizedCallback(403, { reason: UserStatus.NOT_FOUND });
		}
		return dishes.map((dish) => ({
			...dish,
			description: dish.description ?? "",
			photo_url: dish.photo_url ?? "",
			allergen: dish.allergen?.split(",") ?? [],
		}));
	} catch {
		return unauthorizedCallback(403, { reason: UserStatus.UNAUTHORIZED });
	}
};
