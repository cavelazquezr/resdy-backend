"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const swagger_json_1 = tslib_1.__importDefault(require("../tsoa/swagger.json"));
const routes_1 = require("../tsoa/routes");
const swagger_ui_express_1 = tslib_1.__importDefault(require("swagger-ui-express"));
const express_openapi_validator_1 = require("express-openapi-validator");
const body_parser_1 = tslib_1.__importDefault(require("body-parser"));
const cors_1 = tslib_1.__importDefault(require("cors"));
const config_1 = require("./config");
const dotenv_1 = tslib_1.__importDefault(require("dotenv"));
const errors_1 = require("./config/errors");
dotenv_1.default.config();
const app = (0, express_1.default)();
//Basic middleware
app.use(body_parser_1.default.urlencoded({ extended: true, limit: "50mb" }));
app.use(body_parser_1.default.json({ limit: "50mb" }));
app.use((0, cors_1.default)());
app.get("/", (_req, res) => {
    res.json({ msg: "Welcome to your Rest API" });
});
// Docs endpoints
app.get("/openapi", (_req, res) => res.send(swagger_json_1.default));
app.use("/docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_json_1.default, {
    customCss: ".swagger-ui .topbar { display: none }",
    customSiteTitle: "resdy API",
    swaggerOptions: {
        defaultModelsExpandDepth: -1,
    },
}));
// Register tsoa controllers
(0, routes_1.RegisterRoutes)(app);
// Enforce validation
app.use((0, express_openapi_validator_1.middleware)({
    apiSpec: "./tsoa/swagger.json",
    validateRequests: true,
    validateResponses: true,
}));
// Error handler
app.use(errors_1.errorHandler);
//Basic middleware
app.listen(config_1.PORT, () => {
    console.log(`🚀 Server running at port ${config_1.PORT} 🚀`);
});
