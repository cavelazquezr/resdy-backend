"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterRoutes = void 0;
/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const runtime_1 = require("@tsoa/runtime");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const auth_controller_1 = require("./../src/api/controllers/auth-controller");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const category_controller_1 = require("./../src/api/controllers/category-controller");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const dish_controller_1 = require("./../src/api/controllers/dish-controller");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const menu_controller_1 = require("./../src/api/controllers/menu-controller");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const rating_controller_1 = require("./../src/api/controllers/rating-controller");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const restaurant_controller_1 = require("./../src/api/controllers/restaurant-controller");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const models = {
    "UserOutput": {
        "dataType": "refObject",
        "properties": {
            "id": { "dataType": "string", "required": true },
            "email": { "dataType": "string", "required": true },
            "avatar_url": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }], "required": true },
            "firstname": { "dataType": "string", "required": true },
            "lastname": { "dataType": "string", "required": true },
            "created_at": { "dataType": "datetime", "required": true },
            "is_active": { "dataType": "boolean", "required": true },
            "is_owner": { "dataType": "boolean", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UserCredentials": {
        "dataType": "refObject",
        "properties": {
            "email": { "dataType": "string", "required": true },
            "password": { "dataType": "string", "required": true },
            "remember": { "dataType": "boolean" },
        },
        "additionalProperties": false,
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
    "Partial_Category_": {
        "dataType": "refAlias",
        "type": { "dataType": "nestedObjectLiteral", "nestedProperties": { "id": { "dataType": "string" }, "label": { "dataType": "string" }, "is_active": { "dataType": "boolean" }, "created_at": { "dataType": "datetime" }, "updated_at": { "dataType": "union", "subSchemas": [{ "dataType": "datetime" }, { "dataType": "enum", "enums": [null] }] }, "restaurant_id": { "dataType": "string" } }, "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CategoryProps": {
        "dataType": "refAlias",
        "type": { "ref": "Partial_Category_", "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "WithIsUsed_CategoryProps_": {
        "dataType": "refAlias",
        "type": { "dataType": "intersection", "subSchemas": [{ "ref": "CategoryProps" }, { "dataType": "nestedObjectLiteral", "nestedProperties": { "is_used": { "dataType": "boolean", "required": true } } }], "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "%24Result.DefaultSelection_Prisma.%24CategoryPayload_": {
        "dataType": "refAlias",
        "type": { "dataType": "nestedObjectLiteral", "nestedProperties": { "restaurant_id": { "dataType": "string", "required": true }, "updated_at": { "dataType": "datetime", "required": true }, "created_at": { "dataType": "datetime", "required": true }, "is_active": { "dataType": "boolean", "required": true }, "label": { "dataType": "string", "required": true }, "id": { "dataType": "string", "required": true } }, "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Category": {
        "dataType": "refAlias",
        "type": { "ref": "%24Result.DefaultSelection_Prisma.%24CategoryPayload_", "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CategoryOutput": {
        "dataType": "refAlias",
        "type": { "ref": "Category", "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_Category.label_": {
        "dataType": "refAlias",
        "type": { "dataType": "nestedObjectLiteral", "nestedProperties": { "label": { "dataType": "string", "required": true } }, "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CategoryCreateInput": {
        "dataType": "refAlias",
        "type": { "ref": "Pick_Category.label_", "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Partial_Pick_CategoryProps.label__": {
        "dataType": "refAlias",
        "type": { "dataType": "nestedObjectLiteral", "nestedProperties": { "label": { "dataType": "string" } }, "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "WithHide_Partial_Pick_CategoryProps.label___": {
        "dataType": "refAlias",
        "type": { "dataType": "intersection", "subSchemas": [{ "ref": "Partial_Pick_CategoryProps.label__" }, { "dataType": "nestedObjectLiteral", "nestedProperties": { "hide": { "dataType": "boolean" } } }], "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CategoryUpdateInput": {
        "dataType": "refAlias",
        "type": { "ref": "WithHide_Partial_Pick_CategoryProps.label___", "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Decimal": {
        "dataType": "refAlias",
        "type": { "dataType": "string", "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "%24Result.DefaultSelection_Prisma.%24DishesPayload_": {
        "dataType": "refAlias",
        "type": { "dataType": "nestedObjectLiteral", "nestedProperties": { "category_id": { "dataType": "string", "required": true }, "restaurant_id": { "dataType": "string", "required": true }, "updated_at": { "dataType": "datetime", "required": true }, "created_at": { "dataType": "datetime", "required": true }, "is_active": { "dataType": "boolean", "required": true }, "allergen": { "dataType": "string", "required": true }, "description": { "dataType": "string", "required": true }, "price": { "ref": "Decimal", "required": true }, "photo_url": { "dataType": "string", "required": true }, "name": { "dataType": "string", "required": true }, "id": { "dataType": "string", "required": true } }, "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Dishes": {
        "dataType": "refAlias",
        "type": { "ref": "%24Result.DefaultSelection_Prisma.%24DishesPayload_", "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DishOutput": {
        "dataType": "refAlias",
        "type": { "ref": "Dishes", "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DishesByCategoryOutput": {
        "dataType": "refAlias",
        "type": { "dataType": "nestedObjectLiteral", "nestedProperties": { "dishes": { "dataType": "array", "array": { "dataType": "refAlias", "ref": "DishOutput" }, "required": true }, "category": { "dataType": "string", "required": true } }, "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Prisma.Decimal": {
        "dataType": "refAlias",
        "type": { "dataType": "string", "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_Dishes.name-or-photo_url-or-allergen-or-price-or-description_": {
        "dataType": "refAlias",
        "type": { "dataType": "nestedObjectLiteral", "nestedProperties": { "name": { "dataType": "string", "required": true }, "photo_url": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }], "required": true }, "allergen": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }], "required": true }, "price": { "ref": "Prisma.Decimal", "required": true }, "description": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }], "required": true } }, "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DishCreateInput": {
        "dataType": "refAlias",
        "type": { "ref": "Pick_Dishes.name-or-photo_url-or-allergen-or-price-or-description_", "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Partial_Pick_DishProps.name-or-photo_url-or-allergen-or-price-or-description__": {
        "dataType": "refAlias",
        "type": { "dataType": "nestedObjectLiteral", "nestedProperties": { "name": { "dataType": "string" }, "photo_url": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }] }, "allergen": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }] }, "price": { "ref": "Prisma.Decimal" }, "description": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }] } }, "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "WithHide_Partial_Pick_DishProps.name-or-photo_url-or-allergen-or-price-or-description___": {
        "dataType": "refAlias",
        "type": { "dataType": "intersection", "subSchemas": [{ "ref": "Partial_Pick_DishProps.name-or-photo_url-or-allergen-or-price-or-description__" }, { "dataType": "nestedObjectLiteral", "nestedProperties": { "hide": { "dataType": "boolean" } } }], "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DishUpdateInput": {
        "dataType": "refAlias",
        "type": { "ref": "WithHide_Partial_Pick_DishProps.name-or-photo_url-or-allergen-or-price-or-description___", "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Partial_Dishes_": {
        "dataType": "refAlias",
        "type": { "dataType": "nestedObjectLiteral", "nestedProperties": { "id": { "dataType": "string" }, "name": { "dataType": "string" }, "photo_url": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }] }, "price": { "ref": "Prisma.Decimal" }, "description": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }] }, "allergen": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }] }, "is_active": { "dataType": "boolean" }, "created_at": { "dataType": "datetime" }, "updated_at": { "dataType": "union", "subSchemas": [{ "dataType": "datetime" }, { "dataType": "enum", "enums": [null] }] }, "restaurant_id": { "dataType": "string" }, "category_id": { "dataType": "string" } }, "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DishProps": {
        "dataType": "refAlias",
        "type": { "ref": "Partial_Dishes_", "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "MenuOutput": {
        "dataType": "refObject",
        "properties": {
            "category": { "dataType": "string", "required": true },
            "dishes": { "dataType": "array", "array": { "dataType": "refAlias", "ref": "DishProps" }, "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "MyRatingInfoOutput": {
        "dataType": "refObject",
        "properties": {
            "status": { "dataType": "string", "required": true },
            "created_at": { "dataType": "datetime", "required": true },
            "title": { "dataType": "string" },
            "comment": { "dataType": "string" },
            "rating": { "dataType": "double" },
            "replied_at": { "dataType": "datetime" },
            "answer": { "dataType": "string" },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "MyRatingOutput": {
        "dataType": "refObject",
        "properties": {
            "name": { "dataType": "string", "required": true },
            "city": { "dataType": "string" },
            "address": { "dataType": "string" },
            "rating_info": { "ref": "MyRatingInfoOutput" },
            "header_url": { "dataType": "string" },
            "brand_name": { "dataType": "string" },
            "restaurant_type": { "dataType": "string" },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UserRatingOutput": {
        "dataType": "refObject",
        "properties": {
            "firstname": { "dataType": "string", "required": true },
            "lastname": { "dataType": "string", "required": true },
            "avatar_url": { "dataType": "string" },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "RatingsOutput": {
        "dataType": "refObject",
        "properties": {
            "rating": { "dataType": "double" },
            "title": { "dataType": "string" },
            "comment": { "dataType": "string" },
            "created_at": { "dataType": "datetime", "required": true },
            "user_info": { "ref": "UserRatingOutput" },
            "replied_at": { "dataType": "datetime" },
            "answer": { "dataType": "string" },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Record_number.number_": {
        "dataType": "refAlias",
        "type": { "dataType": "nestedObjectLiteral", "nestedProperties": {}, "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "RatingStatsOutput": {
        "dataType": "refObject",
        "properties": {
            "rating": { "dataType": "string", "required": true },
            "rating_count": { "dataType": "double", "required": true },
            "stats": { "ref": "Record_number.number_", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UpdateRatingRecord": {
        "dataType": "refObject",
        "properties": {
            "title": { "dataType": "string", "required": true },
            "comment": { "dataType": "string", "required": true },
            "rating": { "dataType": "double", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Prisma.JsonObject": {
        "dataType": "refAlias",
        "type": { "dataType": "nestedObjectLiteral", "nestedProperties": {}, "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "RestaurantOutput": {
        "dataType": "refObject",
        "properties": {
            "name": { "dataType": "string" },
            "brand_name": { "dataType": "string" },
            "phone": { "dataType": "string" },
            "address": { "dataType": "string" },
            "country": { "dataType": "string" },
            "city": { "dataType": "string" },
            "restaurant_type": { "dataType": "string" },
            "description": { "dataType": "string" },
            "location": { "ref": "Prisma.JsonObject" },
            "price_average": { "dataType": "double", "required": true },
            "rating": { "dataType": "double" },
            "rating_count": { "dataType": "double" },
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
    app.get('/authentication/current_user', ...((0, runtime_1.fetchMiddlewares)(auth_controller_1.AuthenticationController)), ...((0, runtime_1.fetchMiddlewares)(auth_controller_1.AuthenticationController.prototype.getCurrentUser)), function AuthenticationController_getCurrentUser(request, response, next) {
        const args = {
            authorization: { "in": "header", "name": "authorization", "required": true, "dataType": "string" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new auth_controller_1.AuthenticationController();
            const promise = controller.getCurrentUser.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/authentication/login', ...((0, runtime_1.fetchMiddlewares)(auth_controller_1.AuthenticationController)), ...((0, runtime_1.fetchMiddlewares)(auth_controller_1.AuthenticationController.prototype.logIn)), function AuthenticationController_logIn(request, response, next) {
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
    app.post('/authentication/create_user', ...((0, runtime_1.fetchMiddlewares)(auth_controller_1.AuthenticationController)), ...((0, runtime_1.fetchMiddlewares)(auth_controller_1.AuthenticationController.prototype.postUser)), function AuthenticationController_postUser(request, response, next) {
        const args = {
            user_record: { "in": "body", "name": "user_record", "required": true, "ref": "CreateUserInput" },
            unauthorizedCallback: { "in": "res", "name": "403", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "reason": { "dataType": "string", "required": true } } },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new auth_controller_1.AuthenticationController();
            const promise = controller.postUser.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/category/:restaurant_name', ...((0, runtime_1.fetchMiddlewares)(category_controller_1.CategoriesController)), ...((0, runtime_1.fetchMiddlewares)(category_controller_1.CategoriesController.prototype.getRestautantCategories)), function CategoriesController_getRestautantCategories(request, response, next) {
        const args = {
            restaurant_name: { "in": "path", "name": "restaurant_name", "required": true, "dataType": "string" },
            notFoundCallback: { "in": "res", "name": "404", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "details": { "dataType": "string", "required": true } } },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new category_controller_1.CategoriesController();
            const promise = controller.getRestautantCategories.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/category/:restaurant_name', ...((0, runtime_1.fetchMiddlewares)(category_controller_1.CategoriesController)), ...((0, runtime_1.fetchMiddlewares)(category_controller_1.CategoriesController.prototype.postCategory)), function CategoriesController_postCategory(request, response, next) {
        const args = {
            authorization: { "in": "header", "name": "authorization", "required": true, "dataType": "string" },
            restaurant_name: { "in": "path", "name": "restaurant_name", "required": true, "dataType": "string" },
            category_input: { "in": "body", "name": "category_input", "required": true, "ref": "CategoryCreateInput" },
            unauthorizedCallback: { "in": "res", "name": "401", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "details": { "dataType": "string", "required": true } } },
            notFoundCallback: { "in": "res", "name": "404", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "details": { "dataType": "string", "required": true } } },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new category_controller_1.CategoriesController();
            const promise = controller.postCategory.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.put('/category/:category_id', ...((0, runtime_1.fetchMiddlewares)(category_controller_1.CategoriesController)), ...((0, runtime_1.fetchMiddlewares)(category_controller_1.CategoriesController.prototype.putCategory)), function CategoriesController_putCategory(request, response, next) {
        const args = {
            authorization: { "in": "header", "name": "authorization", "required": true, "dataType": "string" },
            category_id: { "in": "path", "name": "category_id", "required": true, "dataType": "string" },
            category_input: { "in": "body", "name": "category_input", "required": true, "ref": "CategoryUpdateInput" },
            unauthorizedCallback: { "in": "res", "name": "401", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "details": { "dataType": "string", "required": true } } },
            notFoundCallback: { "in": "res", "name": "404", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "details": { "dataType": "string", "required": true } } },
            unprocessableCallback: { "in": "res", "name": "422", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "details": { "dataType": "string", "required": true } } },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new category_controller_1.CategoriesController();
            const promise = controller.putCategory.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.delete('/category', ...((0, runtime_1.fetchMiddlewares)(category_controller_1.CategoriesController)), ...((0, runtime_1.fetchMiddlewares)(category_controller_1.CategoriesController.prototype.deleteCategory)), function CategoriesController_deleteCategory(request, response, next) {
        const args = {
            authorization: { "in": "header", "name": "authorization", "required": true, "dataType": "string" },
            body_params: { "in": "body", "name": "body_params", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "category_ids": { "dataType": "array", "array": { "dataType": "string" }, "required": true } } },
            unauthorizedCallback: { "in": "res", "name": "401", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "details": { "dataType": "string", "required": true } } },
            notFoundCallback: { "in": "res", "name": "404", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "details": { "dataType": "string", "required": true } } },
            unprocessableCallback: { "in": "res", "name": "422", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "details": { "dataType": "string", "required": true } } },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new category_controller_1.CategoriesController();
            const promise = controller.deleteCategory.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/dishes/:restaurant_name', ...((0, runtime_1.fetchMiddlewares)(dish_controller_1.DishesController)), ...((0, runtime_1.fetchMiddlewares)(dish_controller_1.DishesController.prototype.getDishes)), function DishesController_getDishes(request, response, next) {
        const args = {
            restaurant_name: { "in": "path", "name": "restaurant_name", "required": true, "dataType": "string" },
            notFoundCallback: { "in": "res", "name": "404", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "details": { "dataType": "string", "required": true } } },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new dish_controller_1.DishesController();
            const promise = controller.getDishes.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/dishes/:restaurant_name/:category_id', ...((0, runtime_1.fetchMiddlewares)(dish_controller_1.DishesController)), ...((0, runtime_1.fetchMiddlewares)(dish_controller_1.DishesController.prototype.postDishes)), function DishesController_postDishes(request, response, next) {
        const args = {
            authorization: { "in": "header", "name": "authorization", "required": true, "dataType": "string" },
            restaurant_name: { "in": "path", "name": "restaurant_name", "required": true, "dataType": "string" },
            category_id: { "in": "path", "name": "category_id", "required": true, "dataType": "string" },
            dish_input: { "in": "body", "name": "dish_input", "required": true, "ref": "DishCreateInput" },
            unauthorizedCallback: { "in": "res", "name": "401", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "details": { "dataType": "string", "required": true } } },
            notFoundCallback: { "in": "res", "name": "404", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "details": { "dataType": "string", "required": true } } },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new dish_controller_1.DishesController();
            const promise = controller.postDishes.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.put('/dishes/:dish_id', ...((0, runtime_1.fetchMiddlewares)(dish_controller_1.DishesController)), ...((0, runtime_1.fetchMiddlewares)(dish_controller_1.DishesController.prototype.putDish)), function DishesController_putDish(request, response, next) {
        const args = {
            authorization: { "in": "header", "name": "authorization", "required": true, "dataType": "string" },
            dish_id: { "in": "path", "name": "dish_id", "required": true, "dataType": "string" },
            dish_input: { "in": "body", "name": "dish_input", "required": true, "ref": "DishUpdateInput" },
            unauthorizedCallback: { "in": "res", "name": "401", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "details": { "dataType": "string", "required": true } } },
            notFoundCallback: { "in": "res", "name": "404", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "details": { "dataType": "string", "required": true } } },
            unprocessableCallback: { "in": "res", "name": "422", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "details": { "dataType": "string", "required": true } } },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new dish_controller_1.DishesController();
            const promise = controller.putDish.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.delete('/dishes', ...((0, runtime_1.fetchMiddlewares)(dish_controller_1.DishesController)), ...((0, runtime_1.fetchMiddlewares)(dish_controller_1.DishesController.prototype.deleteDish)), function DishesController_deleteDish(request, response, next) {
        const args = {
            authorization: { "in": "header", "name": "authorization", "required": true, "dataType": "string" },
            body_params: { "in": "body", "name": "body_params", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "dish_ids": { "dataType": "array", "array": { "dataType": "string" }, "required": true } } },
            unauthorizedCallback: { "in": "res", "name": "401", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "details": { "dataType": "string", "required": true } } },
            notFoundCallback: { "in": "res", "name": "404", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "details": { "dataType": "string", "required": true } } },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new dish_controller_1.DishesController();
            const promise = controller.deleteDish.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/menu/:restaurant_name', ...((0, runtime_1.fetchMiddlewares)(menu_controller_1.MenuController)), ...((0, runtime_1.fetchMiddlewares)(menu_controller_1.MenuController.prototype.getMenu)), function MenuController_getMenu(request, response, next) {
        const args = {
            restaurant_name: { "in": "path", "name": "restaurant_name", "required": true, "dataType": "string" },
            notFoundCallback: { "in": "res", "name": "404", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "details": { "dataType": "string", "required": true } } },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new menu_controller_1.MenuController();
            const promise = controller.getMenu.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/rating/myRatings', ...((0, runtime_1.fetchMiddlewares)(rating_controller_1.RatingController)), ...((0, runtime_1.fetchMiddlewares)(rating_controller_1.RatingController.prototype.getMyRating)), function RatingController_getMyRating(request, response, next) {
        const args = {
            authorization: { "in": "header", "name": "authorization", "required": true, "dataType": "string" },
            unauthorizedCallback: { "in": "res", "name": "403", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "reason": { "dataType": "string", "required": true } } },
            status: { "in": "query", "name": "status", "dataType": "string" },
            city: { "in": "query", "name": "city", "dataType": "string" },
            search: { "in": "query", "name": "search", "dataType": "string" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new rating_controller_1.RatingController();
            const promise = controller.getMyRating.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/rating/:restaurant_name', ...((0, runtime_1.fetchMiddlewares)(rating_controller_1.RatingController)), ...((0, runtime_1.fetchMiddlewares)(rating_controller_1.RatingController.prototype.getRatings)), function RatingController_getRatings(request, response, next) {
        const args = {
            restaurant_name: { "in": "path", "name": "restaurant_name", "required": true, "dataType": "string" },
            unauthorizedCallback: { "in": "res", "name": "403", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "reason": { "dataType": "string", "required": true } } },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new rating_controller_1.RatingController();
            const promise = controller.getRatings.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/rating/stats/:restaurant_name', ...((0, runtime_1.fetchMiddlewares)(rating_controller_1.RatingController)), ...((0, runtime_1.fetchMiddlewares)(rating_controller_1.RatingController.prototype.getRatingStats)), function RatingController_getRatingStats(request, response, next) {
        const args = {
            restaurant_name: { "in": "path", "name": "restaurant_name", "required": true, "dataType": "string" },
            unauthorizedCallback: { "in": "res", "name": "403", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "reason": { "dataType": "string", "required": true } } },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new rating_controller_1.RatingController();
            const promise = controller.getRatingStats.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.put('/rating/:rating_id', ...((0, runtime_1.fetchMiddlewares)(rating_controller_1.RatingController)), ...((0, runtime_1.fetchMiddlewares)(rating_controller_1.RatingController.prototype.putRating)), function RatingController_putRating(request, response, next) {
        const args = {
            authorization: { "in": "header", "name": "authorization", "required": true, "dataType": "string" },
            rating_id: { "in": "path", "name": "rating_id", "required": true, "dataType": "string" },
            rating_record: { "in": "body", "name": "rating_record", "required": true, "ref": "UpdateRatingRecord" },
            unauthorizedCallback: { "in": "res", "name": "403", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "reason": { "dataType": "string", "required": true } } },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new rating_controller_1.RatingController();
            const promise = controller.putRating.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/restaurant', ...((0, runtime_1.fetchMiddlewares)(restaurant_controller_1.RestaurantController)), ...((0, runtime_1.fetchMiddlewares)(restaurant_controller_1.RestaurantController.prototype.getRestaurant)), function RestaurantController_getRestaurant(request, response, next) {
        const args = {
            name: { "in": "query", "name": "name", "dataType": "string" },
            city: { "in": "query", "name": "city", "dataType": "string" },
            restaurant_type: { "in": "query", "name": "restaurant_type", "dataType": "string" },
            country: { "in": "query", "name": "country", "dataType": "string" },
            sort: { "in": "query", "name": "sort", "dataType": "string" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new restaurant_controller_1.RestaurantController();
            const promise = controller.getRestaurant.apply(controller, validatedArgs);
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
