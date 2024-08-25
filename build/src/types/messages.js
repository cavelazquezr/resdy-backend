"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserStatus = void 0;
var UserStatus;
(function (UserStatus) {
    UserStatus["INVALID_TOKEN"] = "Token is invalid or expired";
    UserStatus["NOT_FOUND"] = "No entities were found";
    UserStatus["INCORRECT_CREDENTIALS"] = "Email or password are incorrect";
    UserStatus["UNAUTHORIZED"] = "Unauthorized access";
    UserStatus["USER_ALREADY_EXISTS"] = "User with the provided email already exists";
    UserStatus["USER_NOT_FOUND"] = "User with the provided email doesn't exist";
    UserStatus["WEB_ALREADY_EXISTS"] = "Web with the provided name already exists";
    UserStatus["WEB_DOESNT_EXIST"] = "You are trying to obtain properties from a website that does not exist";
    UserStatus["CATEGORY_ALREADY_EXISTS"] = "Category with the provided name already exists";
    UserStatus["CATEGORY_DOESNT_EXIST"] = "There is no categories for current restaurant yet";
    UserStatus["RATING_IS_FINISHED"] = "You can't update a finished rating";
})(UserStatus || (exports.UserStatus = UserStatus = {}));
