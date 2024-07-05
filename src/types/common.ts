import { RestaurantSummary } from "./restaurant";

export interface RestaurantCardOutput<T> {
	id: string;
	name: string;
	status: string | null;
	brand_name: string;
	address: string;
	city: string;
	header_url: string | null;
	restaurant_type: string;
	location: any;
	summary: RestaurantSummary;
	detail: T | null;
	created_at: Date;
	total_bookings: number;
}
