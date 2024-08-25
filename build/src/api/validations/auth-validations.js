"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserValidations = exports.createUserValidations = exports.authenticateUserValidations = void 0;
const validations_1 = require("../../utils/validations");
const auth_models_1 = require("../models/auth-models");
const utils_1 = require("../../utils");
const handleValidate_1 = require("../../utils/handleValidate");
const authenticateUserValidations = async (credentials) => {
    await (0, handleValidate_1.handleValidate)(async (errors) => {
        const credentialMatches = await (0, validations_1.checkIfCredentialMatches)(credentials);
        if (!credentialMatches) {
            errors.credentials = { message: "El correo o la contraseña son incorrectos", status: 401 };
        }
    });
};
exports.authenticateUserValidations = authenticateUserValidations;
const createUserValidations = async (user_record) => {
    await (0, handleValidate_1.handleValidate)(async (errors) => {
        const { email } = user_record;
        const user_exists = !!(await (0, auth_models_1.getUserByEmail)(email));
        if (user_exists) {
            errors.email = { message: "El usuario ya existe", status: 409 };
        }
    });
};
exports.createUserValidations = createUserValidations;
const updateUserValidations = async (authorization, payload) => {
    await (0, handleValidate_1.handleValidate)(async (errors) => {
        const { email } = (0, utils_1.verifyToken)(authorization);
        const user = await (0, auth_models_1.getUserByEmail)(email);
        if (user) {
            if (payload.email) {
                const user_exists = !!(await (0, auth_models_1.getUserByEmail)(payload.email));
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
            if (payload.password && payload.old_password) {
                if (payload.old_password !== user.password && payload.password) {
                    errors.old_password = { message: "La contraseña proporcionada es incorrecta", status: 422 };
                }
                if (payload.password && payload.password.length < 6) {
                    errors.password = { message: "La contraseña proporcionada es demasiado corta", status: 422 };
                }
                if (payload.old_password !== user.password) {
                    errors.old_password = { message: "La contraseña introducida es incorrecta", status: 422 };
                }
                if (payload.password && payload.password === user.password) {
                    errors.password = { message: "No puedes usar la misma contraseña", status: 422 };
                }
            }
        }
        else {
            errors.user = { message: "Usuario no encontrado", status: 404 };
        }
    });
};
exports.updateUserValidations = updateUserValidations;
