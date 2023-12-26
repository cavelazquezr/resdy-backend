"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesController = void 0;
const tslib_1 = require("tslib");
const client_1 = require("@prisma/client");
const tsoa_1 = require("tsoa");
const categories_model_put_1 = require("./categories.model.put");
const categories_model_get_1 = require("./categories.model.get");
const categories_model_delete_1 = require("./categories.model.delete");
let CategoriesController = class CategoriesController extends tsoa_1.Controller {
    async getCategories(restaurant_id, unauthorizedCallback) {
        return (0, categories_model_get_1.getCategoriesHandler)(restaurant_id, unauthorizedCallback);
    }
    async putCategory(authorization, category_id, category, unauthorizedCallback) {
        return (0, categories_model_put_1.putCategoryHandler)(authorization, category_id, category, unauthorizedCallback);
    }
    //Endpoint a desarrollar
    async deleteWeb() {
        return (0, categories_model_delete_1.deleteCategoryHandler)();
    }
};
exports.CategoriesController = CategoriesController;
tslib_1.__decorate([
    (0, tsoa_1.Get)("/category/{restaurant_id}"),
    tslib_1.__param(0, (0, tsoa_1.Path)()),
    tslib_1.__param(1, (0, tsoa_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Function]),
    tslib_1.__metadata("design:returntype", Promise)
], CategoriesController.prototype, "getCategories", null);
tslib_1.__decorate([
    (0, tsoa_1.Put)("/category/{category_id}"),
    tslib_1.__param(0, (0, tsoa_1.Header)()),
    tslib_1.__param(1, (0, tsoa_1.Path)()),
    tslib_1.__param(2, (0, tsoa_1.Body)()),
    tslib_1.__param(3, (0, tsoa_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, Object, Function]),
    tslib_1.__metadata("design:returntype", Promise)
], CategoriesController.prototype, "putCategory", null);
tslib_1.__decorate([
    (0, tsoa_1.Delete)("/categories/{webId}"),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], CategoriesController.prototype, "deleteWeb", null);
exports.CategoriesController = CategoriesController = tslib_1.__decorate([
    (0, tsoa_1.Tags)("Menu service"),
    (0, tsoa_1.Route)("menu")
], CategoriesController);
