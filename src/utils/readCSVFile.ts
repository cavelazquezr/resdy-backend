import csvParser from "csv-parser";
import path from "path";
import fs from "fs";
import { parseTypeObject } from "../utils/parseTypeJson";

const dataPath = path.join(__dirname, "../seed/dev-data");

const readCSVFile = (filePath) => {
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

export const parseSeedData = async () => {
	const csvFiles = await new Promise((resolve, reject) => {
		const csvFileList = {};
		fs.readdir(dataPath, async (err, files) => {
			if (err) {
				reject(err);
			}

			const promises = files.map(async (file) => {
				const fileNameWithoutExtension = path.parse(file).name;

				try {
					const json = await readCSVFile(`${dataPath}/${file}`);
					const parsedJsonList = await Promise.all(
						(json as Record<string, string>[]).map(async (item) => {
							const newJson = await parseTypeObject(item);
							return newJson;
						}),
					);

					csvFileList[fileNameWithoutExtension] = parsedJsonList as never;
				} catch (err) {
					console.log(err);
					csvFileList[fileNameWithoutExtension] = [] as never;
				}
			});
			Promise.all(promises)
				.then(() => resolve(csvFileList))
				.catch((error) => reject(error));
		});
	});

	return csvFiles;
};
