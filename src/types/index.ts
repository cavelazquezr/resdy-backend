export type OrderSpec = Record<string, "asc" | "desc">;

export type WithIsUsed<T> = T & {
	is_used: boolean;
};

export type WithHide<T> = T & {
	hide?: boolean;
};
