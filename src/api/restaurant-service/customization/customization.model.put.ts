import { Prisma } from "@prisma/client";
import { TsoaResponse } from "tsoa";
import { client } from "../../../services/prisma";
import { isAdminOfCurrentRestaurant } from "../../../services/access";
import { UserStatus } from "../../../types/messages";

export const putCustomizationHandler = async (
	authorization: string,
	customization: Prisma.RestaurantInformationCreateManyInput,
	unauthorizedCallback: TsoaResponse<403, { reason: string }>,
) => {
	const { restaurant_id } = customization;
	const isAdmin = await isAdminOfCurrentRestaurant(authorization, restaurant_id);

	if (!isAdmin) {
		return unauthorizedCallback(403, { reason: UserStatus.UNAUTHORIZED });
	}

	const updatedInformation = client.customization.update({
		where: { restaurant_id: restaurant_id },
		data: { ...customization },
	});

	return updatedInformation;
};;
