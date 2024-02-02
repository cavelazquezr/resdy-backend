"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesController = void 0;
const tslib_1 = require("tslib");
const tsoa_1 = require("tsoa");
const category_services_1 = require("../services/category-services");
const category_validations_1 = require("../validations/category-validations");
let CategoriesController = class CategoriesController extends tsoa_1.Controller {
    async getRestautantCategories(restaurant_name, notFoundCallback) {
        await (0, category_validations_1.getRestautantCategoriesValidations)(restaurant_name, notFoundCallback);
        return (0, category_services_1.getRestautantCategoriesService)(restaurant_name);
    }
    async postCategory(authorization, restaurant_name, category_input, unauthorizedCallback, notFoundCallback) {
        await (0, category_validations_1.createCategoryValidations)(authorization, restaurant_name, unauthorizedCallback, notFoundCallback);
        return (0, category_services_1.createCategoryService)(restaurant_name, category_input);
    }
    async putCategory(authorization, category_id, category_input, unauthorizedCallback, notFoundCallback, unprocessableCallback) {
        await (0, category_validations_1.updateCategoryValidation)(authorization, category_id, category_input, unauthorizedCallback, notFoundCallback, unprocessableCallback);
        return (0, category_services_1.updateCategoryService)(category_id, category_input);
    }
    async deleteCategory(authorization, body_params, unauthorizedCallback, notFoundCallback, unprocessableCallback) {
        const { category_ids } = body_params;
        await (0, category_validations_1.deleteCategoriesValidation)(authorization, category_ids, unauthorizedCallback, notFoundCallback, unprocessableCallback);
        return (0, category_services_1.deleteCategoriesService)(category_ids);
    }
};
exports.CategoriesController = CategoriesController;
tslib_1.__decorate([
    (0, tsoa_1.Get)("/{restaurant_name}"),
    tslib_1.__param(0, (0, tsoa_1.Path)()),
    tslib_1.__param(1, (0, tsoa_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Function]),
    tslib_1.__metadata("design:returntype", Promise)
], CategoriesController.prototype, "getRestautantCategories", null);
tslib_1.__decorate([
    (0, tsoa_1.Post)("{restaurant_name}"),
    tslib_1.__param(0, (0, tsoa_1.Header)()),
    tslib_1.__param(1, (0, tsoa_1.Path)()),
    tslib_1.__param(2, (0, tsoa_1.Body)()),
    tslib_1.__param(3, (0, tsoa_1.Res)()),
    tslib_1.__param(4, (0, tsoa_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, Object, Function, Function]),
    tslib_1.__metadata("design:returntype", Promise)
], CategoriesController.prototype, "postCategory", null);
tslib_1.__decorate([
    (0, tsoa_1.Put)("{category_id}"),
    tslib_1.__param(0, (0, tsoa_1.Header)()),
    tslib_1.__param(1, (0, tsoa_1.Path)()),
    tslib_1.__param(2, (0, tsoa_1.Body)()),
    tslib_1.__param(3, (0, tsoa_1.Res)()),
    tslib_1.__param(4, (0, tsoa_1.Res)()),
    tslib_1.__param(5, (0, tsoa_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, Object, Function, Function, Function]),
    tslib_1.__metadata("design:returntype", Promise)
], CategoriesController.prototype, "putCategory", null);
tslib_1.__decorate([
    (0, tsoa_1.Delete)(),
    tslib_1.__param(0, (0, tsoa_1.Header)()),
    tslib_1.__param(1, (0, tsoa_1.Body)()),
    tslib_1.__param(2, (0, tsoa_1.Res)()),
    tslib_1.__param(3, (0, tsoa_1.Res)()),
    tslib_1.__param(4, (0, tsoa_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object, Function, Function, Function]),
    tslib_1.__metadata("design:returntype", Promise)
], CategoriesController.prototype, "deleteCategory", null);
exports.CategoriesController = CategoriesController = tslib_1.__decorate([
    (0, tsoa_1.Tags)("Category service"),
    (0, tsoa_1.Route)("category")
], CategoriesController);
