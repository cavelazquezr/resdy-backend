import csvParser from "csv-parser";
import fs from "fs";

export const readCSVFile = (filePath) => {
	return new Promise((resolve, reject) => {
		const json = [];

		fs.createReadStream(filePath)
			.pipe(csvParser())
			.on("data", (data) => {
				json.push(data as never);
			})
			.on("end", () => {
				resolve(json);
			})
			.on("error", (error) => {
				reject(error);
			});
	});
};
