import { Prisma } from "@prisma/client";

export interface WebOutput {
	id?: string;
	name?: string;
	phone?: string;
	address?: string;
	country?: string;
	city?: string;
	restaurantType?: string;
	location?: Prisma.JsonObject;
	priceAverage: number;
	ratings?: number;
	ratingStarts?: number;
}

export interface RestaurantRatingsRecord {
	authorId: string; //id of the user
	authorRating: number; //from 1 to 5
	authorComment: string;
}
