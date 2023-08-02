export interface UserOutput {
	id: string;
	email: string;
	firstname: string;
	lastname: string;
	password: string;
	dateCreated: Date;
	isActive: boolean;
}

export interface UpdateUser {
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
