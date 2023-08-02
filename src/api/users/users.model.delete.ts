import { User } from "@prisma/client";
import { client } from "../../services/prisma";
import { UserStatus } from "../../types/messages";
import { TsoaResponse } from "tsoa";
import { verifyToken } from "../../services/access";

export const deleteUserHandler = async (
	authorization: string,
	id: string,
	unauthorizedCallback: TsoaResponse<403, { reason: string }>,
): Promise<User | string> => {
	try {
		const decoded = verifyToken(authorization);

		const userToDelete = await client.user.findUnique({ where: { id } });

		if (!userToDelete) {
			return unauthorizedCallback(403, { reason: UserStatus.NOT_FOUND });
		}

		if (decoded.email !== userToDelete.email) {
			return unauthorizedCallback(403, { reason: UserStatus.UNAUTHORIZED });
		}

		const deletedUser = await client.user.delete({
			where: { id: userToDelete.id },
		});

		return deletedUser;
	} catch {
		return unauthorizedCallback(403, { reason: UserStatus.UNAUTHORIZED });
	}
};
