"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const csv_parser_1 = tslib_1.__importDefault(require("csv-parser"));
const fs_1 = tslib_1.__importDefault(require("fs"));
const user_csv_1 = tslib_1.__importDefault(require("./user/user.csv"));
const seedDb = async () => {
    console.log("Hello, this is the CSV Parser test:");
    const stream = fs_1.default.createReadStream(user_csv_1.default).pipe((0, csv_parser_1.default)());
    console.log(stream);
};
seedDb();
