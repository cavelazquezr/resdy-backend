"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.DetailedValidateError = void 0;
const tsoa_1 = require("tsoa");
class DetailedValidateError extends tsoa_1.ValidateError {
    constructor(fields, message) {
        super({}, message); // Call the base class constructor with empty fields
        this.fields = fields;
        Object.setPrototypeOf(this, DetailedValidateError.prototype); // Ensure the prototype chain is correct
    }
}
exports.DetailedValidateError = DetailedValidateError;
const errorHandler = (err, req, res, next) => {
    console.error(`❌ Caught Error for ${req.path}:`, err);
    if (err instanceof DetailedValidateError) {
        console.error(`❌ Caught Validation Error for ${req.path}:`, err.fields);
        // Extract the highest-priority status code from the detailed field errors
        const status = Math.min(...Object.values(err.fields).map((field) => field.status));
        return res.status(status).json({
            message: "Validation Failed",
            details: err.fields,
        });
    }
    else if (err instanceof tsoa_1.ValidateError) {
        console.error(`❌ Caught Validation Error for ${req.path}:`, err.fields);
        return res.status(422).json({
            message: "Validation Failed",
            details: err?.fields,
        });
    }
    else if (err instanceof Error) {
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
    next();
};
exports.errorHandler = errorHandler;
