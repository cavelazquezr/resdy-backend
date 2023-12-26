"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterRoutes = void 0;
/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const runtime_1 = require("@tsoa/runtime");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const auth_controller_1 = require("./../src/api/authentication/auth.controller");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const categories_controller_1 = require("./../src/api/menu-service/categories/categories.controller");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const dishes_controller_1 = require("./../src/api/menu-service/dishes/dishes.controller");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const customization_controller_1 = require("./../src/api/restaurant-service/customization/customization.controller");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const information_controller_1 = require("./../src/api/restaurant-service/information/information.controller");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const webs_controller_1 = require("./../src/api/restaurant-service/webs.controller");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const users_controller_1 = require("./../src/api/users/users.controller");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const models = {
    "UserCredentials": {
        "dataType": "refObject",
        "properties": {
            "email": { "dataType": "string", "required": true },
            "password": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CategoryOutput": {
        "dataType": "refObject",
        "properties": {
            "id": { "dataType": "string", "required": true },
            "label": { "dataType": "string", "required": true },
            "hasRecordUsingCategory": { "dataType": "boolean" },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "%24Result.DefaultSelection_Prisma.%24DishesCategoriesPayload_": {
        "dataType": "refAlias",
        "type": { "dataType": "nestedObjectLiteral", "nestedProperties": { "restaurant_id": { "dataType": "string", "required": true }, "label": { "dataType": "string", "required": true }, "id": { "dataType": "string", "required": true } }, "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DishesCategories": {
        "dataType": "refAlias",
        "type": { "ref": "%24Result.DefaultSelection_Prisma.%24DishesCategoriesPayload_", "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UpdateCategoryInput": {
        "dataType": "refObject",
        "properties": {
            "label": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Decimal": {
        "dataType": "refAlias",
        "type": { "dataType": "string", "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "%24Result.DefaultSelection_Prisma.%24DishesPayload_": {
        "dataType": "refAlias",
        "type": { "dataType": "nestedObjectLiteral", "nestedProperties": { "category_id": { "dataType": "string", "required": true }, "restaurant_id": { "dataType": "string", "required": true }, "allergen": { "dataType": "array", "array": { "dataType": "string" }, "required": true }, "description": { "dataType": "string", "required": true }, "price": { "ref": "Decimal", "required": true }, "photo_url": { "dataType": "string", "required": true }, "name": { "dataType": "string", "required": true }, "id": { "dataType": "string", "required": true } }, "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Dishes": {
        "dataType": "refAlias",
        "type": { "ref": "%24Result.DefaultSelection_Prisma.%24DishesPayload_", "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreateDishInput": {
        "dataType": "refObject",
        "properties": {
            "id": { "dataType": "string" },
            "name": { "dataType": "string", "required": true },
            "photo_url": { "dataType": "string" },
            "price": { "dataType": "double", "required": true },
            "description": { "dataType": "string" },
            "allergen": { "dataType": "array", "array": { "dataType": "string" } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "JsonObject": {
        "dataType": "refAlias",
        "type": { "dataType": "nestedObjectLiteral", "nestedProperties": {}, "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "JsonArray": {
        "dataType": "refObject",
        "properties": {},
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "JsonValue": {
        "dataType": "refAlias",
        "type": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "double" }, { "dataType": "boolean" }, { "ref": "JsonObject" }, { "ref": "JsonArray" }, { "dataType": "enum", "enums": [null] }], "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "%24Result.DefaultSelection_Prisma.%24CustomizationPayload_": {
        "dataType": "refAlias",
        "type": { "dataType": "nestedObjectLiteral", "nestedProperties": { "restaurant_id": { "dataType": "string", "required": true }, "updated_at": { "dataType": "datetime", "required": true }, "name": { "dataType": "string", "required": true }, "header_url": { "dataType": "string", "required": true }, "logo_url": { "dataType": "string", "required": true }, "extra_customization": { "ref": "JsonValue", "required": true }, "font_families": { "ref": "JsonValue", "required": true }, "color_palette": { "ref": "JsonValue", "required": true } }, "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Customization": {
        "dataType": "refAlias",
        "type": { "ref": "%24Result.DefaultSelection_Prisma.%24CustomizationPayload_", "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DbNull": {
        "dataType": "refObject",
        "properties": {},
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "JsonNull": {
        "dataType": "refObject",
        "properties": {},
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "NullableJsonNullValueInput": {
        "dataType": "refAlias",
        "type": { "dataType": "union", "subSchemas": [{ "ref": "DbNull" }, { "ref": "JsonNull" }], "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "InputJsonObject": {
        "dataType": "refAlias",
        "type": { "dataType": "nestedObjectLiteral", "nestedProperties": {}, "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "InputJsonArray": {
        "dataType": "refObject",
        "properties": {},
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "InputJsonValue": {
        "dataType": "refAlias",
        "type": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "double" }, { "dataType": "boolean" }, { "ref": "InputJsonObject" }, { "ref": "InputJsonArray" }, { "dataType": "nestedObjectLiteral", "nestedProperties": {} }], "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Prisma.CustomizationCreateManyInput": {
        "dataType": "refAlias",
        "type": { "dataType": "nestedObjectLiteral", "nestedProperties": { "restaurant_id": { "dataType": "string", "required": true }, "updated_at": { "dataType": "union", "subSchemas": [{ "dataType": "datetime" }, { "dataType": "string" }] }, "name": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }] }, "header_url": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }] }, "logo_url": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }] }, "extra_customization": { "dataType": "union", "subSchemas": [{ "ref": "NullableJsonNullValueInput" }, { "ref": "InputJsonValue" }] }, "font_families": { "dataType": "union", "subSchemas": [{ "ref": "NullableJsonNullValueInput" }, { "ref": "InputJsonValue" }] }, "color_palette": { "dataType": "union", "subSchemas": [{ "ref": "NullableJsonNullValueInput" }, { "ref": "InputJsonValue" }] } }, "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "%24Result.DefaultSelection_Prisma.%24RestaurantInformationPayload_": {
        "dataType": "refAlias",
        "type": { "dataType": "nestedObjectLiteral", "nestedProperties": { "restaurant_id": { "dataType": "string", "required": true }, "updated_at": { "dataType": "datetime", "required": true }, "extra_information": { "ref": "JsonValue", "required": true }, "location": { "ref": "JsonValue", "required": true }, "restaurant_type": { "dataType": "string", "required": true }, "social_media": { "ref": "JsonValue", "required": true }, "country": { "dataType": "string", "required": true }, "city": { "dataType": "string", "required": true }, "address": { "dataType": "string", "required": true }, "phone": { "dataType": "string", "required": true } }, "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "RestaurantInformation": {
        "dataType": "refAlias",
        "type": { "ref": "%24Result.DefaultSelection_Prisma.%24RestaurantInformationPayload_", "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Prisma.RestaurantInformationCreateManyInput": {
        "dataType": "refAlias",
        "type": { "dataType": "nestedObjectLiteral", "nestedProperties": { "restaurant_id": { "dataType": "string", "required": true }, "updated_at": { "dataType": "union", "subSchemas": [{ "dataType": "datetime" }, { "dataType": "string" }] }, "extra_information": { "dataType": "union", "subSchemas": [{ "ref": "NullableJsonNullValueInput" }, { "ref": "InputJsonValue" }] }, "location": { "dataType": "union", "subSchemas": [{ "ref": "NullableJsonNullValueInput" }, { "ref": "InputJsonValue" }] }, "restaurant_type": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }] }, "social_media": { "dataType": "union", "subSchemas": [{ "ref": "NullableJsonNullValueInput" }, { "ref": "InputJsonValue" }] }, "country": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }] }, "city": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }] }, "address": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }] }, "phone": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }] } }, "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Prisma.JsonObject": {
        "dataType": "refAlias",
        "type": { "dataType": "nestedObjectLiteral", "nestedProperties": {}, "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "RestautantOutput": {
        "dataType": "refObject",
        "properties": {
            "name": { "dataType": "string" },
            "brand_name": { "dataType": "string" },
            "phone": { "dataType": "string" },
            "address": { "dataType": "string" },
            "country": { "dataType": "string" },
            "city": { "dataType": "string" },
            "restaurant_type": { "dataType": "string" },
            "location": { "ref": "Prisma.JsonObject" },
            "price_average": { "dataType": "double", "required": true },
            "rating": { "dataType": "double" },
            "rating_count": { "dataType": "double" },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "%24Result.DefaultSelection_Prisma.%24RestaurantPayload_": {
        "dataType": "refAlias",
        "type": { "dataType": "nestedObjectLiteral", "nestedProperties": { "admin_id": { "dataType": "string", "required": true }, "name": { "dataType": "string", "required": true }, "id": { "dataType": "string", "required": true } }, "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Restaurant": {
        "dataType": "refAlias",
        "type": { "ref": "%24Result.DefaultSelection_Prisma.%24RestaurantPayload_", "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Prisma.CustomizationCreateWithoutRestaurantInput": {
        "dataType": "refAlias",
        "type": { "dataType": "nestedObjectLiteral", "nestedProperties": { "updated_at": { "dataType": "union", "subSchemas": [{ "dataType": "datetime" }, { "dataType": "string" }] }, "name": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }] }, "header_url": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }] }, "logo_url": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }] }, "extra_customization": { "dataType": "union", "subSchemas": [{ "ref": "NullableJsonNullValueInput" }, { "ref": "InputJsonValue" }] }, "font_families": { "dataType": "union", "subSchemas": [{ "ref": "NullableJsonNullValueInput" }, { "ref": "InputJsonValue" }] }, "color_palette": { "dataType": "union", "subSchemas": [{ "ref": "NullableJsonNullValueInput" }, { "ref": "InputJsonValue" }] } }, "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Prisma.RestaurantInformationCreateWithoutRestaurantInput": {
        "dataType": "refAlias",
        "type": { "dataType": "nestedObjectLiteral", "nestedProperties": { "updated_at": { "dataType": "union", "subSchemas": [{ "dataType": "datetime" }, { "dataType": "string" }] }, "extra_information": { "dataType": "union", "subSchemas": [{ "ref": "NullableJsonNullValueInput" }, { "ref": "InputJsonValue" }] }, "location": { "dataType": "union", "subSchemas": [{ "ref": "NullableJsonNullValueInput" }, { "ref": "InputJsonValue" }] }, "restaurant_type": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }] }, "social_media": { "dataType": "union", "subSchemas": [{ "ref": "NullableJsonNullValueInput" }, { "ref": "InputJsonValue" }] }, "country": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }] }, "city": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }] }, "address": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }] }, "phone": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }] } }, "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreateRestaurantInput": {
        "dataType": "refObject",
        "properties": {
            "name": { "dataType": "string", "required": true },
            "customization": { "ref": "Prisma.CustomizationCreateWithoutRestaurantInput" },
            "restaurant_information": { "ref": "Prisma.RestaurantInformationCreateWithoutRestaurantInput" },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "%24Result.DefaultSelection_Prisma.%24UserPayload_": {
        "dataType": "refAlias",
        "type": { "dataType": "nestedObjectLiteral", "nestedProperties": { "is_owner": { "dataType": "boolean", "required": true }, "is_active": { "dataType": "boolean", "required": true }, "created_at": { "dataType": "datetime", "required": true }, "password": { "dataType": "string", "required": true }, "avatar_url": { "dataType": "string", "required": true }, "lastname": { "dataType": "string", "required": true }, "firstname": { "dataType": "string", "required": true }, "email": { "dataType": "string", "required": true }, "id": { "dataType": "string", "required": true } }, "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "User": {
        "dataType": "refAlias",
        "type": { "ref": "%24Result.DefaultSelection_Prisma.%24UserPayload_", "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreateUserInput": {
        "dataType": "refObject",
        "properties": {
            "email": { "dataType": "string", "required": true },
            "firstname": { "dataType": "string", "required": true },
            "lastname": { "dataType": "string", "required": true },
            "password": { "dataType": "string", "required": true },
            "is_owner": { "dataType": "boolean", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UpdateUserInput": {
        "dataType": "refObject",
        "properties": {
            "id": { "dataType": "string", "required": true },
            "email": { "dataType": "string" },
            "firstname": { "dataType": "string" },
            "lastname": { "dataType": "string" },
            "password": { "dataType": "string" },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const validationService = new runtime_1.ValidationService(models);
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
function RegisterRoutes(app) {
    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################
    app.post('/authentication', ...((0, runtime_1.fetchMiddlewares)(auth_controller_1.AuthenticationController)), ...((0, runtime_1.fetchMiddlewares)(auth_controller_1.AuthenticationController.prototype.logIn)), function AuthenticationController_logIn(request, response, next) {
        const args = {
            credentials: { "in": "body", "name": "credentials", "required": true, "ref": "UserCredentials" },
            unauthorizedCallback: { "in": "res", "name": "403", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "reason": { "dataType": "string", "required": true } } },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new auth_controller_1.AuthenticationController();
            const promise = controller.logIn.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/menu/category/:restaurant_id', ...((0, runtime_1.fetchMiddlewares)(categories_controller_1.CategoriesController)), ...((0, runtime_1.fetchMiddlewares)(categories_controller_1.CategoriesController.prototype.getCategories)), function CategoriesController_getCategories(request, response, next) {
        const args = {
            restaurant_id: { "in": "path", "name": "restaurant_id", "required": true, "dataType": "string" },
            unauthorizedCallback: { "in": "res", "name": "403", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "reason": { "dataType": "string", "required": true } } },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new categories_controller_1.CategoriesController();
            const promise = controller.getCategories.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.put('/menu/category/:category_id', ...((0, runtime_1.fetchMiddlewares)(categories_controller_1.CategoriesController)), ...((0, runtime_1.fetchMiddlewares)(categories_controller_1.CategoriesController.prototype.putCategory)), function CategoriesController_putCategory(request, response, next) {
        const args = {
            authorization: { "in": "header", "name": "authorization", "required": true, "dataType": "string" },
            category_id: { "in": "path", "name": "category_id", "required": true, "dataType": "string" },
            category: { "in": "body", "name": "category", "required": true, "ref": "UpdateCategoryInput" },
            unauthorizedCallback: { "in": "res", "name": "403", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "reason": { "dataType": "string", "required": true } } },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new categories_controller_1.CategoriesController();
            const promise = controller.putCategory.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.delete('/menu/categories/:webId', ...((0, runtime_1.fetchMiddlewares)(categories_controller_1.CategoriesController)), ...((0, runtime_1.fetchMiddlewares)(categories_controller_1.CategoriesController.prototype.deleteWeb)), function CategoriesController_deleteWeb(request, response, next) {
        const args = {};
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new categories_controller_1.CategoriesController();
            const promise = controller.deleteWeb.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/webs/dishes/:restaurant_id', ...((0, runtime_1.fetchMiddlewares)(dishes_controller_1.DishesController)), ...((0, runtime_1.fetchMiddlewares)(dishes_controller_1.DishesController.prototype.getDishes)), function DishesController_getDishes(request, response, next) {
        const args = {
            restaurant_id: { "in": "path", "name": "restaurant_id", "required": true, "dataType": "string" },
            unauthorizedCallback: { "in": "res", "name": "403", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "reason": { "dataType": "string", "required": true } } },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new dishes_controller_1.DishesController();
            const promise = controller.getDishes.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/webs/dishes/:restaurant_id/:category_id', ...((0, runtime_1.fetchMiddlewares)(dishes_controller_1.DishesController)), ...((0, runtime_1.fetchMiddlewares)(dishes_controller_1.DishesController.prototype.postDishes)), function DishesController_postDishes(request, response, next) {
        const args = {
            authorization: { "in": "header", "name": "authorization", "required": true, "dataType": "string" },
            restaurant_id: { "in": "path", "name": "restaurant_id", "required": true, "dataType": "string" },
            category_id: { "in": "path", "name": "category_id", "required": true, "dataType": "string" },
            dish: { "in": "body", "name": "dish", "required": true, "ref": "CreateDishInput" },
            unauthorizedCallback: { "in": "res", "name": "403", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "reason": { "dataType": "string", "required": true } } },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new dishes_controller_1.DishesController();
            const promise = controller.postDishes.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.put('/restautant/customization', ...((0, runtime_1.fetchMiddlewares)(customization_controller_1.CustomizationController)), ...((0, runtime_1.fetchMiddlewares)(customization_controller_1.CustomizationController.prototype.putCustomization)), function CustomizationController_putCustomization(request, response, next) {
        const args = {
            authorization: { "in": "header", "name": "authorization", "required": true, "dataType": "string" },
            customization: { "in": "body", "name": "customization", "required": true, "ref": "Prisma.CustomizationCreateManyInput" },
            unauthorizedCallback: { "in": "res", "name": "403", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "reason": { "dataType": "string", "required": true } } },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new customization_controller_1.CustomizationController();
            const promise = controller.putCustomization.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.put('/restautant/information', ...((0, runtime_1.fetchMiddlewares)(information_controller_1.InformationController)), ...((0, runtime_1.fetchMiddlewares)(information_controller_1.InformationController.prototype.putInformation)), function InformationController_putInformation(request, response, next) {
        const args = {
            authorization: { "in": "header", "name": "authorization", "required": true, "dataType": "string" },
            information: { "in": "body", "name": "information", "required": true, "ref": "Prisma.RestaurantInformationCreateManyInput" },
            unauthorizedCallback: { "in": "res", "name": "403", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "reason": { "dataType": "string", "required": true } } },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new information_controller_1.InformationController();
            const promise = controller.putInformation.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/restaurant', ...((0, runtime_1.fetchMiddlewares)(webs_controller_1.RestaurantController)), ...((0, runtime_1.fetchMiddlewares)(webs_controller_1.RestaurantController.prototype.getRestaurant)), function RestaurantController_getRestaurant(request, response, next) {
        const args = {
            unauthorizedCallback: { "in": "res", "name": "403", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "reason": { "dataType": "string", "required": true } } },
            name: { "in": "query", "name": "name", "dataType": "string" },
            city: { "in": "query", "name": "city", "dataType": "string" },
            restaurant_type: { "in": "query", "name": "restaurant_type", "dataType": "string" },
            country: { "in": "query", "name": "country", "dataType": "string" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new webs_controller_1.RestaurantController();
            const promise = controller.getRestaurant.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/restaurant', ...((0, runtime_1.fetchMiddlewares)(webs_controller_1.RestaurantController)), ...((0, runtime_1.fetchMiddlewares)(webs_controller_1.RestaurantController.prototype.postRestaurant)), function RestaurantController_postRestaurant(request, response, next) {
        const args = {
            authorization: { "in": "header", "name": "authorization", "required": true, "dataType": "string" },
            restaurant: { "in": "body", "name": "restaurant", "required": true, "ref": "CreateRestaurantInput" },
            unauthorizedCallback: { "in": "res", "name": "403", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "reason": { "dataType": "string", "required": true } } },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new webs_controller_1.RestaurantController();
            const promise = controller.postRestaurant.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.delete('/restaurant', ...((0, runtime_1.fetchMiddlewares)(webs_controller_1.RestaurantController)), ...((0, runtime_1.fetchMiddlewares)(webs_controller_1.RestaurantController.prototype.deleteWeb)), function RestaurantController_deleteWeb(request, response, next) {
        const args = {};
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new webs_controller_1.RestaurantController();
            const promise = controller.deleteWeb.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/users', ...((0, runtime_1.fetchMiddlewares)(users_controller_1.UsersController)), ...((0, runtime_1.fetchMiddlewares)(users_controller_1.UsersController.prototype.getUsers)), function UsersController_getUsers(request, response, next) {
        const args = {
            lastname: { "in": "query", "name": "lastname", "dataType": "string" },
            firstname: { "in": "query", "name": "firstname", "dataType": "string" },
            email: { "in": "query", "name": "email", "dataType": "string" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new users_controller_1.UsersController();
            const promise = controller.getUsers.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/users', ...((0, runtime_1.fetchMiddlewares)(users_controller_1.UsersController)), ...((0, runtime_1.fetchMiddlewares)(users_controller_1.UsersController.prototype.postUser)), function UsersController_postUser(request, response, next) {
        const args = {
            user: { "in": "body", "name": "user", "required": true, "ref": "CreateUserInput" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new users_controller_1.UsersController();
            const promise = controller.postUser.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.put('/users', ...((0, runtime_1.fetchMiddlewares)(users_controller_1.UsersController)), ...((0, runtime_1.fetchMiddlewares)(users_controller_1.UsersController.prototype.putUser)), function UsersController_putUser(request, response, next) {
        const args = {
            authorization: { "in": "header", "name": "authorization", "required": true, "dataType": "string" },
            user: { "in": "body", "name": "user", "required": true, "ref": "UpdateUserInput" },
            unauthorizedCallback: { "in": "res", "name": "403", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "reason": { "dataType": "string", "required": true } } },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new users_controller_1.UsersController();
            const promise = controller.putUser.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.delete('/users', ...((0, runtime_1.fetchMiddlewares)(users_controller_1.UsersController)), ...((0, runtime_1.fetchMiddlewares)(users_controller_1.UsersController.prototype.deleteUser)), function UsersController_deleteUser(request, response, next) {
        const args = {
            authorization: { "in": "header", "name": "authorization", "required": true, "dataType": "string" },
            id: { "in": "query", "name": "id", "required": true, "dataType": "string" },
            unauthorizedCallback: { "in": "res", "name": "403", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "reason": { "dataType": "string", "required": true } } },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new users_controller_1.UsersController();
            const promise = controller.deleteUser.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    function isController(object) {
        return 'getHeaders' in object && 'getStatus' in object && 'setStatus' in object;
    }
    function promiseHandler(controllerObj, promise, response, successStatus, next) {
        return Promise.resolve(promise)
            .then((data) => {
            let statusCode = successStatus;
            let headers;
            if (isController(controllerObj)) {
                headers = controllerObj.getHeaders();
                statusCode = controllerObj.getStatus() || statusCode;
            }
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            returnHandler(response, statusCode, data, headers);
        })
            .catch((error) => next(error));
    }
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    function returnHandler(response, statusCode, data, headers = {}) {
        if (response.headersSent) {
            return;
        }
        Object.keys(headers).forEach((name) => {
            response.set(name, headers[name]);
        });
        if (data && typeof data.pipe === 'function' && data.readable && typeof data._read === 'function') {
            response.status(statusCode || 200);
            data.pipe(response);
        }
        else if (data !== null && data !== undefined) {
            response.status(statusCode || 200).json(data);
        }
        else {
            response.status(statusCode || 204).end();
        }
    }
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    function responder(response) {
        return function (status, data, headers) {
            returnHandler(response, status, data, headers);
        };
    }
    ;
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    function getValidatedArgs(args, request, response) {
        const fieldErrors = {};
        const values = Object.keys(args).map((key) => {
            const name = args[key].name;
            switch (args[key].in) {
                case 'request':
                    return request;
                case 'query':
                    return validationService.ValidateParam(args[key], request.query[name], name, fieldErrors, undefined, { "noImplicitAdditionalProperties": "silently-remove-extras" });
                case 'queries':
                    return validationService.ValidateParam(args[key], request.query, name, fieldErrors, undefined, { "noImplicitAdditionalProperties": "silently-remove-extras" });
                case 'path':
                    return validationService.ValidateParam(args[key], request.params[name], name, fieldErrors, undefined, { "noImplicitAdditionalProperties": "silently-remove-extras" });
                case 'header':
                    return validationService.ValidateParam(args[key], request.header(name), name, fieldErrors, undefined, { "noImplicitAdditionalProperties": "silently-remove-extras" });
                case 'body':
                    return validationService.ValidateParam(args[key], request.body, name, fieldErrors, undefined, { "noImplicitAdditionalProperties": "silently-remove-extras" });
                case 'body-prop':
                    return validationService.ValidateParam(args[key], request.body[name], name, fieldErrors, 'body.', { "noImplicitAdditionalProperties": "silently-remove-extras" });
                case 'formData':
                    if (args[key].dataType === 'file') {
                        return validationService.ValidateParam(args[key], request.file, name, fieldErrors, undefined, { "noImplicitAdditionalProperties": "silently-remove-extras" });
                    }
                    else if (args[key].dataType === 'array' && args[key].array.dataType === 'file') {
                        return validationService.ValidateParam(args[key], request.files, name, fieldErrors, undefined, { "noImplicitAdditionalProperties": "silently-remove-extras" });
                    }
                    else {
                        return validationService.ValidateParam(args[key], request.body[name], name, fieldErrors, undefined, { "noImplicitAdditionalProperties": "silently-remove-extras" });
                    }
                case 'res':
                    return responder(response);
            }
        });
        if (Object.keys(fieldErrors).length > 0) {
            throw new runtime_1.ValidateError(fieldErrors, '');
        }
        return values;
    }
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}
exports.RegisterRoutes = RegisterRoutes;
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
