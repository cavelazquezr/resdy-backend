import { Dishes, Prisma } from "@prisma/client";
import { client } from "../../services/prisma";
import { UserStatus } from "../../types/messages";
import { TsoaResponse } from "tsoa";
import { WebOutput } from "../../types/webs";

export const getWebsHandler = async (
	unauthorizedCallback: TsoaResponse<403, { reason: string }>,
	name?: string,
	city?: string,
	restautantType?: string,
	country?: string,
): Promise<WebOutput[] | string> => {
	try {
		const webs = await client.web.findMany({
			select: {
				id: true,
				name: true,
				webInformation: {
					select: {
						city: true,
						country: true,
						phone: true,
						address: true,
						restaurantType: true,
						location: true,
					},
				},
				dishes: true,
			},
			where: {
				name: { contains: name },
				webInformation: {
					city: { contains: city },
					country: { contains: country },
					restaurantType: { contains: restautantType },
				},
			},
		});

		if (webs.length === 0) {
			return unauthorizedCallback(403, { reason: UserStatus.NOT_FOUND });
		}

		const calculatePriceAverage = (dishes: Dishes[]) => {
			if (dishes.length === 0) {
				return 0;
			}

			const total = dishes.reduce((sum, dish) => sum + parseFloat(dish.price.toString()), 0);
			const average = total / dishes.length;
			const roundedAverage = Math.round(average / 2) * 2;

			return roundedAverage;
		};

		const websRecord: WebOutput[] = webs.map((web) => ({
			id: web.id,
			name: web.name,
			address: web.webInformation?.address ?? undefined,
			phone: web.webInformation?.phone ?? undefined,
			city: web.webInformation?.city ?? undefined,
			country: web.webInformation?.country ?? undefined,
			restaurantType: web.webInformation?.restaurantType ?? undefined,
			location: web.webInformation?.location as Prisma.JsonObject | undefined,
			ratings: 0,
			ratingStarts: 0,
			priceAverage: calculatePriceAverage(web.dishes),
		}));

		return websRecord;
	} catch (error) {
		console.error("Error in getWebsHandler:", error);
		return unauthorizedCallback(403, { reason: UserStatus.UNAUTHORIZED });
	}
};
