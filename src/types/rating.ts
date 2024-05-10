import { Rating } from "@prisma/client";

export type RatingsOutput = Rating;
export type RatingRecord = Omit<RatingsOutput, "user_id" | "updated_at" | "restaurant_id"> & {
	user_info: UserRatingOutput;
	replied_at: RatingsOutput["updated_at"];
};
export type MyRatingInfoRecord = Omit<RatingRecord, "user_info" | "restaurant_id" | "id">;
export type RatingUpdateRecord = Pick<RatingRecord, "id" | "title" | "comment" | "rating">;

export interface RatingStatsOutput {
	rating: string;
	rating_count: number;
	stats?: Record<number, number>;
}

export interface MyRatingOutput {
	name: string;
	city?: string;
	address?: string;
	rating_info?: MyRatingInfoRecord;
	header_url?: string;
	brand_name?: string;
	restaurant_type?: string;
}

export interface UserRatingOutput {
	firstname: string;
	lastname?: string;
	avatar_url?: string;
}

export interface MyRatingInfoOutput {
	status: string;
	created_at: Date;
	title?: string;
	comment?: string;
	rating?: number;
	replied_at?: Date;
	answer?: string;
}

export interface MyRatingQueryParams {
	status?: string;
	city?: string;
	search?: string;
}
