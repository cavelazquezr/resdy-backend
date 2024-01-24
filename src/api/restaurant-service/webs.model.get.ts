import { Dishes, Prisma, Rating } from "@prisma/client";
import { client } from "../../services/prisma";
import { UserStatus } from "../../types/messages";
import { TsoaResponse } from "tsoa";
import { RestaurantOutput } from "@rootTypes/restaurant";
import { calculatePriceAverage, calculateRatingAverage } from "../utils";

export const getRestaurantHandler = async (
	unauthorizedCallback: TsoaResponse<403, { reason: string }>,
	name?: string,
	city?: string,
	restaurantType?: string,
	country?: string,
): Promise<RestaurantOutput[] | string> => {
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
						header_url: true,
					},
				},
				dishes: true,
				ratings: true,
			},
			where: {
				name: { equals: name },
				restaurant_information: {
					city: { contains: city },
					country: { contains: country },
					restaurant_type: { contains: restaurantType },
				},
			},
		});

		if (qRestaurants.length === 0) {
			return unauthorizedCallback(403, { reason: UserStatus.NOT_FOUND });
		}

		const restaurantsRecord: RestaurantOutput[] = qRestaurants.map((restaurant) => {
			const { name, restaurant_information, customization } = restaurant;

			return {
				name: name,
				brand_name: customization?.name ?? undefined,
				logo_url: customization?.logo_url ?? undefined,
				header_url: customization?.header_url ?? undefined,
				city: restaurant_information?.city ?? undefined,
				address: restaurant_information?.address ?? undefined,
				phone: restaurant_information?.phone ?? undefined,
				country: restaurant_information?.country ?? undefined,
				restaurant_type: restaurant_information?.restaurant_type ?? undefined,
				rating: calculateRatingAverage(restaurant.ratings),
				rating_count: restaurant.ratings.length,
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
