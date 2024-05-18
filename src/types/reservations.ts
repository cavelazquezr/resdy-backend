import { Reservation } from "@prisma/client";
import { WithUserInfo } from ".";

export type ReservationOutput = WithUserInfo<Reservation>;
export type ReservationProps = Partial<Reservation>;
export type ReservationDetailOutput = Pick<Reservation, "number_of_person" | "date_of_reservation">;
export type ReservationCreateInput = ReservationDetailOutput;
export type ReservationUpdateInput = Pick<Reservation, "status">;

export interface MyReservationsQueryParams {
	status?: string;
	city?: string;
	search?: string;
	start_date?: string;
	end_date?: string;
}
