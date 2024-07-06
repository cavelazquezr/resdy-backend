import { checkIfCredentialMatches } from "../../utils/validations";
import { UserCreateInput, UserCredentials, UserUpdateInput } from "../../types/user";
import { getUserByEmail } from "../models/auth-models";
import { verifyToken } from "../../utils";
import { handleValidate } from "../../utils/handleValidate";

export const authenticateUserValidations = async (credentials: UserCredentials): Promise<void> => {
	await handleValidate(async (errors) => {
		const credentialMatches = await checkIfCredentialMatches(credentials);
		if (!credentialMatches) {
			errors.credentials = { message: "El correo o la contraseña son incorrectos", status: 401 };
		}
	});
};

export const createUserValidations = async (user_record: UserCreateInput): Promise<void> => {
	await handleValidate(async (errors) => {
		const { email } = user_record;
		const user_exists = !!(await getUserByEmail(email));
		if (user_exists) {
			errors.email = { message: "El usuario ya existe", status: 409 };
		}
	});
};

export const updateUserValidations = async (authorization: string, payload: UserUpdateInput): Promise<void> => {
	await handleValidate(async (errors) => {
		const { email } = verifyToken(authorization);
		const user = await getUserByEmail(email);
		if (user) {
			if (payload.email) {
				const user_exists = !!(await getUserByEmail(payload.email));
				if (user_exists) {
					errors.email = { message: "El correo electrónico ya está en uso", status: 409 };
				}
			}
			if (payload.firstname && payload.firstname.length > 20) {
				errors.firstname = { message: "El nombre proporcionado es demasiado largo", status: 422 };
			}
			if (payload.lastname && payload.lastname.length > 20) {
				errors.lastname = { message: "El apellido proporcionado es demasiado largo", status: 422 };
			}
			if (payload.old_password !== user.password && payload.password) {
				errors.old_password = { message: "La contraseña proporcionada es incorrecta", status: 422 };
			}
			if (payload.password && payload.password.length < 6) {
				errors.password = { message: "La contraseña proporcionada es demasiado corta", status: 422 };
			}
			if (payload.password && payload.password === user.password) {
				errors.password = { message: "No puedes usar la misma contraseña", status: 422 };
			}
		} else {
			errors.user = { message: "Usuario no encontrado", status: 404 };
		}
	});
};
