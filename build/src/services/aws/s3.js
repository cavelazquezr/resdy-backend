"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteObject = exports.putURL = exports.getObjectSignedUrl = exports.putObject = exports.getObject = exports.s3Client = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const config_1 = require("../../config");
exports.s3Client = new client_s3_1.S3Client({
    region: config_1.AWS_REGION,
    credentials: {
        accessKeyId: config_1.AWS_ACCESS_KEY,
        secretAccessKey: config_1.AWS_SECRET_ACCESS_KEY,
    },
});
const getObject = async (key) => {
    const command = new client_s3_1.GetObjectCommand({
        Bucket: config_1.AWS_BUCKET_NAME,
        Key: key,
    });
    const response = await exports.s3Client.send(command);
    if (!response.Body) {
        throw new Error("Response body is undefined");
    }
    const stream = response.Body;
    const chunks = [];
    for await (const chunk of stream) {
        chunks.push(Buffer.from(chunk));
    }
    return Buffer.concat(chunks);
};
exports.getObject = getObject;
const putObject = async (key, body, contentType) => {
    const command = new client_s3_1.PutObjectCommand({
        Bucket: config_1.AWS_BUCKET_NAME,
        Key: key,
        Body: body,
        ContentType: contentType,
    });
    await exports.s3Client.send(command);
};
exports.putObject = putObject;
const getObjectSignedUrl = async (key) => {
    const command = new client_s3_1.GetObjectCommand({
        Bucket: config_1.AWS_BUCKET_NAME,
        Key: key,
    });
    const url = await (0, s3_request_presigner_1.getSignedUrl)(exports.s3Client, command, { expiresIn: 3600 });
    return url;
};
exports.getObjectSignedUrl = getObjectSignedUrl;
const putURL = (key, fileName, contentType, bucket) => {
    const command = new client_s3_1.PutObjectCommand({
        Key: key,
        Bucket: bucket,
        ContentType: contentType,
        Metadata: { filename: fileName },
    });
    return (0, s3_request_presigner_1.getSignedUrl)(exports.s3Client, command);
};
exports.putURL = putURL;
const deleteObject = async (key) => {
    const command = new client_s3_1.DeleteObjectCommand({
        Bucket: config_1.AWS_BUCKET_NAME,
        Key: key,
    });
    await exports.s3Client.send(command);
};
exports.deleteObject = deleteObject;
