"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserStatus = void 0;
var UserStatus;
(function (UserStatus) {
    UserStatus["NOT_FOUND"] = "No entities were found";
    UserStatus["INCORRECT_CREDENTIALS"] = "Email or password are incorrect";
    UserStatus["UNAUTHORIZED"] = "Unauthorized access";
    UserStatus["WEB_ALREADY_EXISTS"] = "Web with the provided name already exists";
    UserStatus["WEB_DOESNT_EXIST"] = "You are trying to obtain properties from a website that does not exist";
    UserStatus["CATEGORY_ALREADY_EXISTS"] = "Category with the provided name already exists";
    UserStatus["CATEGORY_DOESNT_EXIST"] = "There is no categories for current restaurant yet";
})(UserStatus || (exports.UserStatus = UserStatus = {}));
