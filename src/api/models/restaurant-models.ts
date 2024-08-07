import {
	GetDiscoveryRestaurantsQueryParams,
	GetRestaurantsQueryParams,
	RestaurantCardRecord,
	RestaurantCreateInput,
	RestaurantOutput,
	UpdateRestaurantInput,
} from "../../types/restaurant";
import client from "../../config/client";
import { calculatePriceAverage, calculateRatingAverage } from "../../utils";
import { Prisma } from "@prisma/client";
import { getObjectSignedUrl } from "../../services/aws/s3";

const { restaurant, restaurantInformation } = client;

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

export const getRestaurants = async (
	query_params: GetRestaurantsQueryParams & GetDiscoveryRestaurantsQueryParams & { email?: string },
	limit?: number,
	orderBy?: OrderBy,
) => {
	const { name, city, country, restaurant_type, swLat, swLng, neLat, neLng, email } = query_params;
	const query = await restaurant.findMany({
		take: limit ? limit : undefined,
		select: {
			id: true,
			name: true,
			created_at: true,
			restaurant_information: {
				select: {
					city: true,
					country: true,
					phone: true,
					address: true,
					restaurant_type: true,
					location: true,
					description: true,
					postal_code: true,
					extra_information: true,
					social_media: true,
				},
			},
			customization: {
				select: {
					name: true,
					headers_path: true,
					extra_customization: true,
				},
			},
			restaurant_stadistic: true,
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
			admin: {
				email: email,
			},
		},
		orderBy: orderBy,
	});
	return query;
};

export const getRestaurantsByRating = async (query_params: GetRestaurantsQueryParams, limit?: number) => {
	const { city, country } = query_params;

	const restaurants = await client.$queryRaw<Array<RestaurantCardRecord>>`
        SELECT
			r.name,
			c.name AS brand_name,
			ri.address,
			ri.country,
			ri.city,
			ri.restaurant_type,
			c.headers_path,
			COALESCE(AVG(d.price), 0)::numeric AS price_average,
			COALESCE(AVG(rt.rating), 0)::numeric AS rating,
			COUNT(rt.rating)::numeric AS rating_count
        FROM
			restaurant.restaurants r
        LEFT JOIN 
			rating.rating rt ON r.id = rt.restaurant_id
        LEFT JOIN 
			restaurant.restaurant_information ri ON r.id = ri.restaurant_id
		LEFT JOIN 
			restaurant.customization c ON r.id = c.restaurant_id
		LEFT JOIN 
			menu.dish d ON r.id = d.restaurant_id
        AND
			ri.city ILIKE ${city}
        AND
			ri.country ILIKE ${country}
        GROUP BY
			r.id,
			c.name,
			ri.address,
			ri.country,
			ri.city,
			ri.restaurant_type,
			c.headers_path
        ORDER BY rating DESC
        LIMIT ${limit ? limit : -1}
    `;

	const restaurantPromises = restaurants.map(async (restaurant) => {
		const headersUrlPromises = restaurant
			? restaurant.headers_path.map((path: string) => {
					return getObjectSignedUrl(path);
				})
			: [];

		const headers_url = await Promise.all(headersUrlPromises);

		return { ...restaurant, headers_url };
	});

	return await Promise.all(restaurantPromises);
};

export const getRestaurantSummary = async (restaurant_id: string) => {
	const query = await client.restaurant.findUnique({
		where: {
			id: restaurant_id,
		},
		select: {
			ratings: {
				where: {
					status: "finished",
				},
			},
			dishes: true,
		},
	});

	if (query) {
		const price_average = calculatePriceAverage(query.dishes);
		const rating_average = calculateRatingAverage(query.ratings);
		return {
			price_average,
			rating: rating_average,
			rating_count: query.ratings.length,
		};
	} else {
		return {
			price_average: 0,
			rating: 0,
			rating_count: 0,
		};
	}
};

export const createRestaurant = async (
	payload: RestaurantCreateInput & { location: Prisma.InputJsonValue },
): Promise<RestaurantOutput> => {
	const query = await client.$transaction(async (tx) => {
		const user = await tx.user.create({
			data: {
				email: payload.email,
				password: payload.password,
				firstname: payload.brand_name ?? "Admin",
				is_owner: true,
				avatar_path: payload.avatar_path,
			},
		});
		const restaurant = await tx.restaurant.create({
			data: {
				name: payload.name,
				admin_id: user.id,
			},
		});
		await tx.customization.create({
			data: {
				name: payload.brand_name,
				restaurant_id: restaurant.id,
			},
		});
		await tx.restaurantInformation.create({
			data: {
				restaurant_id: restaurant.id,
				phone: payload.phone,
				postal_code: payload.postal_code,
				address: payload.address,
				country: payload.country,
				city: payload.city,
				restaurant_type: payload.restaurant_type,
				location: payload.location,
			},
		});
		await tx.restaurantStadistics.create({
			data: {
				total_bookings: 0,
				restaurant_id: restaurant.id,
			},
		});

		return restaurant;
	});

	return query;
};

export const updateRestaurant = async (
	restaurant_id: string,
	payload: Partial<UpdateRestaurantInput> & { location: Prisma.InputJsonValue },
) => {
	const query = await client.$transaction(async (tx) => {
		const restaurant = await tx.restaurant.update({
			where: {
				id: restaurant_id,
			},
			data: {
				name: payload.name,
			},
		});
		await tx.customization.update({
			where: {
				restaurant_id,
			},
			data: {
				name: payload.brand_name,
				headers_path: payload.headers,
			},
		});
		await tx.restaurantInformation.update({
			where: {
				restaurant_id,
			},
			data: {
				phone: payload.phone,
				postal_code: payload.postal_code,
				address: payload.address,
				description: payload.description,
				country: payload.country,
				city: payload.city,
				restaurant_type: payload.restaurant_type,
				location: payload.location,
				extra_information: {
					extra_description: payload.extra_description,
				},
				social_media: {
					instagram: payload.instagram,
					twitter: payload.twitter,
					tiktok: payload.tiktok,
					facebook: payload.facebook,
				},
			},
		});

		return restaurant;
	});

	return query;
};

export const getAllRestaurantTypes = async () => {
	const query = await client.restaurantInformation
		.findMany({
			distinct: ["restaurant_type"],
			select: {
				restaurant_type: true,
			},
		})
		.then((res) => res.filter((information) => information !== null).map((information) => information.restaurant_type));
	return query as string[];
};
