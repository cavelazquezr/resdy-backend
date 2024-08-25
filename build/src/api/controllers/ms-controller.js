"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MicroservicesController = void 0;
const tslib_1 = require("tslib");
const tsoa_1 = require("tsoa");
const micro_services_1 = require("../services/micro-services");
let MicroservicesController = class MicroservicesController extends tsoa_1.Controller {
    // TODO: This route can be deleted if not used
    async postAvatar(authorization, image) {
        await (0, micro_services_1.postAvatarHandler)(authorization, image);
    }
    //
    async getSignedUrls(input) {
        return (0, micro_services_1.getSignedUrlHandler)(input.key);
    }
    async putFilesSignedUrl(files) {
        return (0, micro_services_1.createSignedUrlsHandler)(files);
    }
    async deleteObject(input) {
        return (0, micro_services_1.deleteFileHandler)(input.key);
    }
};
exports.MicroservicesController = MicroservicesController;
tslib_1.__decorate([
    (0, tsoa_1.Post)("avatar"),
    tslib_1.__param(0, (0, tsoa_1.Header)()),
    tslib_1.__param(1, (0, tsoa_1.UploadedFile)("image")),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], MicroservicesController.prototype, "postAvatar", null);
tslib_1.__decorate([
    (0, tsoa_1.Post)("getSignedUrl"),
    tslib_1.__param(0, (0, tsoa_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], MicroservicesController.prototype, "getSignedUrls", null);
tslib_1.__decorate([
    (0, tsoa_1.Post)("putSignedUrls"),
    tslib_1.__param(0, (0, tsoa_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Array]),
    tslib_1.__metadata("design:returntype", Promise)
], MicroservicesController.prototype, "putFilesSignedUrl", null);
tslib_1.__decorate([
    (0, tsoa_1.Post)("deleteObject"),
    tslib_1.__param(0, (0, tsoa_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], MicroservicesController.prototype, "deleteObject", null);
exports.MicroservicesController = MicroservicesController = tslib_1.__decorate([
    (0, tsoa_1.Tags)("Microservices"),
    (0, tsoa_1.Route)("microservices")
], MicroservicesController);
