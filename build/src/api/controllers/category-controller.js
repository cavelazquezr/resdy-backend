"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesController = void 0;
const tslib_1 = require("tslib");
const tsoa_1 = require("tsoa");
const category_services_1 = require("../services/category-services");
const category_validations_1 = require("../validations/category-validations");
let CategoriesController = class CategoriesController extends tsoa_1.Controller {
    async getRestaurantCategories(restaurant_name) {
        await (0, category_validations_1.getRestaurantCategoriesValidations)(restaurant_name);
        return (0, category_services_1.getRestaurantCategoriesService)(restaurant_name);
    }
    async getMyRestaurantCategories(authorization) {
        return (0, category_services_1.getMyRestaurantCategoriesService)(authorization);
    }
    async postCategory(authorization, restaurant_name, category_input) {
        await (0, category_validations_1.createCategoryValidations)(authorization, restaurant_name);
        return (0, category_services_1.createCategoryService)(restaurant_name, category_input);
    }
    async putCategory(authorization, category_id, category_input) {
        await (0, category_validations_1.updateCategoryValidation)(authorization, category_id, category_input);
        return (0, category_services_1.updateCategoryService)(category_id, category_input);
    }
    async reorderCategories(authorization, categories) {
        await (0, category_validations_1.reorderCategoriesValidation)(authorization, categories);
        return (0, category_services_1.updateCategoryOrderService)(categories);
    }
    async deleteCategory(authorization, category_id) {
        await (0, category_validations_1.deleteCategoriesValidation)(authorization, category_id);
        return (0, category_services_1.deleteCategoriesService)(category_id);
    }
};
exports.CategoriesController = CategoriesController;
tslib_1.__decorate([
    (0, tsoa_1.Get)("/{restaurant_name}"),
    tslib_1.__param(0, (0, tsoa_1.Path)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], CategoriesController.prototype, "getRestaurantCategories", null);
tslib_1.__decorate([
    (0, tsoa_1.Get)("/admin/myCategories"),
    tslib_1.__param(0, (0, tsoa_1.Header)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], CategoriesController.prototype, "getMyRestaurantCategories", null);
tslib_1.__decorate([
    (0, tsoa_1.Post)("{restaurant_name}"),
    tslib_1.__param(0, (0, tsoa_1.Header)()),
    tslib_1.__param(1, (0, tsoa_1.Path)()),
    tslib_1.__param(2, (0, tsoa_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CategoriesController.prototype, "postCategory", null);
tslib_1.__decorate([
    (0, tsoa_1.Put)("{category_id}"),
    tslib_1.__param(0, (0, tsoa_1.Header)()),
    tslib_1.__param(1, (0, tsoa_1.Path)()),
    tslib_1.__param(2, (0, tsoa_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CategoriesController.prototype, "putCategory", null);
tslib_1.__decorate([
    (0, tsoa_1.Put)("/reorder"),
    tslib_1.__param(0, (0, tsoa_1.Header)()),
    tslib_1.__param(1, (0, tsoa_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Array]),
    tslib_1.__metadata("design:returntype", Promise)
], CategoriesController.prototype, "reorderCategories", null);
tslib_1.__decorate([
    (0, tsoa_1.Delete)("{category_id}"),
    tslib_1.__param(0, (0, tsoa_1.Header)()),
    tslib_1.__param(1, (0, tsoa_1.Path)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String]),
    tslib_1.__metadata("design:returntype", Promise)
], CategoriesController.prototype, "deleteCategory", null);
exports.CategoriesController = CategoriesController = tslib_1.__decorate([
    (0, tsoa_1.Tags)("Category service"),
    (0, tsoa_1.Route)("category")
], CategoriesController);
