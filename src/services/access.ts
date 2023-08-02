import jwt from "jsonwebtoken";
import { TsoaResponse } from "tsoa";
import { UserStatus } from "../types/messages";

export const isOAuthToken = (token: string) => {
	return token.startsWith("Bearer ");
};

export const getEmail = (token: string) => {
	if (!isOAuthToken(token)) return token.replace("Api-Key ", "");
	const decoded = jwt.decode(token.replace("Bearer ", ""));
	return typeof decoded === "object" ? (decoded?.email || "").toLowerCase() : "";
};

export const verifyToken = (authorization: string) => {
	if (isOAuthToken(authorization)) {
		const token = authorization.replace("Bearer ", ""); // Remove the "Bearer " prefix
		return jwt.verify(token, "secretKey");
	} else {
		throw new Error("Invalid token");
	}
};
