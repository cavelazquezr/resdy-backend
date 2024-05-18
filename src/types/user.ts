import { User } from "@prisma/client";

export type UserOutput = User;
export type UserRecord = Omit<UserOutput, "password"> & { avatar_url: string };
export type UserProps = Partial<User>;
export type UserCreateInput = Pick<User, "email" | "firstname" | "lastname" | "password" | "is_owner">;
export type UserUpdateInput = Partial<
	Pick<User, "email" | "firstname" | "lastname" | "password" | "phone">
>;
export type UserInfo = Pick<UserRecord, "firstname" | "lastname" | "avatar_url">;

export interface UserCredentials {
	email: string;
	password: string;
	remember?: boolean;
}
