import { User } from "@prisma/client";

export type UserOutput = Omit<User, "password">;
export type UserProps = Partial<User>;
export type UserCreateInput = Pick<User, "email" | "firstname" | "lastname" | "password" | "is_owner">;
export type UserUpdateInput = Partial<Pick<User, "email" | "firstname" | "lastname" | "password" | "is_owner">>;
export type UserInfo = Pick<User, "firstname" | "lastname" | "avatar_url">;

export interface UserCredentials {
	email: string;
	password: string;
	remember?: boolean;
}
