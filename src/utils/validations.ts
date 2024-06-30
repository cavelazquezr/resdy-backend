import jwt from "jsonwebtoken";
import { verifyToken } from ".";
import { UserCredentials } from "../types/user";
import { getUserByEmail } from "../api/models/auth-models";
import client from "../config/client";
import { getReservationByUserAndDay } from "../api/models/reservation-models";

const { user, restaurant, rating, category, dishes } = client;

export const checkIfRestaurantExists = async (restaurant_name: string): Promise<boolean> => {
	return !!(await restaurant.findUnique({ where: { name: restaurant_name } }));
};

export const checkIfRatingExists = async (rating_id: string): Promise<boolean> => {
	return !!(await rating.findUnique({ where: { id: rating_id } }));
};

export const checkIfCategoryExists = async (category_id: string): Promise<boolean> => {
	return !!(await category.findUnique({ where: { id: category_id } }));
};

export const checkIfCategoryIsUsed = async (category_id: string): Promise<boolean> => {
	const count = await dishes.count({
		where: {
			category: {
				id: category_id,
			},
		},
	});
	return count > 0;
};

export const checkIfDishExists = async (dish_id: string): Promise<boolean> => {
	return !!(await dishes.findUnique({ where: { id: dish_id } }));
};

export const checkIfUserExists = async (user_id?: string, email?: string): Promise<boolean> => {
	try {
		return !!(await user.findUnique({ where: { id: email ? undefined : user_id, email: email } }));
	} catch (error) {
		console.error("Error in checkIfUserExists", error);
		return false;
	}
};

export const checkIfIsRestaurantAdmin = async (authorization: string, restaurant_id: string): Promise<boolean> => {
	const { email } = verifyToken(authorization);
	const user_query = await user.findUnique({ where: { email: email } });
	const restaurant_query = await restaurant.findUnique({
		where: { id: restaurant_id },
	});
	return user_query?.id === restaurant_query?.admin_id;
};

export const checkIfIsRatingOwner = async (authorization: string, rating_id: string): Promise<boolean> => {
	const { email } = verifyToken(authorization);
	const user_query = await user.findUnique({ where: { email: email } });
	const rating_query = await rating.findUnique({
		where: { id: rating_id },
	});
	return user_query?.id === rating_query?.user_id;
};

export const checkIfIsUserHasRatedRestaurant = async (user_id: string, restaurant_name: string): Promise<boolean> => {
	const rating_query = await rating.findMany({
		where: {
			user: {
				id: { equals: user_id },
			},
			restaurant: {
				name: { equals: restaurant_name },
			},
		},
	});
	return rating_query.length > 0;
};

export const checkIfThereAreUserReservationsForDate = async (
	user_email: string,
	restaurant_name: string,
	date_of_reservation: Date,
): Promise<boolean> => {
	const reservations = await getReservationByUserAndDay(user_email, restaurant_name, date_of_reservation);
	return reservations.length > 0;
};

export const checkIfIsValidToken = (authorization: string): boolean => {
	const token = authorization.replace("Bearer ", ""); // Remove the "Bearer " prefix

	const decodedToken = jwt.verify(token);
	return decodedToken.exp * 1000 > Date.now();
};

export const checkIfCredentialMatches = async (credentials: UserCredentials): Promise<boolean> => {
	const { email, password } = credentials;
	const user_query = await getUserByEmail(email);
	return password === user_query?.password;
};

export const checkIfRestaurantNameIsUsed = async (restaurant_name: string): Promise<boolean> => {
	const restaurant_query = await restaurant.findUnique({ where: { name: restaurant_name } });
	return !!restaurant_query;
};
