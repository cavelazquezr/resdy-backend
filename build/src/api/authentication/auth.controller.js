"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationController = void 0;
const tslib_1 = require("tslib");
const tsoa_1 = require("tsoa");
const auth_model_post_1 = require("./auth.model.post");
let AuthenticationController = class AuthenticationController extends tsoa_1.Controller {
    async logIn(credentials, unauthorizedCallback) {
        return (0, auth_model_post_1.authenticateUserHandler)(credentials, unauthorizedCallback);
    }
};
exports.AuthenticationController = AuthenticationController;
tslib_1.__decorate([
    (0, tsoa_1.Post)(),
    tslib_1.__param(0, (0, tsoa_1.Body)()),
    tslib_1.__param(1, (0, tsoa_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Function]),
    tslib_1.__metadata("design:returntype", Promise)
], AuthenticationController.prototype, "logIn", null);
exports.AuthenticationController = AuthenticationController = tslib_1.__decorate([
    (0, tsoa_1.Tags)("Authentication module"),
    (0, tsoa_1.Route)("authentication")
], AuthenticationController);
