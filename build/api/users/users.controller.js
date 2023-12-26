"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const tslib_1 = require("tslib");
const client_1 = require("@prisma/client");
const tsoa_1 = require("tsoa");
const users_model_get_1 = require("./users.model.get");
const users_model_post_1 = require("./users.model.post");
const users_model_put_1 = require("./users.model.put");
const users_model_delete_1 = require("./users.model.delete");
let UsersController = class UsersController extends tsoa_1.Controller {
    async getUsers(lastname, firstname, email) {
        return (0, users_model_get_1.getUsersHandler)({
            lastname,
            firstname,
            email,
        });
    }
    async postUser(user) {
        return (0, users_model_post_1.postUserHandler)(user);
    }
    async putUser(authorization, user, unauthorizedCallback) {
        return (0, users_model_put_1.putUserHandler)(authorization, user, unauthorizedCallback);
    }
    async deleteUser(authorization, id, unauthorizedCallback) {
        return (0, users_model_delete_1.deleteUserHandler)(authorization, id, unauthorizedCallback);
    }
};
exports.UsersController = UsersController;
tslib_1.__decorate([
    (0, tsoa_1.Get)(),
    tslib_1.__param(0, (0, tsoa_1.Query)()),
    tslib_1.__param(1, (0, tsoa_1.Query)()),
    tslib_1.__param(2, (0, tsoa_1.Query)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, String]),
    tslib_1.__metadata("design:returntype", Promise)
], UsersController.prototype, "getUsers", null);
tslib_1.__decorate([
    (0, tsoa_1.Post)(),
    tslib_1.__param(0, (0, tsoa_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UsersController.prototype, "postUser", null);
tslib_1.__decorate([
    (0, tsoa_1.Put)(),
    tslib_1.__param(0, (0, tsoa_1.Header)()),
    tslib_1.__param(1, (0, tsoa_1.Body)()),
    tslib_1.__param(2, (0, tsoa_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object, Function]),
    tslib_1.__metadata("design:returntype", Promise)
], UsersController.prototype, "putUser", null);
tslib_1.__decorate([
    (0, tsoa_1.Delete)(),
    tslib_1.__param(0, (0, tsoa_1.Header)()),
    tslib_1.__param(1, (0, tsoa_1.Query)()),
    tslib_1.__param(2, (0, tsoa_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, Function]),
    tslib_1.__metadata("design:returntype", Promise)
], UsersController.prototype, "deleteUser", null);
exports.UsersController = UsersController = tslib_1.__decorate([
    (0, tsoa_1.Tags)("Users module"),
    (0, tsoa_1.Route)("users")
], UsersController);
