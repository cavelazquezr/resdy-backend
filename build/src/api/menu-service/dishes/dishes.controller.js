"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DishesController = void 0;
const tslib_1 = require("tslib");
const tsoa_1 = require("tsoa");
const dishes_model_get_1 = require("./dishes.model.get");
const dishes_model_post_1 = require("./dishes.model.post");
let DishesController = class DishesController extends tsoa_1.Controller {
    async getDishes(restaurant_id, unauthorizedCallback) {
        return (0, dishes_model_get_1.getDishesHandler)(restaurant_id, unauthorizedCallback);
    }
    async postDishes(authorization, restaurant_id, category_id, dish, unauthorizedCallback) {
        return (0, dishes_model_post_1.postDishesHandler)(authorization, restaurant_id, category_id, dish, unauthorizedCallback);
    }
};
exports.DishesController = DishesController;
tslib_1.__decorate([
    (0, tsoa_1.Get)("/dishes/{restaurant_id}"),
    tslib_1.__param(0, (0, tsoa_1.Path)()),
    tslib_1.__param(1, (0, tsoa_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Function]),
    tslib_1.__metadata("design:returntype", Promise)
], DishesController.prototype, "getDishes", null);
tslib_1.__decorate([
    (0, tsoa_1.Post)("/dishes/{restaurant_id}/{category_id}"),
    tslib_1.__param(0, (0, tsoa_1.Header)()),
    tslib_1.__param(1, (0, tsoa_1.Path)()),
    tslib_1.__param(2, (0, tsoa_1.Path)()),
    tslib_1.__param(3, (0, tsoa_1.Body)()),
    tslib_1.__param(4, (0, tsoa_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, String, Object, Function]),
    tslib_1.__metadata("design:returntype", Promise)
], DishesController.prototype, "postDishes", null);
exports.DishesController = DishesController = tslib_1.__decorate([
    (0, tsoa_1.Tags)("Menu service"),
    (0, tsoa_1.Route)("webs")
], DishesController);
