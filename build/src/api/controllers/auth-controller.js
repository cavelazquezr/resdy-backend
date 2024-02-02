"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationController = void 0;
const tslib_1 = require("tslib");
const tsoa_1 = require("tsoa");
const auth_services_1 = require("../services/auth-services");
const auth_validations_1 = require("../validations/auth-validations");
let AuthenticationController = class AuthenticationController extends tsoa_1.Controller {
    async getCurrentUser(authorization) {
        console.log(authorization);
        return (0, auth_services_1.getCurrentUserService)(authorization);
    }
    async logIn(credentials, unauthorizedCallback) {
        await (0, auth_validations_1.authenticateUserValidations)(credentials, unauthorizedCallback);
        return (0, auth_services_1.authenticateUserService)(credentials);
    }
    async postUser(user_record, unauthorizedCallback) {
        await (0, auth_validations_1.createUserValidations)(user_record, unauthorizedCallback);
        return (0, auth_services_1.createUserService)(user_record);
    }
};
exports.AuthenticationController = AuthenticationController;
tslib_1.__decorate([
    (0, tsoa_1.Get)("current_user"),
    tslib_1.__param(0, (0, tsoa_1.Header)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], AuthenticationController.prototype, "getCurrentUser", null);
tslib_1.__decorate([
    (0, tsoa_1.Post)("login"),
    tslib_1.__param(0, (0, tsoa_1.Body)()),
    tslib_1.__param(1, (0, tsoa_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Function]),
    tslib_1.__metadata("design:returntype", Promise)
], AuthenticationController.prototype, "logIn", null);
tslib_1.__decorate([
    (0, tsoa_1.Post)("create_user"),
    tslib_1.__param(0, (0, tsoa_1.Body)()),
    tslib_1.__param(1, (0, tsoa_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Function]),
    tslib_1.__metadata("design:returntype", Promise)
], AuthenticationController.prototype, "postUser", null);
exports.AuthenticationController = AuthenticationController = tslib_1.__decorate([
    (0, tsoa_1.Tags)("Authentication service"),
    (0, tsoa_1.Route)("authentication")
], AuthenticationController);
