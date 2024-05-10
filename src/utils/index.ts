import { Dishes, Rating } from "@prisma/client";
import jwt from "jsonwebtoken";

export const isOAuthToken = (token: string) => {
	return token.startsWith("Bearer ");
};

export const getEmail = (token: string) => {
	if (!isOAuthToken(token)) return token.replace("Api-Key ", "");
	const decoded = jwt.decode(token.replace("Bearer ", ""));
	return typeof decoded === "object" ? (decoded?.email || "").toLowerCase() : "";
};

export const verifyToken = (authorization: string): { email: string } => {
	if (isOAuthToken(authorization)) {
		const token = authorization.replace("Bearer ", ""); // Remove the "Bearer " prefix
		return jwt.verify(token, "secretKey");
	} else {
		throw new Error("Invalid token");
	}
};

export const calculatePriceAverage = (dishes: Dishes[]) => {
	if (dishes.length === 0) {
		return 0;
	}

	const total = dishes.reduce((sum, dish) => sum + parseFloat(dish.price.toString()), 0);
	const average = total / dishes.length;
	const roundedAverage = Math.round(average / 2) * 2;

	return roundedAverage;
};

export const calculateRatingAverage = (rating: Rating[]) => {
	if (rating.length === 0) {
		return 0;
	}

	const total = rating.reduce((sum, rating) => sum + parseFloat(rating.rating ? rating.rating.toString() : "0"), 0);
	const average = total / rating.length;
	const roundedAverage = parseFloat(average.toFixed(1));

	return roundedAverage;
};

export const getStatsFromRatings = (ratings: Rating[]) => {
	const ratingCounts: Record<string, number> = {
		"5": 0,
		"4": 0,
		"3": 0,
		"2": 0,
		"1": 0,
	};

	ratings.forEach((rating) => {
		if (rating.rating) {
			const ratingValue = rating.rating.toString();
			if (ratingCounts.hasOwnProperty(ratingValue)) {
				ratingCounts[ratingValue]++;
			}
		}
	});

	return ratingCounts;
};

export const convertToAmpersandSeparated = (text: string) => {
	const wordsArray = text.split(" ");

	const resultString = wordsArray.filter((word) => word !== "").join(" & ");

	return resultString;
};
