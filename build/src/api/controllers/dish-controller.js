"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DishesController = void 0;
const tslib_1 = require("tslib");
const tsoa_1 = require("tsoa");
const dish_services_1 = require("../services/dish-services");
const dish_validations_1 = require("../validations/dish-validations");
let DishesController = class DishesController extends tsoa_1.Controller {
    async getDishes(restaurant_name) {
        await (0, dish_validations_1.getDishesValidations)(restaurant_name);
        return (0, dish_services_1.getDishesService)(restaurant_name);
    }
    async getMyDishes(authorization) {
        return (0, dish_services_1.getMyDishesService)(authorization);
    }
    async postDishes(authorization, restaurant_name, dish_input) {
        await (0, dish_validations_1.postDishesValidations)(authorization, dish_input);
        return (0, dish_services_1.postDishesService)(restaurant_name, dish_input);
    }
    async putDish(authorization, dish_id, dish_input) {
        await (0, dish_validations_1.updateDishValidation)(authorization, dish_id, dish_input);
        return (0, dish_services_1.updateDishService)(dish_id, dish_input);
    }
    async deleteDish(authorization, dish_id) {
        await (0, dish_validations_1.deleteDishValidation)(authorization, dish_id);
        return (0, dish_services_1.deleteDishesService)(dish_id);
    }
};
exports.DishesController = DishesController;
tslib_1.__decorate([
    (0, tsoa_1.Get)("{restaurant_name}"),
    tslib_1.__param(0, (0, tsoa_1.Path)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], DishesController.prototype, "getDishes", null);
tslib_1.__decorate([
    (0, tsoa_1.Get)("admin/myDishes"),
    tslib_1.__param(0, (0, tsoa_1.Header)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], DishesController.prototype, "getMyDishes", null);
tslib_1.__decorate([
    (0, tsoa_1.Post)("{restaurant_name}"),
    tslib_1.__param(0, (0, tsoa_1.Header)()),
    tslib_1.__param(1, (0, tsoa_1.Path)()),
    tslib_1.__param(2, (0, tsoa_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], DishesController.prototype, "postDishes", null);
tslib_1.__decorate([
    (0, tsoa_1.Put)("{dish_id}"),
    tslib_1.__param(0, (0, tsoa_1.Header)()),
    tslib_1.__param(1, (0, tsoa_1.Path)()),
    tslib_1.__param(2, (0, tsoa_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], DishesController.prototype, "putDish", null);
tslib_1.__decorate([
    (0, tsoa_1.Delete)("{dish_id}"),
    tslib_1.__param(0, (0, tsoa_1.Header)()),
    tslib_1.__param(1, (0, tsoa_1.Path)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String]),
    tslib_1.__metadata("design:returntype", Promise)
], DishesController.prototype, "deleteDish", null);
exports.DishesController = DishesController = tslib_1.__decorate([
    (0, tsoa_1.Tags)("Dishes service"),
    (0, tsoa_1.Route)("dishes")
], DishesController);
