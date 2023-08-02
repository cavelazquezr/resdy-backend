import jwt from "jsonwebtoken";
import { client } from "../../services/prisma";
import { UserCredentials } from "../../types/users";
import { TsoaResponse } from "tsoa";
import { UserStatus } from "../../types/messages";

export const authenticateUserHandler = async (
	credentials: UserCredentials,
	unauthorizedCallback: TsoaResponse<403, { reason: string }>,
): Promise<{ token: string } | string> => {
	const { email, password } = credentials;
	const user = await client.user.findUnique({
		where: { email },
	});

	if (!user || user.password !== password) {
		return unauthorizedCallback(403, { reason: UserStatus.INCORRECT_CREDENTIALS });
	}

	// Generate and return the JWT token
	const token = jwt.sign({ email }, "secretKey");
	return { token: token };
};
