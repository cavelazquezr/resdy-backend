import jwt from "jsonwebtoken";
import client from "../config/client";

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

export const isAdminOfCurrentRestaurant = async (authorization: string, restaurant_id: string): Promise<boolean> => {
	const { email } = verifyToken(authorization);
	const admin = await client.user.findUnique({ where: { email: email } });
	const currentRestaurant = await client.restaurant.findUnique({
		where: { id: restaurant_id },
	});

	return admin?.id !== currentRestaurant?.admin_id;
};
