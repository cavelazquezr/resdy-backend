import { Prisma, Restaurant } from "@prisma/client";
import { client } from "../../services/prisma";
import { verifyToken } from "../../services/access";
import { UserStatus } from "../../types/messages";
import { TsoaResponse } from "tsoa";
import { CreateRestaurantInput } from "../../types/webs";

export const postRestaurantHandler = async (
	authorization: string,
	restaurant: CreateRestaurantInput,
	unauthorizedCallback: TsoaResponse<403, { reason: string }>,
): Promise<Restaurant | string> => {
	const { email } = verifyToken(authorization);
	const admin = await client.user.findUnique({ where: { email } });

	try {
		return client.$transaction(async (tx) => {
			const new_restaurant = await tx.restaurant.create({
				data: {
					name: restaurant.name,
					admin: { connect: { id: admin?.id } },
				},
			});
			await tx.customization.create({
				data: {
					...restaurant.customization,
					restaurant: { connect: { id: new_restaurant.id } },
				},
			});
			await tx.restaurantInformation.create({
				data: {
					...restaurant.restaurant_information,
					restaurant: { connect: { id: new_restaurant.id } },
				},
			});
			return new_restaurant;
		});
	} catch (error) {
		if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
			// Unique constraint violation for 'name' field
			return unauthorizedCallback(403, {
				reason: UserStatus.WEB_ALREADY_EXISTS,
			});
		}
		throw error; // Rethrow the error if it's not a unique constraint violation
	}
};
