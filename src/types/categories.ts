import { Category } from "@prisma/client";
import { WithHide } from ".";

export type CategoryOutput = Category;
export type CategoryProps = Partial<CategoryOutput>;
export type MyCategoriesRecord = Omit<CategoryOutput, "restaurant_id"> & { dishes: number };
export type CategoryCreateInput = Pick<CategoryOutput, "label">;
export type CategoryUpdateInput = Pick<Partial<WithHide<CategoryOutput>>, "hide" | "label">;
