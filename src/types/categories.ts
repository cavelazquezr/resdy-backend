export type allowedCategoriesRecord = {
	allowedCategories: CategoryCollection[];
};

export type CategoryCollection = {
	label: string;
	value: string;
	hasRecordUsingCategory?: boolean; // Add optional property here
};
