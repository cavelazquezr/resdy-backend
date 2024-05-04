import { Customization, Prisma, Restaurant, RestaurantInformation } from "@prisma/client";

export type RestaurantOutput = Restaurant;
export type CustomizationOutput = Customization;
export type InformationOutput = RestaurantInformation;

export interface RestaurantRecord
	extends Pick<
			InformationOutput,
			"phone" | "address" | "country" | "city" | "restaurant_type" | "description" | "location"
		>,
		Pick<RestaurantOutput, "name">,
		Pick<CustomizationOutput, "header_url"> {
	brand_name: string | null;
	price_average: number;
	rating: number;
	rating_count: number;
}

export type RestaurantCardRecord = Pick<
	RestaurantRecord,
	| "name"
	| "brand_name"
	| "address"
	| "price_average"
	| "header_url"
	| "rating"
	| "rating_count"
	| "city"
	| "country"
	| "restaurant_type"
>;

export type LandingRestaurantInfo = {
	[category: string]: Array<RestaurantCardRecord>;
};

export interface CreateRestaurantInput {
	name: string;
	customization?: Prisma.CustomizationCreateWithoutRestaurantInput;
	restaurant_information?: Prisma.RestaurantInformationCreateWithoutRestaurantInput;
}

export type RestaurantRatingsRecord = {
	user_id: string; //id of the user
	rating: number; //from 1 to 5
	comment: string;
};

export type GetRestaurantsQueryParams = {
	name?: string;
	city?: string;
	restaurant_type?: string;
	country?: string;
};
