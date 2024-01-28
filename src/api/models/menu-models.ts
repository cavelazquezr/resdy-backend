import { client } from "../../config/client";

const { category } = client;

export const getRestaurantCategoriesWithDishes = async (restaurant_name: string) => {
	const query = await category.findMany({
		where: {
			is_active: true,
			restaurant: {
				name: restaurant_name,
			},
			dishes: {
				some: {
					is_active: true,
				},
			},
		},
		select: {
			label: true,
			dishes: {
				select: {
					name: true,
					price: true,
					description: true,
					photo_url: true,
					allergen: true,
				},
			},
		},
	});
	return query;
};
