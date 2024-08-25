"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AWS_SECRET_ACCESS_KEY = exports.AWS_ACCESS_KEY = exports.AWS_REGION = exports.AWS_BUCKET_NAME = exports.MAPBOX_ACCESS_KEY = exports.PORT = void 0;
exports.PORT = process.env["PORT"] || 8080;
exports.MAPBOX_ACCESS_KEY = process.env["MAPBOX_ACCESS_KEY"] || "m4pb0x";
exports.AWS_BUCKET_NAME = process.env["AWS_BUCKET_NAME"] || "buck3t";
exports.AWS_REGION = process.env["AWS_BUCKET_REGION"] || "r3gion";
exports.AWS_ACCESS_KEY = process.env["AWS_ACCESS_KEY"] || "S3RV3R";
exports.AWS_SECRET_ACCESS_KEY = process.env["AWS_SECRET_ACCESS_KEY"] || "S3RV3R";
