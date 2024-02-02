"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DishesController = void 0;
const tslib_1 = require("tslib");
const tsoa_1 = require("tsoa");
const dish_services_1 = require("../services/dish-services");
const dish_validations_1 = require("../validations/dish-validations");
let DishesController = class DishesController extends tsoa_1.Controller {
    async getDishes(restaurant_name, notFoundCallback) {
        await (0, dish_validations_1.getDishesValidations)(restaurant_name, notFoundCallback);
        return (0, dish_services_1.getDishesService)(restaurant_name);
    }
    async postDishes(authorization, restaurant_name, category_id, dish_input, unauthorizedCallback, notFoundCallback) {
        await (0, dish_validations_1.postDishesValidations)(authorization, category_id, unauthorizedCallback, notFoundCallback);
        return (0, dish_services_1.postDishesService)(restaurant_name, category_id, dish_input);
    }
    async putDish(authorization, dish_id, dish_input, unauthorizedCallback, notFoundCallback, unprocessableCallback) {
        await (0, dish_validations_1.updateDishValidation)(authorization, dish_id, dish_input, unauthorizedCallback, notFoundCallback, unprocessableCallback);
        return (0, dish_services_1.updateDishService)(dish_id, dish_input);
    }
    async deleteDish(authorization, body_params, unauthorizedCallback, notFoundCallback) {
        const { dish_ids } = body_params;
        await (0, dish_validations_1.deleteDishValidation)(authorization, dish_ids, unauthorizedCallback, notFoundCallback);
        return (0, dish_services_1.deleteDishesService)(dish_ids);
    }
};
exports.DishesController = DishesController;
tslib_1.__decorate([
    (0, tsoa_1.Get)("{restaurant_name}"),
    tslib_1.__param(0, (0, tsoa_1.Path)()),
    tslib_1.__param(1, (0, tsoa_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Function]),
    tslib_1.__metadata("design:returntype", Promise)
], DishesController.prototype, "getDishes", null);
tslib_1.__decorate([
    (0, tsoa_1.Post)("{restaurant_name}/{category_id}"),
    tslib_1.__param(0, (0, tsoa_1.Header)()),
    tslib_1.__param(1, (0, tsoa_1.Path)()),
    tslib_1.__param(2, (0, tsoa_1.Path)()),
    tslib_1.__param(3, (0, tsoa_1.Body)()),
    tslib_1.__param(4, (0, tsoa_1.Res)()),
    tslib_1.__param(5, (0, tsoa_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, String, Object, Function, Function]),
    tslib_1.__metadata("design:returntype", Promise)
], DishesController.prototype, "postDishes", null);
tslib_1.__decorate([
    (0, tsoa_1.Put)("{dish_id}"),
    tslib_1.__param(0, (0, tsoa_1.Header)()),
    tslib_1.__param(1, (0, tsoa_1.Path)()),
    tslib_1.__param(2, (0, tsoa_1.Body)()),
    tslib_1.__param(3, (0, tsoa_1.Res)()),
    tslib_1.__param(4, (0, tsoa_1.Res)()),
    tslib_1.__param(5, (0, tsoa_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, Object, Function, Function, Function]),
    tslib_1.__metadata("design:returntype", Promise)
], DishesController.prototype, "putDish", null);
tslib_1.__decorate([
    (0, tsoa_1.Delete)(),
    tslib_1.__param(0, (0, tsoa_1.Header)()),
    tslib_1.__param(1, (0, tsoa_1.Body)()),
    tslib_1.__param(2, (0, tsoa_1.Res)()),
    tslib_1.__param(3, (0, tsoa_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object, Function, Function]),
    tslib_1.__metadata("design:returntype", Promise)
], DishesController.prototype, "deleteDish", null);
exports.DishesController = DishesController = tslib_1.__decorate([
    (0, tsoa_1.Tags)("Dishes service"),
    (0, tsoa_1.Route)("dishes")
], DishesController);
