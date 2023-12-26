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
const categories_controller_1 = require("./../src/api/menus/categories/categories.controller");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const dishes_controller_1 = require("./../src/api/menus/dishes/dishes.controller");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const users_controller_1 = require("./../src/api/users/users.controller");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const customization_controller_1 = require("./../src/api/webs/customization/customization.controller");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const information_controller_1 = require("./../src/api/webs/information/information.controller");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const webs_controller_1 = require("./../src/api/webs/webs.controller");
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
    "CategoryCollection": {
        "dataType": "refAlias",
        "type": { "dataType": "nestedObjectLiteral", "nestedProperties": { "hasRecordUsingCategory": { "dataType": "boolean" }, "value": { "dataType": "string", "required": true }, "label": { "dataType": "string", "required": true } }, "validators": {} },
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
    "Prisma.JsonValue": {
        "dataType": "refAlias",
        "type": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "double" }, { "dataType": "boolean" }, { "ref": "JsonObject" }, { "ref": "JsonArray" }, { "dataType": "enum", "enums": [null] }], "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DishesCategories": {
        "dataType": "refAlias",
        "type": { "dataType": "nestedObjectLiteral", "nestedProperties": { "webId": { "dataType": "string", "required": true }, "categories": { "dataType": "union", "subSchemas": [{ "ref": "Prisma.JsonValue" }, { "dataType": "enum", "enums": [null] }], "required": true } }, "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Prisma.Decimal": {
        "dataType": "refAlias",
        "type": { "dataType": "string", "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Dishes": {
        "dataType": "refAlias",
        "type": { "dataType": "nestedObjectLiteral", "nestedProperties": { "webId": { "dataType": "string", "required": true }, "allergen": { "dataType": "array", "array": { "dataType": "string" }, "required": true }, "description": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }], "required": true }, "price": { "ref": "Prisma.Decimal", "required": true }, "photoUrl": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }], "required": true }, "category": { "dataType": "string", "required": true }, "name": { "dataType": "string", "required": true }, "id": { "dataType": "string", "required": true } }, "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Decimal": {
        "dataType": "refAlias",
        "type": { "dataType": "string", "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "runtime.DecimalJsLike": {
        "dataType": "refObject",
        "properties": {
            "d": { "dataType": "array", "array": { "dataType": "double" }, "required": true },
            "e": { "dataType": "double", "required": true },
            "s": { "dataType": "double", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DecimalJsLike": {
        "dataType": "refAlias",
        "type": { "ref": "runtime.DecimalJsLike", "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Enumerable_string_": {
        "dataType": "refAlias",
        "type": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "array", "array": { "dataType": "string" } }], "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DishesCreateallergenInput": {
        "dataType": "refAlias",
        "type": { "dataType": "nestedObjectLiteral", "nestedProperties": { "set": { "ref": "Enumerable_string_", "required": true } }, "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Prisma.DishesCreateWithoutWebInput": {
        "dataType": "refAlias",
        "type": { "dataType": "nestedObjectLiteral", "nestedProperties": { "allergen": { "dataType": "union", "subSchemas": [{ "ref": "DishesCreateallergenInput" }, { "ref": "Enumerable_string_" }] }, "description": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }] }, "price": { "dataType": "union", "subSchemas": [{ "ref": "Decimal" }, { "ref": "DecimalJsLike" }, { "dataType": "double" }, { "dataType": "string" }], "required": true }, "photoUrl": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }] }, "category": { "dataType": "string", "required": true }, "name": { "dataType": "string", "required": true }, "id": { "dataType": "string" } }, "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "User": {
        "dataType": "refAlias",
        "type": { "dataType": "nestedObjectLiteral", "nestedProperties": { "isActive": { "dataType": "boolean", "required": true }, "dateCreated": { "dataType": "datetime", "required": true }, "password": { "dataType": "string", "required": true }, "lastname": { "dataType": "string", "required": true }, "firstname": { "dataType": "string", "required": true }, "email": { "dataType": "string", "required": true }, "id": { "dataType": "string", "required": true } }, "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Without_any.any_": {
        "dataType": "refAlias",
        "type": { "dataType": "nestedObjectLiteral", "nestedProperties": {}, "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "JsonNull": {
        "dataType": "refObject",
        "properties": {},
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "JsonNullValueInput": {
        "dataType": "refAlias",
        "type": { "ref": "JsonNull", "validators": {} },
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
        "type": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "double" }, { "dataType": "boolean" }, { "ref": "InputJsonObject" }, { "ref": "InputJsonArray" }], "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DbNull": {
        "dataType": "refObject",
        "properties": {},
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "NullableJsonNullValueInput": {
        "dataType": "refAlias",
        "type": { "dataType": "union", "subSchemas": [{ "ref": "JsonNull" }, { "ref": "DbNull" }], "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CustomizationUncheckedCreateWithoutWebInput": {
        "dataType": "refAlias",
        "type": { "dataType": "nestedObjectLiteral", "nestedProperties": { "updatedAt": { "dataType": "union", "subSchemas": [{ "dataType": "datetime" }, { "dataType": "string" }] }, "name": { "dataType": "string", "required": true }, "logoUrl": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }] }, "extraCustomization": { "dataType": "union", "subSchemas": [{ "ref": "NullableJsonNullValueInput" }, { "ref": "InputJsonValue" }] }, "fontFamilies": { "dataType": "union", "subSchemas": [{ "ref": "JsonNullValueInput" }, { "ref": "InputJsonValue" }], "required": true }, "colorPalette": { "dataType": "union", "subSchemas": [{ "ref": "JsonNullValueInput" }, { "ref": "InputJsonValue" }], "required": true } }, "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CustomizationCreateWithoutWebInput": {
        "dataType": "refAlias",
        "type": { "dataType": "nestedObjectLiteral", "nestedProperties": { "updatedAt": { "dataType": "union", "subSchemas": [{ "dataType": "datetime" }, { "dataType": "string" }] }, "name": { "dataType": "string", "required": true }, "logoUrl": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }] }, "extraCustomization": { "dataType": "union", "subSchemas": [{ "ref": "NullableJsonNullValueInput" }, { "ref": "InputJsonValue" }] }, "fontFamilies": { "dataType": "union", "subSchemas": [{ "ref": "JsonNullValueInput" }, { "ref": "InputJsonValue" }], "required": true }, "colorPalette": { "dataType": "union", "subSchemas": [{ "ref": "JsonNullValueInput" }, { "ref": "InputJsonValue" }], "required": true } }, "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "XOR_CustomizationCreateWithoutWebInput.CustomizationUncheckedCreateWithoutWebInput_": {
        "dataType": "refAlias",
        "type": { "dataType": "union", "subSchemas": [{ "dataType": "intersection", "subSchemas": [{ "ref": "Without_any.any_" }, { "ref": "CustomizationUncheckedCreateWithoutWebInput" }] }, { "dataType": "intersection", "subSchemas": [{ "ref": "Without_any.any_" }, { "ref": "CustomizationCreateWithoutWebInput" }] }], "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CustomizationWhereUniqueInput": {
        "dataType": "refAlias",
        "type": { "dataType": "nestedObjectLiteral", "nestedProperties": { "webId": { "dataType": "string" } }, "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CustomizationCreateOrConnectWithoutWebInput": {
        "dataType": "refAlias",
        "type": { "dataType": "nestedObjectLiteral", "nestedProperties": { "create": { "ref": "XOR_CustomizationCreateWithoutWebInput.CustomizationUncheckedCreateWithoutWebInput_", "required": true }, "where": { "ref": "CustomizationWhereUniqueInput", "required": true } }, "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CustomizationUncheckedCreateNestedOneWithoutWebInput": {
        "dataType": "refAlias",
        "type": { "dataType": "nestedObjectLiteral", "nestedProperties": { "connect": { "ref": "CustomizationWhereUniqueInput" }, "connectOrCreate": { "ref": "CustomizationCreateOrConnectWithoutWebInput" }, "create": { "ref": "XOR_CustomizationCreateWithoutWebInput.CustomizationUncheckedCreateWithoutWebInput_" } }, "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "WebInformationUncheckedCreateWithoutWebInput": {
        "dataType": "refAlias",
        "type": { "dataType": "nestedObjectLiteral", "nestedProperties": { "updatedAt": { "dataType": "union", "subSchemas": [{ "dataType": "datetime" }, { "dataType": "string" }] }, "extraInformation": { "dataType": "union", "subSchemas": [{ "ref": "NullableJsonNullValueInput" }, { "ref": "InputJsonValue" }] }, "location": { "dataType": "union", "subSchemas": [{ "ref": "NullableJsonNullValueInput" }, { "ref": "InputJsonValue" }] }, "restaurantType": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }] }, "socialMedia": { "dataType": "union", "subSchemas": [{ "ref": "NullableJsonNullValueInput" }, { "ref": "InputJsonValue" }] }, "country": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }] }, "city": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }] }, "address": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }] }, "phone": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }] } }, "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "WebInformationCreateWithoutWebInput": {
        "dataType": "refAlias",
        "type": { "dataType": "nestedObjectLiteral", "nestedProperties": { "updatedAt": { "dataType": "union", "subSchemas": [{ "dataType": "datetime" }, { "dataType": "string" }] }, "extraInformation": { "dataType": "union", "subSchemas": [{ "ref": "NullableJsonNullValueInput" }, { "ref": "InputJsonValue" }] }, "location": { "dataType": "union", "subSchemas": [{ "ref": "NullableJsonNullValueInput" }, { "ref": "InputJsonValue" }] }, "restaurantType": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }] }, "socialMedia": { "dataType": "union", "subSchemas": [{ "ref": "NullableJsonNullValueInput" }, { "ref": "InputJsonValue" }] }, "country": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }] }, "city": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }] }, "address": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }] }, "phone": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }] } }, "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "XOR_WebInformationCreateWithoutWebInput.WebInformationUncheckedCreateWithoutWebInput_": {
        "dataType": "refAlias",
        "type": { "dataType": "union", "subSchemas": [{ "dataType": "intersection", "subSchemas": [{ "ref": "Without_any.any_" }, { "ref": "WebInformationUncheckedCreateWithoutWebInput" }] }, { "dataType": "intersection", "subSchemas": [{ "ref": "Without_any.any_" }, { "ref": "WebInformationCreateWithoutWebInput" }] }], "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "WebInformationWhereUniqueInput": {
        "dataType": "refAlias",
        "type": { "dataType": "nestedObjectLiteral", "nestedProperties": { "webId": { "dataType": "string" } }, "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "WebInformationCreateOrConnectWithoutWebInput": {
        "dataType": "refAlias",
        "type": { "dataType": "nestedObjectLiteral", "nestedProperties": { "create": { "ref": "XOR_WebInformationCreateWithoutWebInput.WebInformationUncheckedCreateWithoutWebInput_", "required": true }, "where": { "ref": "WebInformationWhereUniqueInput", "required": true } }, "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "WebInformationUncheckedCreateNestedOneWithoutWebInput": {
        "dataType": "refAlias",
        "type": { "dataType": "nestedObjectLiteral", "nestedProperties": { "connect": { "ref": "WebInformationWhereUniqueInput" }, "connectOrCreate": { "ref": "WebInformationCreateOrConnectWithoutWebInput" }, "create": { "ref": "XOR_WebInformationCreateWithoutWebInput.WebInformationUncheckedCreateWithoutWebInput_" } }, "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DishesCategoriesUncheckedCreateWithoutWebInput": {
        "dataType": "refAlias",
        "type": { "dataType": "nestedObjectLiteral", "nestedProperties": { "categories": { "dataType": "union", "subSchemas": [{ "ref": "NullableJsonNullValueInput" }, { "ref": "InputJsonValue" }] } }, "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DishesCategoriesCreateWithoutWebInput": {
        "dataType": "refAlias",
        "type": { "dataType": "nestedObjectLiteral", "nestedProperties": { "categories": { "dataType": "union", "subSchemas": [{ "ref": "NullableJsonNullValueInput" }, { "ref": "InputJsonValue" }] } }, "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "XOR_DishesCategoriesCreateWithoutWebInput.DishesCategoriesUncheckedCreateWithoutWebInput_": {
        "dataType": "refAlias",
        "type": { "dataType": "union", "subSchemas": [{ "dataType": "intersection", "subSchemas": [{ "ref": "Without_any.any_" }, { "ref": "DishesCategoriesUncheckedCreateWithoutWebInput" }] }, { "dataType": "intersection", "subSchemas": [{ "ref": "Without_any.any_" }, { "ref": "DishesCategoriesCreateWithoutWebInput" }] }], "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DishesCategoriesWhereUniqueInput": {
        "dataType": "refAlias",
        "type": { "dataType": "nestedObjectLiteral", "nestedProperties": { "webId": { "dataType": "string" } }, "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DishesCategoriesCreateOrConnectWithoutWebInput": {
        "dataType": "refAlias",
        "type": { "dataType": "nestedObjectLiteral", "nestedProperties": { "create": { "ref": "XOR_DishesCategoriesCreateWithoutWebInput.DishesCategoriesUncheckedCreateWithoutWebInput_", "required": true }, "where": { "ref": "DishesCategoriesWhereUniqueInput", "required": true } }, "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DishesCategoriesUncheckedCreateNestedOneWithoutWebInput": {
        "dataType": "refAlias",
        "type": { "dataType": "nestedObjectLiteral", "nestedProperties": { "connect": { "ref": "DishesCategoriesWhereUniqueInput" }, "connectOrCreate": { "ref": "DishesCategoriesCreateOrConnectWithoutWebInput" }, "create": { "ref": "XOR_DishesCategoriesCreateWithoutWebInput.DishesCategoriesUncheckedCreateWithoutWebInput_" } }, "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DishesUncheckedCreateWithoutWebInput": {
        "dataType": "refAlias",
        "type": { "dataType": "nestedObjectLiteral", "nestedProperties": { "allergen": { "dataType": "union", "subSchemas": [{ "ref": "DishesCreateallergenInput" }, { "ref": "Enumerable_string_" }] }, "description": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }] }, "price": { "dataType": "union", "subSchemas": [{ "ref": "Decimal" }, { "ref": "DecimalJsLike" }, { "dataType": "double" }, { "dataType": "string" }], "required": true }, "photoUrl": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }] }, "category": { "dataType": "string", "required": true }, "name": { "dataType": "string", "required": true }, "id": { "dataType": "string" } }, "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DishesCreateWithoutWebInput": {
        "dataType": "refAlias",
        "type": { "dataType": "nestedObjectLiteral", "nestedProperties": { "allergen": { "dataType": "union", "subSchemas": [{ "ref": "DishesCreateallergenInput" }, { "ref": "Enumerable_string_" }] }, "description": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }] }, "price": { "dataType": "union", "subSchemas": [{ "ref": "Decimal" }, { "ref": "DecimalJsLike" }, { "dataType": "double" }, { "dataType": "string" }], "required": true }, "photoUrl": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }] }, "category": { "dataType": "string", "required": true }, "name": { "dataType": "string", "required": true }, "id": { "dataType": "string" } }, "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "XOR_Enumerable_DishesCreateWithoutWebInput_.Enumerable_DishesUncheckedCreateWithoutWebInput__": {
        "dataType": "refAlias",
        "type": { "dataType": "union", "subSchemas": [{ "dataType": "intersection", "subSchemas": [{ "ref": "Without_any.any_" }, { "ref": "DishesUncheckedCreateWithoutWebInput" }] }, { "dataType": "intersection", "subSchemas": [{ "ref": "Without_any.any_" }, { "ref": "DishesCreateWithoutWebInput" }] }, { "dataType": "intersection", "subSchemas": [{ "ref": "Without_any.any_" }, { "dataType": "array", "array": { "dataType": "refAlias", "ref": "DishesUncheckedCreateWithoutWebInput" } }] }, { "dataType": "intersection", "subSchemas": [{ "ref": "Without_any.any_" }, { "ref": "DishesCreateWithoutWebInput" }] }, { "dataType": "intersection", "subSchemas": [{ "ref": "Without_any.any_" }, { "ref": "DishesUncheckedCreateWithoutWebInput" }] }, { "dataType": "intersection", "subSchemas": [{ "ref": "Without_any.any_" }, { "dataType": "array", "array": { "dataType": "refAlias", "ref": "DishesCreateWithoutWebInput" } }] }, { "dataType": "intersection", "subSchemas": [{ "ref": "Without_any.any_" }, { "dataType": "array", "array": { "dataType": "refAlias", "ref": "DishesUncheckedCreateWithoutWebInput" } }] }, { "dataType": "intersection", "subSchemas": [{ "ref": "Without_any.any_" }, { "dataType": "array", "array": { "dataType": "refAlias", "ref": "DishesCreateWithoutWebInput" } }] }], "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DishesWhereUniqueInput": {
        "dataType": "refAlias",
        "type": { "dataType": "nestedObjectLiteral", "nestedProperties": { "id": { "dataType": "string" } }, "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "XOR_DishesCreateWithoutWebInput.DishesUncheckedCreateWithoutWebInput_": {
        "dataType": "refAlias",
        "type": { "dataType": "union", "subSchemas": [{ "dataType": "intersection", "subSchemas": [{ "ref": "Without_any.any_" }, { "ref": "DishesUncheckedCreateWithoutWebInput" }] }, { "dataType": "intersection", "subSchemas": [{ "ref": "Without_any.any_" }, { "ref": "DishesCreateWithoutWebInput" }] }], "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DishesCreateOrConnectWithoutWebInput": {
        "dataType": "refAlias",
        "type": { "dataType": "nestedObjectLiteral", "nestedProperties": { "create": { "ref": "XOR_DishesCreateWithoutWebInput.DishesUncheckedCreateWithoutWebInput_", "required": true }, "where": { "ref": "DishesWhereUniqueInput", "required": true } }, "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Enumerable_DishesCreateOrConnectWithoutWebInput_": {
        "dataType": "refAlias",
        "type": { "dataType": "union", "subSchemas": [{ "ref": "DishesCreateOrConnectWithoutWebInput" }, { "dataType": "array", "array": { "dataType": "refAlias", "ref": "DishesCreateOrConnectWithoutWebInput" } }], "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DishesCreateManyWebInput": {
        "dataType": "refAlias",
        "type": { "dataType": "nestedObjectLiteral", "nestedProperties": { "allergen": { "dataType": "union", "subSchemas": [{ "ref": "DishesCreateallergenInput" }, { "ref": "Enumerable_string_" }] }, "description": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }] }, "price": { "dataType": "union", "subSchemas": [{ "ref": "Decimal" }, { "ref": "DecimalJsLike" }, { "dataType": "double" }, { "dataType": "string" }], "required": true }, "photoUrl": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }] }, "category": { "dataType": "string", "required": true }, "name": { "dataType": "string", "required": true }, "id": { "dataType": "string" } }, "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Enumerable_DishesCreateManyWebInput_": {
        "dataType": "refAlias",
        "type": { "dataType": "union", "subSchemas": [{ "ref": "DishesCreateManyWebInput" }, { "dataType": "array", "array": { "dataType": "refAlias", "ref": "DishesCreateManyWebInput" } }], "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DishesCreateManyWebInputEnvelope": {
        "dataType": "refAlias",
        "type": { "dataType": "nestedObjectLiteral", "nestedProperties": { "skipDuplicates": { "dataType": "boolean" }, "data": { "ref": "Enumerable_DishesCreateManyWebInput_", "required": true } }, "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Enumerable_DishesWhereUniqueInput_": {
        "dataType": "refAlias",
        "type": { "dataType": "union", "subSchemas": [{ "ref": "DishesWhereUniqueInput" }, { "dataType": "array", "array": { "dataType": "refAlias", "ref": "DishesWhereUniqueInput" } }], "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DishesUncheckedCreateNestedManyWithoutWebInput": {
        "dataType": "refAlias",
        "type": { "dataType": "nestedObjectLiteral", "nestedProperties": { "connect": { "ref": "Enumerable_DishesWhereUniqueInput_" }, "createMany": { "ref": "DishesCreateManyWebInputEnvelope" }, "connectOrCreate": { "ref": "Enumerable_DishesCreateOrConnectWithoutWebInput_" }, "create": { "ref": "XOR_Enumerable_DishesCreateWithoutWebInput_.Enumerable_DishesUncheckedCreateWithoutWebInput__" } }, "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "RestaurantRatingsUncheckedCreateWithoutWebInput": {
        "dataType": "refAlias",
        "type": { "dataType": "nestedObjectLiteral", "nestedProperties": { "ratings": { "dataType": "union", "subSchemas": [{ "ref": "NullableJsonNullValueInput" }, { "ref": "InputJsonValue" }] } }, "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "RestaurantRatingsCreateWithoutWebInput": {
        "dataType": "refAlias",
        "type": { "dataType": "nestedObjectLiteral", "nestedProperties": { "ratings": { "dataType": "union", "subSchemas": [{ "ref": "NullableJsonNullValueInput" }, { "ref": "InputJsonValue" }] } }, "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "XOR_RestaurantRatingsCreateWithoutWebInput.RestaurantRatingsUncheckedCreateWithoutWebInput_": {
        "dataType": "refAlias",
        "type": { "dataType": "union", "subSchemas": [{ "dataType": "intersection", "subSchemas": [{ "ref": "Without_any.any_" }, { "ref": "RestaurantRatingsUncheckedCreateWithoutWebInput" }] }, { "dataType": "intersection", "subSchemas": [{ "ref": "Without_any.any_" }, { "ref": "RestaurantRatingsCreateWithoutWebInput" }] }], "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "RestaurantRatingsWhereUniqueInput": {
        "dataType": "refAlias",
        "type": { "dataType": "nestedObjectLiteral", "nestedProperties": { "webId": { "dataType": "string" } }, "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "RestaurantRatingsCreateOrConnectWithoutWebInput": {
        "dataType": "refAlias",
        "type": { "dataType": "nestedObjectLiteral", "nestedProperties": { "create": { "ref": "XOR_RestaurantRatingsCreateWithoutWebInput.RestaurantRatingsUncheckedCreateWithoutWebInput_", "required": true }, "where": { "ref": "RestaurantRatingsWhereUniqueInput", "required": true } }, "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "RestaurantRatingsUncheckedCreateNestedOneWithoutWebInput": {
        "dataType": "refAlias",
        "type": { "dataType": "nestedObjectLiteral", "nestedProperties": { "connect": { "ref": "RestaurantRatingsWhereUniqueInput" }, "connectOrCreate": { "ref": "RestaurantRatingsCreateOrConnectWithoutWebInput" }, "create": { "ref": "XOR_RestaurantRatingsCreateWithoutWebInput.RestaurantRatingsUncheckedCreateWithoutWebInput_" } }, "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "WebUncheckedCreateWithoutAdminInput": {
        "dataType": "refAlias",
        "type": { "dataType": "nestedObjectLiteral", "nestedProperties": { "restaurantRatings": { "ref": "RestaurantRatingsUncheckedCreateNestedOneWithoutWebInput" }, "dishes": { "ref": "DishesUncheckedCreateNestedManyWithoutWebInput" }, "dishesCategories": { "ref": "DishesCategoriesUncheckedCreateNestedOneWithoutWebInput" }, "webInformation": { "ref": "WebInformationUncheckedCreateNestedOneWithoutWebInput" }, "customization": { "ref": "CustomizationUncheckedCreateNestedOneWithoutWebInput" }, "name": { "dataType": "string", "required": true }, "id": { "dataType": "string" } }, "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CustomizationCreateNestedOneWithoutWebInput": {
        "dataType": "refAlias",
        "type": { "dataType": "nestedObjectLiteral", "nestedProperties": { "connect": { "ref": "CustomizationWhereUniqueInput" }, "connectOrCreate": { "ref": "CustomizationCreateOrConnectWithoutWebInput" }, "create": { "ref": "XOR_CustomizationCreateWithoutWebInput.CustomizationUncheckedCreateWithoutWebInput_" } }, "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "WebInformationCreateNestedOneWithoutWebInput": {
        "dataType": "refAlias",
        "type": { "dataType": "nestedObjectLiteral", "nestedProperties": { "connect": { "ref": "WebInformationWhereUniqueInput" }, "connectOrCreate": { "ref": "WebInformationCreateOrConnectWithoutWebInput" }, "create": { "ref": "XOR_WebInformationCreateWithoutWebInput.WebInformationUncheckedCreateWithoutWebInput_" } }, "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DishesCategoriesCreateNestedOneWithoutWebInput": {
        "dataType": "refAlias",
        "type": { "dataType": "nestedObjectLiteral", "nestedProperties": { "connect": { "ref": "DishesCategoriesWhereUniqueInput" }, "connectOrCreate": { "ref": "DishesCategoriesCreateOrConnectWithoutWebInput" }, "create": { "ref": "XOR_DishesCategoriesCreateWithoutWebInput.DishesCategoriesUncheckedCreateWithoutWebInput_" } }, "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DishesCreateNestedManyWithoutWebInput": {
        "dataType": "refAlias",
        "type": { "dataType": "nestedObjectLiteral", "nestedProperties": { "connect": { "ref": "Enumerable_DishesWhereUniqueInput_" }, "createMany": { "ref": "DishesCreateManyWebInputEnvelope" }, "connectOrCreate": { "ref": "Enumerable_DishesCreateOrConnectWithoutWebInput_" }, "create": { "ref": "XOR_Enumerable_DishesCreateWithoutWebInput_.Enumerable_DishesUncheckedCreateWithoutWebInput__" } }, "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "RestaurantRatingsCreateNestedOneWithoutWebInput": {
        "dataType": "refAlias",
        "type": { "dataType": "nestedObjectLiteral", "nestedProperties": { "connect": { "ref": "RestaurantRatingsWhereUniqueInput" }, "connectOrCreate": { "ref": "RestaurantRatingsCreateOrConnectWithoutWebInput" }, "create": { "ref": "XOR_RestaurantRatingsCreateWithoutWebInput.RestaurantRatingsUncheckedCreateWithoutWebInput_" } }, "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "WebCreateWithoutAdminInput": {
        "dataType": "refAlias",
        "type": { "dataType": "nestedObjectLiteral", "nestedProperties": { "restaurantRatings": { "ref": "RestaurantRatingsCreateNestedOneWithoutWebInput" }, "dishes": { "ref": "DishesCreateNestedManyWithoutWebInput" }, "dishesCategories": { "ref": "DishesCategoriesCreateNestedOneWithoutWebInput" }, "webInformation": { "ref": "WebInformationCreateNestedOneWithoutWebInput" }, "customization": { "ref": "CustomizationCreateNestedOneWithoutWebInput" }, "name": { "dataType": "string", "required": true }, "id": { "dataType": "string" } }, "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "XOR_Enumerable_WebCreateWithoutAdminInput_.Enumerable_WebUncheckedCreateWithoutAdminInput__": {
        "dataType": "refAlias",
        "type": { "dataType": "union", "subSchemas": [{ "dataType": "intersection", "subSchemas": [{ "ref": "Without_any.any_" }, { "ref": "WebUncheckedCreateWithoutAdminInput" }] }, { "dataType": "intersection", "subSchemas": [{ "ref": "Without_any.any_" }, { "ref": "WebCreateWithoutAdminInput" }] }, { "dataType": "intersection", "subSchemas": [{ "ref": "Without_any.any_" }, { "dataType": "array", "array": { "dataType": "refAlias", "ref": "WebUncheckedCreateWithoutAdminInput" } }] }, { "dataType": "intersection", "subSchemas": [{ "ref": "Without_any.any_" }, { "ref": "WebCreateWithoutAdminInput" }] }, { "dataType": "intersection", "subSchemas": [{ "ref": "Without_any.any_" }, { "ref": "WebUncheckedCreateWithoutAdminInput" }] }, { "dataType": "intersection", "subSchemas": [{ "ref": "Without_any.any_" }, { "dataType": "array", "array": { "dataType": "refAlias", "ref": "WebCreateWithoutAdminInput" } }] }, { "dataType": "intersection", "subSchemas": [{ "ref": "Without_any.any_" }, { "dataType": "array", "array": { "dataType": "refAlias", "ref": "WebUncheckedCreateWithoutAdminInput" } }] }, { "dataType": "intersection", "subSchemas": [{ "ref": "Without_any.any_" }, { "dataType": "array", "array": { "dataType": "refAlias", "ref": "WebCreateWithoutAdminInput" } }] }], "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "WebWhereUniqueInput": {
        "dataType": "refAlias",
        "type": { "dataType": "nestedObjectLiteral", "nestedProperties": { "name": { "dataType": "string" }, "id": { "dataType": "string" } }, "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "XOR_WebCreateWithoutAdminInput.WebUncheckedCreateWithoutAdminInput_": {
        "dataType": "refAlias",
        "type": { "dataType": "union", "subSchemas": [{ "dataType": "intersection", "subSchemas": [{ "ref": "Without_any.any_" }, { "ref": "WebUncheckedCreateWithoutAdminInput" }] }, { "dataType": "intersection", "subSchemas": [{ "ref": "Without_any.any_" }, { "ref": "WebCreateWithoutAdminInput" }] }], "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "WebCreateOrConnectWithoutAdminInput": {
        "dataType": "refAlias",
        "type": { "dataType": "nestedObjectLiteral", "nestedProperties": { "create": { "ref": "XOR_WebCreateWithoutAdminInput.WebUncheckedCreateWithoutAdminInput_", "required": true }, "where": { "ref": "WebWhereUniqueInput", "required": true } }, "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Enumerable_WebCreateOrConnectWithoutAdminInput_": {
        "dataType": "refAlias",
        "type": { "dataType": "union", "subSchemas": [{ "ref": "WebCreateOrConnectWithoutAdminInput" }, { "dataType": "array", "array": { "dataType": "refAlias", "ref": "WebCreateOrConnectWithoutAdminInput" } }], "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "WebCreateManyAdminInput": {
        "dataType": "refAlias",
        "type": { "dataType": "nestedObjectLiteral", "nestedProperties": { "name": { "dataType": "string", "required": true }, "id": { "dataType": "string" } }, "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Enumerable_WebCreateManyAdminInput_": {
        "dataType": "refAlias",
        "type": { "dataType": "union", "subSchemas": [{ "ref": "WebCreateManyAdminInput" }, { "dataType": "array", "array": { "dataType": "refAlias", "ref": "WebCreateManyAdminInput" } }], "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "WebCreateManyAdminInputEnvelope": {
        "dataType": "refAlias",
        "type": { "dataType": "nestedObjectLiteral", "nestedProperties": { "skipDuplicates": { "dataType": "boolean" }, "data": { "ref": "Enumerable_WebCreateManyAdminInput_", "required": true } }, "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Enumerable_WebWhereUniqueInput_": {
        "dataType": "refAlias",
        "type": { "dataType": "union", "subSchemas": [{ "ref": "WebWhereUniqueInput" }, { "dataType": "array", "array": { "dataType": "refAlias", "ref": "WebWhereUniqueInput" } }], "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "WebCreateNestedManyWithoutAdminInput": {
        "dataType": "refAlias",
        "type": { "dataType": "nestedObjectLiteral", "nestedProperties": { "connect": { "ref": "Enumerable_WebWhereUniqueInput_" }, "createMany": { "ref": "WebCreateManyAdminInputEnvelope" }, "connectOrCreate": { "ref": "Enumerable_WebCreateOrConnectWithoutAdminInput_" }, "create": { "ref": "XOR_Enumerable_WebCreateWithoutAdminInput_.Enumerable_WebUncheckedCreateWithoutAdminInput__" } }, "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Prisma.UserCreateInput": {
        "dataType": "refAlias",
        "type": { "dataType": "nestedObjectLiteral", "nestedProperties": { "webs": { "ref": "WebCreateNestedManyWithoutAdminInput" }, "isActive": { "dataType": "boolean" }, "dateCreated": { "dataType": "union", "subSchemas": [{ "dataType": "datetime" }, { "dataType": "string" }] }, "password": { "dataType": "string", "required": true }, "lastname": { "dataType": "string", "required": true }, "firstname": { "dataType": "string", "required": true }, "email": { "dataType": "string", "required": true }, "id": { "dataType": "string" } }, "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UpdateUser": {
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
    "Prisma.JsonObject": {
        "dataType": "refAlias",
        "type": { "dataType": "nestedObjectLiteral", "nestedProperties": {}, "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "WebOutput": {
        "dataType": "refObject",
        "properties": {
            "id": { "dataType": "string" },
            "name": { "dataType": "string" },
            "phone": { "dataType": "string" },
            "address": { "dataType": "string" },
            "country": { "dataType": "string" },
            "city": { "dataType": "string" },
            "restaurantType": { "dataType": "string" },
            "location": { "ref": "Prisma.JsonObject" },
            "priceAverage": { "dataType": "double", "required": true },
            "ratings": { "dataType": "double" },
            "ratingStarts": { "dataType": "double" },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Web": {
        "dataType": "refAlias",
        "type": { "dataType": "nestedObjectLiteral", "nestedProperties": { "adminId": { "dataType": "string", "required": true }, "name": { "dataType": "string", "required": true }, "id": { "dataType": "string", "required": true } }, "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Prisma.WebCreateWithoutAdminInput": {
        "dataType": "refAlias",
        "type": { "dataType": "nestedObjectLiteral", "nestedProperties": { "restaurantRatings": { "ref": "RestaurantRatingsCreateNestedOneWithoutWebInput" }, "dishes": { "ref": "DishesCreateNestedManyWithoutWebInput" }, "dishesCategories": { "ref": "DishesCategoriesCreateNestedOneWithoutWebInput" }, "webInformation": { "ref": "WebInformationCreateNestedOneWithoutWebInput" }, "customization": { "ref": "CustomizationCreateNestedOneWithoutWebInput" }, "name": { "dataType": "string", "required": true }, "id": { "dataType": "string" } }, "validators": {} },
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
    app.get('/webs/categories/:webId', ...((0, runtime_1.fetchMiddlewares)(categories_controller_1.CategoriesController)), ...((0, runtime_1.fetchMiddlewares)(categories_controller_1.CategoriesController.prototype.getCategories)), function CategoriesController_getCategories(request, response, next) {
        const args = {
            webId: { "in": "path", "name": "webId", "required": true, "dataType": "string" },
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
    app.put('/webs/categories/:webId', ...((0, runtime_1.fetchMiddlewares)(categories_controller_1.CategoriesController)), ...((0, runtime_1.fetchMiddlewares)(categories_controller_1.CategoriesController.prototype.putCategory)), function CategoriesController_putCategory(request, response, next) {
        const args = {
            authorization: { "in": "header", "name": "authorization", "required": true, "dataType": "string" },
            webId: { "in": "path", "name": "webId", "required": true, "dataType": "string" },
            category: { "in": "body", "name": "category", "required": true, "ref": "CategoryCollection" },
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
    app.delete('/webs/categories/:webId', ...((0, runtime_1.fetchMiddlewares)(categories_controller_1.CategoriesController)), ...((0, runtime_1.fetchMiddlewares)(categories_controller_1.CategoriesController.prototype.deleteWeb)), function CategoriesController_deleteWeb(request, response, next) {
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
    app.get('/webs/dishes/:webId', ...((0, runtime_1.fetchMiddlewares)(dishes_controller_1.DishesController)), ...((0, runtime_1.fetchMiddlewares)(dishes_controller_1.DishesController.prototype.getDishes)), function DishesController_getDishes(request, response, next) {
        const args = {
            webId: { "in": "path", "name": "webId", "required": true, "dataType": "string" },
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
    app.post('/webs/dishes/:webId', ...((0, runtime_1.fetchMiddlewares)(dishes_controller_1.DishesController)), ...((0, runtime_1.fetchMiddlewares)(dishes_controller_1.DishesController.prototype.postDishes)), function DishesController_postDishes(request, response, next) {
        const args = {
            authorization: { "in": "header", "name": "authorization", "required": true, "dataType": "string" },
            webId: { "in": "path", "name": "webId", "required": true, "dataType": "string" },
            dish: { "in": "body", "name": "dish", "required": true, "ref": "Prisma.DishesCreateWithoutWebInput" },
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
            user: { "in": "body", "name": "user", "required": true, "ref": "Prisma.UserCreateInput" },
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
            user: { "in": "body", "name": "user", "required": true, "ref": "UpdateUser" },
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
    app.put('/webs/customization', ...((0, runtime_1.fetchMiddlewares)(customization_controller_1.CustomizationController)), ...((0, runtime_1.fetchMiddlewares)(customization_controller_1.CustomizationController.prototype.putCustomization)), function CustomizationController_putCustomization(request, response, next) {
        const args = {};
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
    app.put('/webs/information', ...((0, runtime_1.fetchMiddlewares)(information_controller_1.InformationController)), ...((0, runtime_1.fetchMiddlewares)(information_controller_1.InformationController.prototype.putInformation)), function InformationController_putInformation(request, response, next) {
        const args = {};
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
    app.get('/webs', ...((0, runtime_1.fetchMiddlewares)(webs_controller_1.WebsController)), ...((0, runtime_1.fetchMiddlewares)(webs_controller_1.WebsController.prototype.getWebs)), function WebsController_getWebs(request, response, next) {
        const args = {
            unauthorizedCallback: { "in": "res", "name": "403", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "reason": { "dataType": "string", "required": true } } },
            name: { "in": "query", "name": "name", "dataType": "string" },
            city: { "in": "query", "name": "city", "dataType": "string" },
            restautantType: { "in": "query", "name": "restautantType", "dataType": "string" },
            country: { "in": "query", "name": "country", "dataType": "string" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new webs_controller_1.WebsController();
            const promise = controller.getWebs.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/webs', ...((0, runtime_1.fetchMiddlewares)(webs_controller_1.WebsController)), ...((0, runtime_1.fetchMiddlewares)(webs_controller_1.WebsController.prototype.postWeb)), function WebsController_postWeb(request, response, next) {
        const args = {
            authorization: { "in": "header", "name": "authorization", "required": true, "dataType": "string" },
            web: { "in": "body", "name": "web", "required": true, "ref": "Prisma.WebCreateWithoutAdminInput" },
            unauthorizedCallback: { "in": "res", "name": "403", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "reason": { "dataType": "string", "required": true } } },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new webs_controller_1.WebsController();
            const promise = controller.postWeb.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.put('/webs', ...((0, runtime_1.fetchMiddlewares)(webs_controller_1.WebsController)), ...((0, runtime_1.fetchMiddlewares)(webs_controller_1.WebsController.prototype.putWeb)), function WebsController_putWeb(request, response, next) {
        const args = {};
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new webs_controller_1.WebsController();
            const promise = controller.putWeb.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.delete('/webs', ...((0, runtime_1.fetchMiddlewares)(webs_controller_1.WebsController)), ...((0, runtime_1.fetchMiddlewares)(webs_controller_1.WebsController.prototype.deleteWeb)), function WebsController_deleteWeb(request, response, next) {
        const args = {};
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new webs_controller_1.WebsController();
            const promise = controller.deleteWeb.apply(controller, validatedArgs);
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
