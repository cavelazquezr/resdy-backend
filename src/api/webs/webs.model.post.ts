import { Prisma, Web } from "@prisma/client";
import { client } from "../../services/prisma";
import { verifyToken } from "../../services/access";
import { UserStatus } from "../../types/messages";
import { TsoaResponse } from "tsoa";
import { defaultCustomization } from "./customization/utils/default_customization";

export const postWebHandler = async (
	authorization: string,
	web: Prisma.WebCreateWithoutAdminInput,
	unauthorizedCallback: TsoaResponse<403, { reason: string }>,
): Promise<Web | string> => {
	const { email } = verifyToken(authorization);
	const admin = await client.user.findUnique({ where: { email } });

	try {
		const newWeb = await client.web.create({
			data: { ...web, admin: { connect: { id: admin?.id } } },
		});
		await client.customization.create({
			data: { ...defaultCustomization, web: { connect: { id: newWeb.id } } },
		});
		await client.webInformation.create({
			data: { web: { connect: { id: newWeb.id } } },
		});
		await client.dishesCategories.create({
			data: { categories: { allowedCategories: [] }, web: { connect: { id: newWeb.id } } },
		});
		return newWeb;
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
