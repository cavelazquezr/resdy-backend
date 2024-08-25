"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleValidate = void 0;
const errors_1 = require("../config/errors");
const handleValidate = async (validationFunction) => {
    const errors = {};
    await validationFunction(errors);
    if (Object.keys(errors).length > 0) {
        throw new errors_1.DetailedValidateError(errors, "Validation Error");
    }
};
exports.handleValidate = handleValidate;
