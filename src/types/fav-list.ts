export interface FavListItem {
	name?: string;
	brand_name?: string;
	logo_url?: string;
	city?: string;
	address?: string;
	rating?: number;
	rating_count?: number;
	price_average?: number;
}

export interface FavListOutput {
	id?: string;
	name?: string;
	preview_photo_url?: string;
	number_of_items?: number;
	SaveListItem?: FavListItemOut[];
}
interface FavListItemOut {
	id: string;
	list_id: string;
	list?: string;
	restaurant_id: string;
	restaurant?: string;
}
