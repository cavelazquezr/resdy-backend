"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestaurantController = void 0;
const tslib_1 = require("tslib");
const tsoa_1 = require("tsoa");
const restaurant_services_1 = require("../services/restaurant-services");
const restaurant_validations_1 = require("../validations/restaurant-validations");
let RestaurantController = class RestaurantController extends tsoa_1.Controller {
    async getRestaurant(name, city, restaurant_type, country) {
        const query_params = {
            name,
            city,
            restaurant_type,
            country,
        };
        return (0, restaurant_services_1.getRestaurantsService)(query_params);
    }
    async updateRestaurant(authorization, restaurant_id, restaurant_input) {
        await (0, restaurant_validations_1.updateRestaurantValidations)(authorization, restaurant_id);
        return (0, restaurant_services_1.updateRestaurantService)(restaurant_id, restaurant_input);
    }
    async getMyRestaurant(authorization) {
        return (0, restaurant_services_1.getMyRestaurantService)(authorization);
    }
    async getLandingRestaurant(city, country) {
        const query_params = {
            city,
            country,
        };
        return (0, restaurant_services_1.getLandingRestaurantsService)(query_params);
    }
    async getDiscoverRestaurant(city, country, swLat, swLng, neLat, neLng, restaurant_type, sortBy) {
        const query_params = {
            city,
            country,
            swLat,
            swLng,
            neLat,
            neLng,
            restaurant_type,
            sortBy,
        };
        return (0, restaurant_services_1.getDiscoveryRestaurants)(query_params);
    }
    async createRestaurant(restaurant) {
        await (0, restaurant_validations_1.createRestaurantValidations)(restaurant);
        return (0, restaurant_services_1.createRestaurantService)(restaurant);
    }
};
exports.RestaurantController = RestaurantController;
tslib_1.__decorate([
    (0, tsoa_1.Get)(),
    tslib_1.__param(0, (0, tsoa_1.Query)()),
    tslib_1.__param(1, (0, tsoa_1.Query)()),
    tslib_1.__param(2, (0, tsoa_1.Query)()),
    tslib_1.__param(3, (0, tsoa_1.Query)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, String, String]),
    tslib_1.__metadata("design:returntype", Promise)
], RestaurantController.prototype, "getRestaurant", null);
tslib_1.__decorate([
    (0, tsoa_1.Put)("{restaurant_id}"),
    tslib_1.__param(0, (0, tsoa_1.Header)()),
    tslib_1.__param(1, (0, tsoa_1.Path)()),
    tslib_1.__param(2, (0, tsoa_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], RestaurantController.prototype, "updateRestaurant", null);
tslib_1.__decorate([
    (0, tsoa_1.Get)("myRestaurant"),
    tslib_1.__param(0, (0, tsoa_1.Header)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], RestaurantController.prototype, "getMyRestaurant", null);
tslib_1.__decorate([
    (0, tsoa_1.Get)("landing"),
    tslib_1.__param(0, (0, tsoa_1.Query)()),
    tslib_1.__param(1, (0, tsoa_1.Query)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String]),
    tslib_1.__metadata("design:returntype", Promise)
], RestaurantController.prototype, "getLandingRestaurant", null);
tslib_1.__decorate([
    (0, tsoa_1.Get)("discover"),
    tslib_1.__param(0, (0, tsoa_1.Query)()),
    tslib_1.__param(1, (0, tsoa_1.Query)()),
    tslib_1.__param(2, (0, tsoa_1.Query)()),
    tslib_1.__param(3, (0, tsoa_1.Query)()),
    tslib_1.__param(4, (0, tsoa_1.Query)()),
    tslib_1.__param(5, (0, tsoa_1.Query)()),
    tslib_1.__param(6, (0, tsoa_1.Query)()),
    tslib_1.__param(7, (0, tsoa_1.Query)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, Number, Number, Number, Number, String, String]),
    tslib_1.__metadata("design:returntype", Promise)
], RestaurantController.prototype, "getDiscoverRestaurant", null);
tslib_1.__decorate([
    (0, tsoa_1.Post)(),
    tslib_1.__param(0, (0, tsoa_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], RestaurantController.prototype, "createRestaurant", null);
exports.RestaurantController = RestaurantController = tslib_1.__decorate([
    (0, tsoa_1.Tags)("Restaurant service"),
    (0, tsoa_1.Route)("restaurant")
], RestaurantController);
