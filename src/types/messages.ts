export enum UserStatus {
  NOT_FOUND = "No entities were found",
  INCORRECT_CREDENTIALS = "Email or password are incorrect",
  UNAUTHORIZED = "Unauthorized access",
  USER_ALREADY_EXISTS = "User with the provided email already exists",
  USER_NOT_FOUND = "User with the provided email doesn't exist",
  WEB_ALREADY_EXISTS = "Web with the provided name already exists",
  WEB_DOESNT_EXIST = "You are trying to obtain properties from a website that does not exist",
  CATEGORY_ALREADY_EXISTS = "Category with the provided name already exists",
  CATEGORY_DOESNT_EXIST = "There is no categories for current restaurant yet",
}
