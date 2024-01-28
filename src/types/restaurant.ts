import { Prisma } from "@prisma/client";

export interface RestaurantOutput {
	name?: string;
	brand_name?: string;
	phone?: string;
	address?: string;
	country?: string;
	city?: string;
	restaurant_type?: string;
	description?: string;
	location?: Prisma.JsonObject;
	price_average: number;
	rating?: number;
	rating_count?: number;
}

export interface CreateRestaurantInput {
	name: string;
	customization?: Prisma.CustomizationCreateWithoutRestaurantInput;
	restaurant_information?: Prisma.RestaurantInformationCreateWithoutRestaurantInput;
}

export interface RestaurantRatingsRecord {
	user_id: string; //id of the user
	rating: number; //from 1 to 5
	comment: string;
}

export interface GetRestaurantsQueryParams {
	name?: string;
	city?: string;
	restaurant_type?: string;
	country?: string;
}
