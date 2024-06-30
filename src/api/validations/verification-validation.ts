import { CatchErrorDetails, handleCatchError } from "../../utils/handleCatchError";
import { checkIfUserExists } from "../../utils/validations";

export const verifyIfEmailIsUsedValidations = async (email: string): Promise<void | CatchErrorDetails> => {
	const userExists = await checkIfUserExists(email);
	if (userExists) {
		return handleCatchError({
			status: 409,
			message: `Este correo ya está en uso`,
		});
	}
};
