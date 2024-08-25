"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseSeedData = void 0;
const tslib_1 = require("tslib");
const csv_parser_1 = tslib_1.__importDefault(require("csv-parser"));
const path_1 = tslib_1.__importDefault(require("path"));
const fs_1 = tslib_1.__importDefault(require("fs"));
const parseTypeJson_1 = require("../utils/parseTypeJson");
const dataPath = path_1.default.join(__dirname, "../seed/dev-data");
const readCSVFile = (filePath) => {
    return new Promise((resolve, reject) => {
        const json = [];
        fs_1.default.createReadStream(filePath)
            .pipe((0, csv_parser_1.default)())
            .on("data", (data) => {
            json.push(data);
        })
            .on("end", () => {
            resolve(json);
        })
            .on("error", (error) => {
            reject(error);
        });
    });
};
const parseSeedData = async () => {
    const csvFiles = await new Promise((resolve, reject) => {
        const csvFileList = {};
        fs_1.default.readdir(dataPath, async (err, files) => {
            if (err) {
                reject(err);
            }
            const promises = files.map(async (file) => {
                const fileNameWithoutExtension = path_1.default.parse(file).name;
                try {
                    const json = await readCSVFile(`${dataPath}/${file}`);
                    const parsedJsonList = await Promise.all(json.map(async (item) => {
                        const newJson = await (0, parseTypeJson_1.parseTypeObject)(item);
                        return newJson;
                    }));
                    csvFileList[fileNameWithoutExtension] = parsedJsonList;
                }
                catch (err) {
                    console.log(err);
                    csvFileList[fileNameWithoutExtension] = [];
                }
            });
            Promise.all(promises)
                .then(() => resolve(csvFileList))
                .catch((error) => reject(error));
        });
    });
    return csvFiles;
};
exports.parseSeedData = parseSeedData;
