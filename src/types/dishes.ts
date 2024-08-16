import { Dishes } from "@prisma/client";
import { WithHide } from ".";
import { CategoryOutput } from "./categories";

export type DishOutput = Dishes & { category: CategoryOutput };
export type DishProps = Partial<DishOutput>;
export type DishCreateInput = Pick<DishOutput, "name" | "photo_url" | "allergen" | "price" | "description">;
export type DishUpdateInput = WithHide<
	Partial<Pick<DishProps, "name" | "photo_url" | "allergen" | "price" | "description">>
>;
export type DishesByCategoryOutput = { category: string; dishes: Omit<DishOutput, "category">[] };
