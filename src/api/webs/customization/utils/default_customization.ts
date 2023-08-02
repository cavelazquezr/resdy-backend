import { Prisma } from "@prisma/client";

export const defaultCustomization: Prisma.CustomizationCreateWithoutWebInput = {
	colorPalette: {
		backgroundColor1: "placeholder",
		backgroundColor2: "placeholder",
		fontColor1: "placeholder",
		fontColor2: "placeholder",
		detailColor1: "placeholder",
		detailColor2: "placeholder",
	},
	fontFamilies: {
		font1: "placeholder",
		font2: "placeholder",
	},
	extraCustomization: {
		testField: "placeholder",
	},
	name: "Web name",
};
