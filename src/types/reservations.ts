import { Reservation } from "@prisma/client";
import { WithUserInfo } from ".";
import { RatingStatsOutput } from "./rating";

export type ReservationOutput = WithUserInfo<Reservation>;
export type ReservationProps = Partial<Reservation>;
export type ReservationCreateInput = Pick<Reservation, "number_of_person" | "date_of_reservation">;
export type ReservationUpdateInput = Pick<Reservation, "status">;

export interface MyReservationsQueryParams {
	status?: string;
	city?: string;
	search?: string;
}

export interface MyReservationOutput {
	name: string;
	city?: string;
	address?: string;
	rating_info?: RatingStatsOutput;
	header_url?: string;
	brand_name?: string;
	restaurant_type?: string;
}
