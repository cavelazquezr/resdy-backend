"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCoordinates = void 0;
const tslib_1 = require("tslib");
const axios_1 = tslib_1.__importDefault(require("axios"));
const config_1 = require("../config");
const getCoordinates = async (args) => {
    const { city, address, country, postal_code } = args;
    const query = `${address}, ${postal_code}, ${city}, ${country}`;
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?access_token=${config_1.MAPBOX_ACCESS_KEY}`;
    try {
        const response = await axios_1.default.get(url);
        const features = response.data.features;
        if (!features.length) {
            return null;
        }
        const mainFeature = features[0];
        const geoJsonPoint = {
            type: "Point",
            coordinates: mainFeature.center,
        };
        return geoJsonPoint;
    }
    catch (error) {
        console.error("Error fetching data from Mapbox API:", error);
        return null;
    }
};
exports.getCoordinates = getCoordinates;
