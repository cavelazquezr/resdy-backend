import { Category } from "@prisma/client";
import { WithHide } from ".";

export type CategoryOutput = Category;
export type CategoryProps = Partial<Category>;
export type CategoryCreateInput = Pick<Category, "label">;
export type CategoryUpdateInput = WithHide<Partial<Pick<CategoryProps, "label">>>;
