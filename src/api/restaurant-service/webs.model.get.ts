import { Dishes, Prisma } from "@prisma/client";
import { client } from "../../services/prisma";
import { UserStatus } from "../../types/messages";
import { TsoaResponse } from "tsoa";
import { RestautantOutput } from "../../types/restaurant";

export const getRestaurantHandler = async (
	unauthorizedCallback: TsoaResponse<403, { reason: string }>,
	name?: string,
	city?: string,
	restautantType?: string,
	country?: string,
): Promise<RestautantOutput[] | string> => {
	try {
		const qRestaurants = await client.restaurant.findMany({
			select: {
				id: true,
				name: true,
				restaurant_information: {
					select: {
						city: true,
						country: true,
						phone: true,
						address: true,
						restaurant_type: true,
						location: true,
					},
				},
				customization: {
					select: {
						name: true,
						logo_url: true,
					},
				},
				dishes: true,
			},
			where: {
				restaurant_information: {
					city: { contains: city },
					country: { contains: country },
					restaurant_type: { contains: restautantType },
				},
				customization: {
					name: { contains: name },
				},
			},
		});

		if (qRestaurants.length === 0) {
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

		const restaurantsRecord: RestautantOutput[] = qRestaurants.map((restaurant) => {
			const { name, restaurant_information, customization } = restaurant;

			return {
				name: name,
				brand_name: customization?.name ?? undefined,
				logo_url: customization?.logo_url ?? undefined,
				city: restaurant_information?.city ?? undefined,
				address: restaurant_information?.address ?? undefined,
				phone: restaurant_information?.phone ?? undefined,
				country: restaurant_information?.country ?? undefined,
				restaurant_type: restaurant_information?.restaurant_type ?? undefined,
				rating: 0,
				rating_count: 0,
				price_average: calculatePriceAverage(restaurant.dishes),
				location: restaurant_information?.location as Prisma.JsonObject | undefined,
			};
		});

		return restaurantsRecord;
	} catch (error) {
		console.error("Error in getWebsHandler:", error);
		return unauthorizedCallback(403, { reason: UserStatus.UNAUTHORIZED });
	}
};
