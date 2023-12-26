import { Prisma, User } from "@prisma/client";
import { TsoaResponse } from "tsoa";
import { client } from "../../../services/prisma";
import { isAdminOfCurrentRestaurant } from "../../../services/access";
import { UserStatus } from "../../../types/messages";

export const putInformationHandler = async (
	authorization: string,
	information: Prisma.RestaurantInformationCreateManyInput,
	unauthorizedCallback: TsoaResponse<403, { reason: string }>,
) => {
	const { restaurant_id } = information;
	const isAdmin = await isAdminOfCurrentRestaurant(authorization, restaurant_id);

	if (!isAdmin) {
		return unauthorizedCallback(403, { reason: UserStatus.UNAUTHORIZED });
	}

	const updatedInformation = client.restaurantInformation.update({
		where: { restaurant_id: restaurant_id },
		data: { ...information },
	});

	return updatedInformation;
};
