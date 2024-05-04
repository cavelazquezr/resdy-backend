import { GetRestaurantsQueryParams, RestaurantCardRecord } from "../../types/restaurant";
import client from "../../config/client";

const { restaurant } = client;

export const getCurrentRestaurantInfoByName = async (restaurant_name: string) => {
	const query = await restaurant.findUnique({
		where: {
			name: restaurant_name,
		},
	});
	return query;
};

type OrderBy =
	| {
			[table: string]: Record<string, "asc" | "desc">;
	  }
	| Record<string, "asc" | "desc">;

export const getRestaurants = async (query_params: GetRestaurantsQueryParams, limit?: number, orderBy?: OrderBy) => {
	const { name, city, country, restaurant_type } = query_params;
	const query = await restaurant.findMany({
		take: limit ? limit : undefined,
		select: {
			id: true,
			name: true,
			restaurant_information: {
				select: {
					city: true,
					country: true,
					phone: true,
					address: true,
					restaurant_type: true,
					location: true,
					description: true,
				},
			},
			customization: {
				select: {
					name: true,
					header_url: true,
				},
			},
			dishes: true,
			ratings: true,
		},
		where: {
			name: { equals: name, mode: "insensitive" },
			restaurant_information: {
				city: { contains: city, mode: "insensitive" },
				country: { contains: country, mode: "insensitive" },
				restaurant_type: { contains: restaurant_type, mode: "insensitive" },
			},
		},
		orderBy: orderBy,
	});
	return query;
};

export const getRestaurantsByRating = async (query_params: GetRestaurantsQueryParams, limit?: number) => {
	const { city, country } = query_params;

	const restaurants: Array<RestaurantCardRecord> = await client.$queryRaw`
        SELECT
		r.name,
		c.name AS brand_name,
		ri.address,
		ri.country,
		ri.city,
		ri.restaurant_type,
		c.header_url,
		COALESCE(AVG(d.price), 0)::numeric AS price_average,
		COALESCE(AVG(rt.rating), 0)::numeric AS rating,
		COUNT(rt.rating)::numeric AS rating_count
        FROM restaurant.restaurants r
        LEFT JOIN rating.rating rt ON r.id = rt.restaurant_id
        LEFT JOIN restaurant.restaurant_information ri ON r.id = ri.restaurant_id
		LEFT JOIN restaurant.customization c ON r.id = c.restaurant_id
		LEFT JOIN menu.dish d ON r.id = d.restaurant_id
        AND ri.city ILIKE ${city}
        AND ri.country ILIKE ${country}
        GROUP BY
		r.id,
		c.name,
		ri.address,
		ri.country,
		ri.city,
		ri.restaurant_type,
		c.header_url
        ORDER BY rating DESC
        LIMIT ${limit ? limit : -1}
    `;

	return restaurants;
};
