import { Category } from "@prisma/client";
import { WithHide } from ".";

export type CategoryOutput = Category;
export type CategoryProps = Partial<CategoryOutput>;
export type CategoryCreateInput = Pick<CategoryOutput, "label">;
export type CategoryUpdateInput = WithHide<Partial<Pick<CategoryProps, "label">>>;
