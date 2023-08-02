import { Prisma } from "@prisma/client";

export const restaurants: Prisma.WebCreateWithoutAdminInput[] = [
	{
		name: "adminrestaurant",
		customization: {
			create: {
				colorPalette: {
					backgroundColor1: "#FFFFFF",
					backgroundColor2: "#F0F0F0",
					fontColor1: "#171717",
					fontColor2: "#FFFFFF",
					primaryColor: "#CCF381",
					secondaryColor: "#4831D4",
				},
				fontFamilies: {
					font1: "Work Sans",
					font2: "Inter",
				},
				extraCustomization: {
					testField: "placeholder",
				},
				name: "Admin restaurant",
				logoUrl: "https://img.logoipsum.com/284.svg",
			},
		},
		webInformation: {
			create: {
				phone: "123456789",
				address: "Gran Via, 26",
				city: "Madrid",
				country: "Spain",
				socialMedia: {
					x: "admin",
					instagram: "admin",
					tiktok: "admin",
				},
				restaurantType: "chinese",
				location: {
					latitude: 40.420184,
					longitude: -3.701338,
				},
				extraInformation: {
					description: "Web seeded for testing",
				},
			},
		},
		dishesCategories: {
			create: {
				categories: [
					{
						label: "Principal",
						value: "principal",
					},
					{
						label: "Desserts",
						value: "desserts",
					},
				],
			},
		},
		dishes: {
			create: [
				{
					name: "Kung Pao Chicken",
					category: "principal",
					price: 12.99,
					photoUrl:
						"https://images.chinahighlights.com/allpicture/2019/11/31acb7b302ec4b48b17443ed_cut_750x400_39.webp",
					description:
						"Kung Pao Chicken (宫保鸡丁 gōngbào jīdīng). The major ingredients are diced chicken, dried chili, cucumber, and fried peanuts (or cashews)",
				},
				{
					name: "Sweet and Sour Pork",
					category: "principal",
					price: 10.99,
					photoUrl:
						"https://images.chinahighlights.com/allpicture/2019/11/a4ad4a7fe0cb401cb0be6383_cut_750x400_39.webp",
					description:
						"Sweet and sour pork (糖醋里脊 tángcù lǐjǐ) has a bright orange-red color, and a delicious sweet and sour taste.",
				},
				{
					name: "Dumplings",
					category: "principal",
					price: 8.99,
					photoUrl:
						"https://images.chinahighlights.com/allpicture/2018/08/16d96371fd2944be86ffbdc1_cut_750x400_39.webp",
					description:
						"Dumplings (饺子 jiǎozi) are a traditional food type that is widely popular, especially in North China. Chinese dumplings consist of minced meat and/or chopped vegetables wrapped in a thin dough skin. Popular fillings are minced pork, diced shrimp, ground chicken, beef, and vegetables. Dumplings can be cooked by boiling, steaming, or frying.",
				},
				{
					name: "Tanghulu",
					category: "desserts",
					price: 6.49,
					photoUrl:
						"https://images.chinahighlights.com/allpicture/2018/08/16d96371fd2944be86ffbdc1_cut_750x400_39.webp",
					description:
						"Tanghulu, the Chinese toffee apple is an old Beijing-style snack consisting of a skewer with crabapples dipped in liquid sugar and dried.",
				},
				{
					name: "Pumpkin Pancake",
					category: "desserts",
					price: 6.99,
					photoUrl:
						"https://images.chinahighlights.com/allpicture/2018/08/16d96371fd2944be86ffbdc1_cut_750x400_39.webp",
					description:
						"Pumpkin pancakes are easily described: they are deep fried pumpkin pancakes consisting mainly of pumpkin, sugar, and flour.",
				},
			],
		},
	},
	{
		name: "testrestaurant",
		customization: {
			create: {
				colorPalette: {
					backgroundColor1: "#FFFFFF",
					backgroundColor2: "#F0F0F0",
					fontColor1: "#171717",
					fontColor2: "#FFFFFF",
					primaryColor: "#E2D1F9",
					secondaryColor: "#317773",
				},
				fontFamilies: {
					font1: "Work Sans",
					font2: "Inter",
				},
				extraCustomization: {
					testField: "placeholder",
				},
				name: "Test restaurant",
				logoUrl: "https://img.logoipsum.com/291.svg",
			},
		},
		webInformation: {
			create: {
				phone: "123456788",
				address: "Calle de Girona 164",
				city: "Barcelona",
				country: "Spain",
				socialMedia: {
					x: "test",
					instagram: "test",
					tiktok: "test",
				},
				restaurantType: "japanese",
				location: {
					latitude: 41.399794,
					longitude: 2.165255,
				},
				extraInformation: {
					description: "Web seeded for testing",
				},
			},
		},
		dishesCategories: {
			create: {
				categories: [
					{
						label: "Principal",
						value: "principal",
					},
					{
						label: "Desserts",
						value: "desserts",
					},
				],
			},
		},
		dishes: {
			create: [
				{
					name: "Kotteri",
					category: "principal",
					price: 12.99,
					photoUrl:
						"https://www.tastingtable.com/img/gallery/27-types-of-ramen-explained/kotteri-or-paitan-broth-1673379226.webp",
					description:
						"The menu will likely describe this style of rich and dense broth as paitan (referring to the broth's cloudy, white color) or tonkatsu (a specific kotteri broth made with pork bones). Kotteri has several translations from Japanese, but the words heavy, thick, or dense are commonly used to describe the ramen broth. Kotteri is made by boiling bones at high heats",
				},
				{
					name: "Assari",
					category: "principal",
					price: 10.99,
					photoUrl:
						"https://www.tastingtable.com/img/gallery/27-types-of-ramen-explained/assari-or-chintan-broth-1673379226.webp",
					description:
						"Yamato Noodle Japan describes this broth as light or unsaturated and notes that it's significantly less dense than kotteri ramen. You may hear assari referred to as chintan, which describes its clear character. This soup is also made with pork or chicken bones but lacks kotteri's white color because it's simmered more slowly over low heat to prevent cloudiness.",
				},
				{
					name: "Sesame cookies",
					category: "desserts",
					price: 6.99,
					photoUrl:
						"https://www.justonecookbook.com/wp-content/uploads/2020/01/Sesame-Cookies-1542-II.jpg",
					description:
						"Give your icebox cookies a Japanese spin with these sesame cookies. Flavored with black sesame, the cookies are sweet yet nutty and savory at the same time. They will stand out amongst the rest of your holiday sweets and baked goods.",
				},
			],
		},
	},
];
