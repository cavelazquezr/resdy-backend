export interface RatingStatsOutput {
	rating: string;
	rating_count: number;
	stats: Record<number, number>;
}
