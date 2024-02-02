"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestaurantController = void 0;
const tslib_1 = require("tslib");
const tsoa_1 = require("tsoa");
const restaurant_services_1 = require("../services/restaurant-services");
let RestaurantController = class RestaurantController extends tsoa_1.Controller {
    async getRestaurant(name, city, restaurant_type, country, sort) {
        const query_params = {
            name,
            city,
            restaurant_type,
            country,
        };
        return (0, restaurant_services_1.getRestaurantsService)(query_params);
    }
};
exports.RestaurantController = RestaurantController;
tslib_1.__decorate([
    (0, tsoa_1.Get)(),
    tslib_1.__param(0, (0, tsoa_1.Query)()),
    tslib_1.__param(1, (0, tsoa_1.Query)()),
    tslib_1.__param(2, (0, tsoa_1.Query)()),
    tslib_1.__param(3, (0, tsoa_1.Query)()),
    tslib_1.__param(4, (0, tsoa_1.Query)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, String, String, String]),
    tslib_1.__metadata("design:returntype", Promise)
], RestaurantController.prototype, "getRestaurant", null);
exports.RestaurantController = RestaurantController = tslib_1.__decorate([
    (0, tsoa_1.Tags)("Restaurant service"),
    (0, tsoa_1.Route)("restaurant")
], RestaurantController);
