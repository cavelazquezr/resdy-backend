import { UserStatus } from "../../types/messages";
import { checkIfCredentialMatches } from "../../utils/validations";
import { UserCreateInput, UserCredentials, UserUpdateInput } from "../../types/user";
import { getUserByEmail } from "../models/auth-models";
import { verifyToken } from "../../utils";
import { handleCatchError } from "../../utils/handleCatchError";

export const authenticateUserValidations = async (credentials: UserCredentials): Promise<boolean | string> => {
	const credential_matches = await checkIfCredentialMatches(credentials);
	if (!credential_matches) {
		return handleCatchError({
			status: 401,
			message: "El correo o la contraseña son incorrectos",
			path: "/authentication",
		});
	}
	return true;
};

export const createUserValidations = async (user_record: UserCreateInput): Promise<boolean | string> => {
	const { email } = user_record;
	const user_exists = !!(await getUserByEmail(email));
	if (user_exists) {
		return handleCatchError({
			status: 409,
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
				return handleCatchError({
					status: 409,
					message: UserStatus.USER_ALREADY_EXISTS,
					path: "/authentication",
				});
			}
		}
		if (payload.firstname && payload.firstname.length > 20) {
			return handleCatchError({
				status: 422,
				message: "The name you provided is too long",
				path: "/authentication",
			});
		}
		if (payload.lastname && payload.lastname.length > 20) {
			return handleCatchError({
				status: 422,
				message: "The lastname you provided is too long",
				path: "/authentication",
			});
		}
		if (payload.old_password !== user.password && payload.password) {
			console.log("password ingresada: ", payload.old_password, "password vieja", user.password);
			return handleCatchError({
				status: 422,
				message: "The password you provided is incorrect",
				path: "/authentication",
			});
		}
		if (payload.password && payload.password.length < 6) {
			return handleCatchError({
				status: 422,
				message: "The password you provided is too short",
				path: "/authentication",
			});
		}

		// Check if the password is the same
		if (payload.password && payload.password === user.password) {
			return handleCatchError({
				status: 422,
				message: "You cannot use the same password",
				path: "/authentication",
			});
		}
	} else {
		return handleCatchError({
			status: 404,
			message: UserStatus.USER_NOT_FOUND,
			path: "/authentication",
		});
	}

	return true;
};
