"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuController = void 0;
const tslib_1 = require("tslib");
const tsoa_1 = require("tsoa");
const menu_services_1 = require("../services/menu-services");
const menu_validations_1 = require("../validations/menu-validations");
let MenuController = class MenuController extends tsoa_1.Controller {
    async getMenu(restaurant_name, notFoundCallback) {
        await (0, menu_validations_1.getMenuValidations)(restaurant_name, notFoundCallback);
        return (0, menu_services_1.getMenuService)(restaurant_name);
    }
};
exports.MenuController = MenuController;
tslib_1.__decorate([
    (0, tsoa_1.Get)("{restaurant_name}"),
    tslib_1.__param(0, (0, tsoa_1.Path)()),
    tslib_1.__param(1, (0, tsoa_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Function]),
    tslib_1.__metadata("design:returntype", Promise)
], MenuController.prototype, "getMenu", null);
exports.MenuController = MenuController = tslib_1.__decorate([
    (0, tsoa_1.Tags)("Menu service"),
    (0, tsoa_1.Route)("menu")
], MenuController);
