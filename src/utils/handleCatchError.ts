import { HttpError } from "express-openapi-validator/dist/framework/types";

export interface CatchErrorDetails {
	status?: number;
	name?: string;
	message?: string;
	path?: string;
}

export function handleCatchError(details: CatchErrorDetails): never {
	throw new HttpError({
		status: details.status || 500,
		message: details.message || "Internal Server Error",
		name: details.name || "Internal Server Error",
		path: details.path ?? "",
	});
}
