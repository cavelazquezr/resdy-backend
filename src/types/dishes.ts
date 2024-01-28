import { Dishes } from "@prisma/client";
import { WithHide } from ".";

export type DishOutput = Dishes;
export type DishProps = Partial<Dishes>;
export type CreateDishInput = Pick<Dishes, "name" | "photo_url" | "allergen" | "price" | "description">;
export type DishUpdateInput = WithHide<
	Partial<Pick<DishProps, "name" | "photo_url" | "allergen" | "price" | "description">>
>;
export type DishesByCategoryOutput = { category: string; dishes: DishOutput[] };
