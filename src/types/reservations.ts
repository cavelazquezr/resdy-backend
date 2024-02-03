import { Reservation } from "@prisma/client";
import { WithUserInfo } from ".";

export type ReservationOutput = WithUserInfo<Reservation>;
export type ReservationProps = Partial<Reservation>;
export type ReservationCreateInput = Pick<Reservation, "number_of_person" | "date_of_reservation">;
export type ReservationUpdateInput = Pick<Reservation, "status">;
