"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserValidations = exports.authenticateUserValidations = exports.getCurrentUserValidations = void 0;
const messages_1 = require("../../types/messages");
const validations_1 = require("../../utils/validations");
const auth_models_1 = require("../models/auth-models");
const getCurrentUserValidations = async (authorization, unauthorizedCallback) => {
    // const is_valid_token = checkIfIsValidToken(authorization);
    // if (!is_valid_token) {
    // 	return unauthorizedCallback(403, { reason: UserStatus.INVALID_TOKEN });
    // }
    return true;
};
exports.getCurrentUserValidations = getCurrentUserValidations;
const authenticateUserValidations = async (credentials, unauthorizedCallback) => {
    const credential_matches = await (0, validations_1.checkIfCredentialMatches)(credentials);
    if (!credential_matches) {
        return unauthorizedCallback(403, { reason: messages_1.UserStatus.INCORRECT_CREDENTIALS });
    }
    return true;
};
exports.authenticateUserValidations = authenticateUserValidations;
const createUserValidations = async (user_record, unauthorizedCallback) => {
    const { email } = user_record;
    const user_exists = !!(await (0, auth_models_1.getUserByEmail)(email));
    if (user_exists) {
        return unauthorizedCallback(403, { reason: messages_1.UserStatus.USER_ALREADY_EXISTS });
    }
    return true;
};
exports.createUserValidations = createUserValidations;
