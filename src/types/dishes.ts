import { Dishes } from "@prisma/client";
import { WithHide } from ".";

export type DishOutput = Dishes;
export type DishProps = Partial<DishOutput>;
export type DishCreateInput = Pick<DishOutput, "name" | "photo_url" | "allergen" | "price" | "description">;
export type DishUpdateInput = WithHide<
	Partial<Pick<DishProps, "name" | "photo_url" | "allergen" | "price" | "description">>
>;
export type DishesByCategoryOutput = { category: string; dishes: DishOutput[] };
