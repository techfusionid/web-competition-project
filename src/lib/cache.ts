import { unstable_cache } from "next/cache";

// Cache durations (in seconds)
export const CACHE_DURATIONS = {
	SHORT: 600, // 10 minutes
	MEDIUM: 1800, // 30 minutes
	LONG: 3600, // 1 hour
} as const;

// Cache tags for selective revalidation
export const CACHE_TAGS = {
	ALL_COMPETITIONS: "competitions:all",
	COMPETITION_BY_ID: (id: string) => `competition:${id}`,
	COMPETITIONS_BY_CATEGORY: (cat: string) => `competitions:category:${cat}`,
	COMPETITIONS_BY_ORGANIZER: (org: string) => `competitions:organizer:${org}`,
	ALL_CATEGORIES: "categories:all",
	ALL_ORGANIZERS: "organizers:all",
} as const;

// Type for cache options
export interface CacheOptions {
	revalidate: number;
	tags: string[];
}

// Helper function to create cached versions of query functions
export function createCachedQuery<T extends (...args: any[]) => Promise<any>>(
	fn: T,
	keyParts: string[],
	options: CacheOptions
): T {
	return unstable_cache(fn, keyParts, options) as T;
}
