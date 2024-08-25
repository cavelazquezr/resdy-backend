"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFileHandler = exports.createSignedUrlsHandler = exports.getSignedUrlHandler = exports.postAvatarHandler = exports.getObjectHandler = void 0;
const tslib_1 = require("tslib");
const config_1 = require("../../config");
const s3_1 = require("../../services/aws/s3");
const auth_models_1 = require("../models/auth-models");
const sharp_1 = tslib_1.__importDefault(require("sharp"));
const getObjectHandler = async (key) => {
    return await (0, s3_1.getObject)(key);
};
exports.getObjectHandler = getObjectHandler;
const postAvatarHandler = async (authorization, image) => {
    const user = await (0, auth_models_1.getCurrentUserInfo)(authorization);
    // Resize the image
    let sharpInstance = (0, sharp_1.default)(image.buffer);
    // Check and rotate based on EXIF orientation
    const metadata = await sharpInstance.metadata();
    if (metadata.orientation && metadata.orientation >= 5 && metadata.orientation <= 8) {
        sharpInstance = sharpInstance.rotate();
    }
    const buffer = await sharpInstance.resize({ height: 500, width: 500, fit: "cover" }).toBuffer();
    const mimetype = image.mimetype;
    if (user) {
        const image_name = `${user.id}-avatar`;
        const bucket_key = `users/${user.id}/${image_name}`;
        await (0, s3_1.putObject)(bucket_key, buffer, mimetype);
    }
};
exports.postAvatarHandler = postAvatarHandler;
const getSignedUrlHandler = async (key) => {
    return await (0, s3_1.getObjectSignedUrl)(key);
};
exports.getSignedUrlHandler = getSignedUrlHandler;
const createSignedUrlsHandler = async (files) => {
    const signedUrls = {};
    for (const file of files) {
        signedUrls[file.key] = await (0, s3_1.putURL)(file.key, file.fileName, file.contentType, config_1.AWS_BUCKET_NAME);
    }
    return signedUrls;
};
exports.createSignedUrlsHandler = createSignedUrlsHandler;
const deleteFileHandler = async (key) => {
    await (0, s3_1.deleteObject)(key);
};
exports.deleteFileHandler = deleteFileHandler;
