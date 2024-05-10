export const parseTypeObject = (inputObject) => {
	const resultObject = {};

	for (const key in inputObject) {
		if (inputObject.hasOwnProperty(key)) {
			const [propertyName, propertyType] = key.split(":");
			let value = inputObject[key];

			if (value === "") {
				value = null;
			}

			switch (propertyType) {
				case "String":
					resultObject[propertyName] = value;
					break;
				case "Boolean":
					if (value !== "TRUE" && value !== "FALSE") {
						throw new Error(`Invalid boolean value '${value}' for property '${propertyName}'`);
					}
					resultObject[propertyName] = value === "TRUE";
					break;
				case "Date":
					let dateValue: Date | null = null;
					if (value !== null) {
						dateValue = new Date(value);
					}
					resultObject[propertyName] = dateValue;
					if (dateValue && isNaN(dateValue.getTime())) {
						throw new Error(`Invalid date value '${value}' for property '${propertyName}'`);
					}
					break;
				case "Number":
					const numberValue = parseFloat(value);
					if (value !== null && isNaN(numberValue)) {
						throw new Error(`Invalid number value '${value}' for property '${propertyName}'`);
					}
					resultObject[propertyName] = numberValue;
					break;
				default:
					resultObject[propertyName] = value;
			}
		}
	}

	return resultObject;
};
