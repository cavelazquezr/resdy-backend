import { Point } from "geojson";

export type BoundRecord = {
	sw: {
		swLat: number;
		swLng: number;
	};
	ne: {
		neLat: number;
		neLng: number;
	};
};

export const filterResultsInBounds = (results: any, bounds: BoundRecord) => {
	const filtered_results: any = [];
	for (const result of results) {
		const { coordinates } = result.restaurant_information.location as Point;
		const [lng, lat] = coordinates;
		const { sw, ne } = bounds;
		if (lat > sw.swLat && lat < ne.neLat && lng > sw.swLng && lng < ne.neLng) {
			filtered_results.push(result);
		}
	}
	return filtered_results;
};
