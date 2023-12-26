import { Prisma } from "@prisma/client";

export interface UserOutput {
	id: string;
	email: string;
	firstname: string;
	lastname: string;
	password: string;
	dateCreated: Date;
	isActive: boolean;
}

export interface CreateUserInput {
	email: string;
	firstname: string;
	lastname: string;
	password: string;
	is_owner: boolean;
}

export interface UpdateUserInput {
	id: string;
	email?: string;
	firstname?: string;
	lastname?: string;
	password?: string;
}

export interface UserCredentials {
	email: string;
	password: string;
}
