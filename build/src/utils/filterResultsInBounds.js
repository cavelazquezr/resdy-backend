"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterResultsInBounds = void 0;
const filterResultsInBounds = (results, bounds) => {
    const filtered_results = [];
    for (const result of results) {
        const { coordinates } = result.restaurant_information.location;
        const [lng, lat] = coordinates;
        const { sw, ne } = bounds;
        if (lat > sw.swLat && lat < ne.neLat && lng > sw.swLng && lng < ne.neLng) {
            filtered_results.push(result);
        }
    }
    return filtered_results;
};
exports.filterResultsInBounds = filterResultsInBounds;
