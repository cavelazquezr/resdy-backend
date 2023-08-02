import { Prisma, User } from "@prisma/client";
import { TsoaResponse } from "tsoa";
import { client } from "../../services/prisma";
import { UserStatus } from "../../types/messages";
import { verifyToken } from "../../services/access";

type PutUserHandlerResponse = User | string;

export const putUserHandler = async (
	authorization: string,
	user: Prisma.UserUpdateInput,
	unauthorizedCallback: TsoaResponse<403, { reason: string }>,
): Promise<PutUserHandlerResponse> => {
	try {
		const decoded = verifyToken(authorization);

		if (decoded.email !== user.email) {
			return unauthorizedCallback(403, { reason: UserStatus.UNAUTHORIZED });
		}

		const updatedUser = await client.user.update({
			where: { id: user.id as string },
			data: user,
		});

		if (!updatedUser) {
			return unauthorizedCallback(403, { reason: UserStatus.NOT_FOUND });
		}

		return updatedUser;
	} catch {
		return unauthorizedCallback(403, { reason: UserStatus.UNAUTHORIZED });
	}
};
