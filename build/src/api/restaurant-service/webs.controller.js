"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestaurantController = void 0;
const tslib_1 = require("tslib");
const tsoa_1 = require("tsoa");
const webs_model_get_1 = require("./webs.model.get");
const webs_model_post_1 = require("./webs.model.post");
const webs_model_delete_1 = require("./webs.model.delete");
let RestaurantController = class RestaurantController extends tsoa_1.Controller {
    async getRestaurant(unauthorizedCallback, name, city, restaurant_type, country) {
        return (0, webs_model_get_1.getRestaurantHandler)(unauthorizedCallback, name, city, restaurant_type, country);
    }
    async postRestaurant(authorization, restaurant, unauthorizedCallback) {
        return (0, webs_model_post_1.postRestaurantHandler)(authorization, restaurant, unauthorizedCallback);
    }
    //Endpoint a desarrollar 😁
    async deleteWeb() {
        return (0, webs_model_delete_1.deleteRestaurantHandler)();
    }
};
exports.RestaurantController = RestaurantController;
tslib_1.__decorate([
    (0, tsoa_1.Get)(),
    tslib_1.__param(0, (0, tsoa_1.Res)()),
    tslib_1.__param(1, (0, tsoa_1.Query)()),
    tslib_1.__param(2, (0, tsoa_1.Query)()),
    tslib_1.__param(3, (0, tsoa_1.Query)()),
    tslib_1.__param(4, (0, tsoa_1.Query)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Function, String, String, String, String]),
    tslib_1.__metadata("design:returntype", Promise)
], RestaurantController.prototype, "getRestaurant", null);
tslib_1.__decorate([
    (0, tsoa_1.Post)(),
    tslib_1.__param(0, (0, tsoa_1.Header)()),
    tslib_1.__param(1, (0, tsoa_1.Body)()),
    tslib_1.__param(2, (0, tsoa_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object, Function]),
    tslib_1.__metadata("design:returntype", Promise)
], RestaurantController.prototype, "postRestaurant", null);
tslib_1.__decorate([
    (0, tsoa_1.Delete)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], RestaurantController.prototype, "deleteWeb", null);
exports.RestaurantController = RestaurantController = tslib_1.__decorate([
    (0, tsoa_1.Tags)("Restaurant service"),
    (0, tsoa_1.Route)("restaurant")
], RestaurantController);
