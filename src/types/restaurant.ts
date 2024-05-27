import { Customization, Prisma, Restaurant, RestaurantInformation } from "@prisma/client";
import { UserOutput } from "./user";
import { NonNullableProperties } from ".";
import { MapBoundsRecord } from "./map";

export type RestaurantOutput = Restaurant;
export type CustomizationOutput = Customization;
export type InformationOutput = RestaurantInformation;

export type RestaurantProps = NonNullableProperties<RestaurantOutput>;
export type CustomizationProps = NonNullableProperties<CustomizationOutput>;
export type InformationProps = NonNullableProperties<InformationOutput>;

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

//For restaurant creation
type AdministratorInput = Pick<UserOutput, "email" | "password">;
type RestaurantInput = Pick<RestaurantProps, "name">;
type InformationInput = Pick<InformationProps, "phone" | "address" | "country" | "city" | "restaurant_type">;

export type RestaurantCreateInput = AdministratorInput &
	RestaurantInput &
	InformationInput & { brand_name: CustomizationOutput["name"] };

export interface CreateRestaurantInput {
	name: string;
	customization?: Prisma.CustomizationCreateWithoutRestaurantInput;
	restaurant_information?: Prisma.RestaurantInformationCreateWithoutRestaurantInput;
}

export type RestaurantSummary = {
	rating: number;
	rating_count: number;
	price_average: number;
};

export type GetRestaurantsQueryParams = {
	name?: string;
	city?: string;
	restaurant_type?: string;
	country?: string;
};

export interface GetDiscoveryRestaurantsQueryParams {
	city?: string;
	country?: string;
	swLat?: number;
	swLng?: number;
	neLat?: number;
	neLng?: number;
	restaurant_type?: string;
	sortBy?: SortRestaurantBy;
}

export type SortRestaurantBy = 'rating' | 'visits' | 'new';