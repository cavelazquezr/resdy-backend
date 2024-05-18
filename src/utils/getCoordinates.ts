import axios from "axios";
import { MAPBOX_ACCESS_KEY } from "../config";
import { Point } from "geojson";

type GetCoordinatesArgs = {
	city: string;
	address: string;
	country: string;
	postcode?: string;
};

export const getCoordinates = async (args: GetCoordinatesArgs): Promise<Point | null> => {
	const { city, address, country, postcode = "28013" } = args;
	const query = `${address}, ${postcode}, ${city}, ${country}`;
	const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
		query,
	)}.json?access_token=${MAPBOX_ACCESS_KEY}`;

	try {
		const response = await axios.get(url);

		const features = response.data.features;
		if (!features.length) {
			return null;
		}

		const mainFeature = features[0];
		const geoJsonPoint: Point = {
			type: "Point",
			coordinates: mainFeature.center,
		};

		return geoJsonPoint;
	} catch (error) {
		console.error("Error fetching data from Mapbox API:", error);
		return null;
	}
};
