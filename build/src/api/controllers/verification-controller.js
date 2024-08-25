"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerificationController = void 0;
const tslib_1 = require("tslib");
const tsoa_1 = require("tsoa");
const verification_validation_1 = require("../validations/verification-validation");
let VerificationController = class VerificationController extends tsoa_1.Controller {
    async verifyIfEmailIsUsed(input) {
        await (0, verification_validation_1.verifyIfEmailIsUsedValidations)(input.email);
        return true;
    }
    async verifyIfNameIsUsed(input) {
        await (0, verification_validation_1.verifyIfNameIsUsedValidations)(input.name);
        return true;
    }
};
exports.VerificationController = VerificationController;
tslib_1.__decorate([
    (0, tsoa_1.Post)("emailUsed"),
    tslib_1.__param(0, (0, tsoa_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VerificationController.prototype, "verifyIfEmailIsUsed", null);
tslib_1.__decorate([
    (0, tsoa_1.Post)("restaurantNameUsed"),
    tslib_1.__param(0, (0, tsoa_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VerificationController.prototype, "verifyIfNameIsUsed", null);
exports.VerificationController = VerificationController = tslib_1.__decorate([
    (0, tsoa_1.Tags)("Verification service"),
    (0, tsoa_1.Route)("verification")
], VerificationController);
