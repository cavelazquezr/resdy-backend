import { Decimal } from "@prisma/client/runtime/library";

export interface DishOutput {
	allergen: string[];
	id: string;
	name: string;
	photo_url?: string; // Change here to make it more permissive
	price: Decimal;
	description?: string;
	restaurant_id: string;
	category_id: string;
};

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
