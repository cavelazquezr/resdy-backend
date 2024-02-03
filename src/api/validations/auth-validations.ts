import { TsoaResponse } from "tsoa";
import { UserStatus } from "../../types/messages";
import { checkIfCredentialMatches, checkIfIsValidToken } from "../../utils/validations";
import { UserCreateInput, UserCredentials } from "../../types/user";
import { getUserByEmail } from "../models/auth-models";

export const getCurrentUserValidations = async (
	authorization: string,
	unauthorizedCallback: TsoaResponse<403, { reason: string }>,
): Promise<boolean | string> => {
	// const is_valid_token = checkIfIsValidToken(authorization);
	// if (!is_valid_token) {
	// 	return unauthorizedCallback(403, { reason: UserStatus.INVALID_TOKEN });
	// }
	return true;
};

export const authenticateUserValidations = async (
	credentials: UserCredentials,
	unauthorizedCallback: TsoaResponse<403, { reason: string }>,
): Promise<boolean | string> => {
	const credential_matches = await checkIfCredentialMatches(credentials);
	if (!credential_matches) {
		return unauthorizedCallback(403, { reason: UserStatus.INCORRECT_CREDENTIALS });
	}
	return true;
};

export const createUserValidations = async (
	user_record: UserCreateInput,
	unauthorizedCallback: TsoaResponse<403, { reason: string }>,
): Promise<boolean | string> => {
	const { email } = user_record;
	const user_exists = !!(await getUserByEmail(email));
	if (user_exists) {
		return unauthorizedCallback(403, { reason: UserStatus.USER_ALREADY_EXISTS });
	}
	return true;
};
