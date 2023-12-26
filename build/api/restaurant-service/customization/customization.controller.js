"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomizationController = void 0;
const tslib_1 = require("tslib");
const client_1 = require("@prisma/client");
const tsoa_1 = require("tsoa");
const customization_model_put_1 = require("./customization.model.put");
let CustomizationController = class CustomizationController extends tsoa_1.Controller {
    //Endpoint a desarrollar 😁
    async putCustomization(authorization, customization, unauthorizedCallback) {
        return (0, customization_model_put_1.putCustomizationHandler)(authorization, customization, unauthorizedCallback);
    }
};
exports.CustomizationController = CustomizationController;
tslib_1.__decorate([
    (0, tsoa_1.Put)(),
    tslib_1.__param(0, (0, tsoa_1.Header)()),
    tslib_1.__param(1, (0, tsoa_1.Body)()),
    tslib_1.__param(2, (0, tsoa_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object, Function]),
    tslib_1.__metadata("design:returntype", Promise)
], CustomizationController.prototype, "putCustomization", null);
exports.CustomizationController = CustomizationController = tslib_1.__decorate([
    (0, tsoa_1.Tags)("Restaurant service"),
    (0, tsoa_1.Route)("restautant/customization")
], CustomizationController);
