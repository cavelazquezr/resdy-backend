import jwt from "jsonwebtoken";
import { client } from "../../services/prisma";
import { CreateUserInput, UserCredentials, UserOutput } from "../../types/user";
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
	const token = jwt.sign({ email }, "secretKey", { expiresIn: "1h" });

	return { token: token };
};

export const postUserHandler = async (
	user: CreateUserInput,
	unauthorizedCallback: TsoaResponse<403, { reason: string }>,
): Promise<UserOutput> => {
	const matchingUser = await client.user.findUnique({
		where: {
			email: user.email,
		},
	});
	if (matchingUser) {
		return unauthorizedCallback(403, { reason: UserStatus.USER_ALREADY_EXISTS });
	}
	const newUser = await client.user.create({ data: user });
	return newUser;
};
