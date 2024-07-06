import { ValidateError } from "tsoa";
import { Response as ExResponse, Request as ExRequest, NextFunction } from "express";

export interface DetailedFieldError {
	message: string;
	status: number;
}

export class DetailedValidateError extends ValidateError {
	fields: { [name: string]: DetailedFieldError };

	constructor(fields: { [name: string]: DetailedFieldError }, message: string) {
		super({}, message); // Call the base class constructor with empty fields
		this.fields = fields;
		Object.setPrototypeOf(this, DetailedValidateError.prototype); // Ensure the prototype chain is correct
	}
}

export const errorHandler = (err: unknown, req: ExRequest, res: ExResponse, next: NextFunction): ExResponse | void => {
	if (err instanceof DetailedValidateError) {
		console.error(`❌ Caught Validation Error for ${req.path}:`, err.fields);

		// Extract the highest-priority status code from the detailed field errors
		const status = Math.min(...Object.values(err.fields).map((field) => field.status));

		return res.status(status).json({
			message: "Validation Failed",
			details: err.fields,
		});
	} else if (err instanceof ValidateError) {
		console.error(`❌ Caught Validation Error for ${req.path}:`, err.fields);
		return res.status(422).json({
			message: "Validation Failed",
			details: err?.fields,
		});
	} else if (err instanceof Error) {
		return res.status(500).json({
			message: "Internal Server Error",
		});
	}

	next();
};
