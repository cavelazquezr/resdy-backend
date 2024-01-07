import { client } from "../../services/prisma";
import { UserOutput } from "../../types/user";
import { TsoaResponse } from "tsoa";
import { UserStatus } from "../../types/messages";
import { verifyToken } from "../../services/access";

export const getCurrentUserHandler = async (
	authorization: string,
	unauthorizedCallback: TsoaResponse<403, { reason: string }>,
): Promise<UserOutput | string> => {
	try {
		const decoded = verifyToken(authorization);

		const currentUser = await client.user.findUnique({
			where: { email: decoded.email as string },
			select: {
				id: true,
				email: true,
				firstname: true,
				lastname: true,
				avatar_url: true,
				created_at: true,
				is_active: true,
				is_owner: true,
			},
		});

		if (!currentUser) {
			return unauthorizedCallback(403, { reason: UserStatus.NOT_FOUND });
		}

		return currentUser;
	} catch {
		return unauthorizedCallback(403, { reason: UserStatus.UNAUTHORIZED });
	}
};
