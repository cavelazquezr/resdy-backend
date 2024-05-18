import { HttpError } from "express-openapi-validator/dist/framework/types";

interface CatchErrorDetails {
	status?: number;
	name?: string;
	message?: string;
	path: string;
}

export function handleCatchError(e: unknown | undefined, details: CatchErrorDetails): never {
	console.error(e);
	throw new HttpError({
		status: details.status || 500,
		message: details.message || "Internal Server Error",
		name: details.name || "Internal Server Error",
		path: details.path,
	});
}
