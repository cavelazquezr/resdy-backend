import { TsoaResponse } from "tsoa";
import { UserStatus } from "../../types/messages";
import { checkIfCredentialMatches, checkIfIsValidToken } from "../../utils/validations";
import { UserCreateInput, UserCredentials, UserUpdateInput } from "../../types/user";
import { getUserByEmail } from "../models/auth-models";
import { verifyToken } from "../../utils";
import { handleCatchError } from "../../utils/handleCatchError";

export const authenticateUserValidations = async (credentials: UserCredentials): Promise<boolean | string> => {
	const credential_matches = await checkIfCredentialMatches(credentials);
	if (!credential_matches) {
		return handleCatchError(401, {
			status: 401,
			message: UserStatus.INCORRECT_CREDENTIALS,
			path: "/authentication",
		});
	}
	return true;
};

export const createUserValidations = async (user_record: UserCreateInput): Promise<boolean | string> => {
	const { email } = user_record;
	const user_exists = !!(await getUserByEmail(email));
	if (user_exists) {
		return handleCatchError(404, {
			status: 404,
			message: UserStatus.USER_ALREADY_EXISTS,
			path: "/authentication",
		});
	}
	return true;
};

export const updateUserValidations = async (
	authorization: string,
	payload: UserUpdateInput,
): Promise<boolean | string> => {
	const { email } = verifyToken(authorization);
	const user = await getUserByEmail(email);
	if (user) {
		if (payload.email) {
			const user_exists = !!(await getUserByEmail(payload.email));
			if (user_exists) {
				return handleCatchError(409, {
					status: 409,
					message: UserStatus.USER_ALREADY_EXISTS,
					path: "/authentication",
				});
			}
		}
		if (payload.firstname && payload.firstname.length > 20) {
			return handleCatchError(422, {
				status: 422,
				message: "The name you provided is too long",
				path: "/authentication",
			});
		}
		if (payload.lastname && payload.lastname.length > 20) {
			return handleCatchError(422, {
				status: 422,
				message: "The lastname you provided is too long",
				path: "/authentication",
			});
		}
		if (payload.old_password !== user.password && payload.password) {
			console.log("password ingresada: ", payload.old_password, "password vieja", user.password);
			return handleCatchError(422, {
				status: 422,
				message: "The password you provided is incorrect",
				path: "/authentication",
			});
		}
		if (payload.password && payload.password.length < 6) {
			return handleCatchError(422, {
				status: 422,
				message: "The password you provided is too short",
				path: "/authentication",
			});
		}

		// Check if the password is the same
		if (payload.password && payload.password === user.password) {
			return handleCatchError(422, {
				status: 422,
				message: "You cannot use the same password",
				path: "/authentication",
			});
		}
	} else {
		return handleCatchError(404, {
			status: 404,
			message: UserStatus.USER_NOT_FOUND,
			path: "/authentication",
		});
	}

	return true;
};
