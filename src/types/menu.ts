import { Decimal } from "@prisma/client/runtime/library";

export interface DishOutput {
	id: string;
	name: string;
	price: Decimal;
	photo_url?: string;
	description?: string;
	allergen?: string[];
}

export interface CreateDishInput {
	id?: string;
	name: string;
	photo_url?: string;
	price: number;
	description?: string;
	allergen?: string;
}

export interface UpdateCategoryInput {
	label: string;
}

export interface MenuOutput {
	category: string;
	dishes: DishOutput[];
}
