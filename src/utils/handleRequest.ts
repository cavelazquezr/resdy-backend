import { HttpError } from "express-openapi-validator/dist/framework/types";
import { Controller } from "tsoa";

interface CatchErrorDetails {
	status?: number;
	message?: string;
	path?: string;
}

export const handleRequest = async <T>(
	controller: Controller,
	serviceFunction: () => Promise<T>,
): Promise<T | CatchErrorDetails> => {
	try {
		return await serviceFunction();
	} catch (error) {
		if (error instanceof HttpError) {
			controller.setStatus(error.status);
			return { message: error.message, path: error.path ?? "" };
		}
		controller.setStatus(500);
		return { message: "Internal Server Error" };
	}
};
