import { UserInfo } from "./user";

export type OrderSpec = Record<string, "asc" | "desc">;

export type WithIsUsed<T> = T & {
	is_used: boolean;
};

export type WithHide<T> = T & {
	hide?: boolean;
};

export type WithUserInfo<T> = T & {
	user: UserInfo;
};

export type NonNullableProperties<T> = {
	[P in keyof T]: NonNullable<T[P]>;
};

export type ResultsSummary<T> = {
	count: number;
	options: Array<string>;
	results: Array<T>;
};
