import { unstable_cache } from "next/cache";
import { CACHE_DURATIONS, CACHE_TAGS } from "@/lib/cache";
import { getSupabase } from "./index";
import type { CompetitionRecord } from "./types";

export interface FilterState {
	category?: string;
	level?: string;
	format?: string;
	participationType?: string;
	search?: string;
	status?: string;
}

// ========================================
// getAllCompetitions
// ========================================
export async function getAllCompetitions(): Promise<CompetitionRecord[]> {
	const { data, error } = await getSupabase()
		.from("competitions")
		.select("*")
		.order("createdAt", { ascending: false });

	if (error) throw error;
	return data as CompetitionRecord[];
}

export const getAllCompetitionsCached = unstable_cache(
	getAllCompetitions,
	["all-competitions"],
	{
		revalidate: CACHE_DURATIONS.MEDIUM,
		tags: [CACHE_TAGS.ALL_COMPETITIONS],
	}
);

// ========================================
// getCompetitionById
// ========================================
export async function getCompetitionById(
	id: string
): Promise<CompetitionRecord | null> {
	const { data, error } = await getSupabase()
		.from("competitions")
		.select("*")
		.eq("id", id)
		.limit(1)
		.single();

	if (error && error.code !== "PGRST116") return null; // PGRST116 = no rows found
	if (error) throw error;
	return data as CompetitionRecord;
}

export const getCompetitionByIdCached = unstable_cache(
	getCompetitionById,
	["competition-by-id"],
	{
		revalidate: CACHE_DURATIONS.LONG,
		tags: [CACHE_TAGS.ALL_COMPETITIONS],
	}
);

// ========================================
// getCompetitionsByFilter
// ========================================
export async function getCompetitionsByFilter(
	filter: FilterState
): Promise<CompetitionRecord[]> {
	let query = getSupabase().from("competitions").select("*");

	if (filter.category) {
		query = query.ilike("categories", filter.category);
	}

	if (filter.format) {
		query = query.eq("format", filter.format);
	}

	if (filter.participationType) {
		query = query.eq("participationType", filter.participationType);
	}

	if (filter.status) {
		query = query.eq("status", filter.status);
	}

	if (filter.search) {
		query = query.or(
			`title.ilike.%${filter.search}%,description.ilike.%${filter.search}%`
		);
	}

	const { data, error } = await query.order("createdAt", { ascending: false });

	if (error) throw error;
	return data as CompetitionRecord[];
}

export const getCompetitionsByFilterCached = unstable_cache(
	async (filter: FilterState) => getCompetitionsByFilter(filter),
	["competitions-by-filter"],
	{
		revalidate: CACHE_DURATIONS.SHORT,
		tags: [CACHE_TAGS.ALL_COMPETITIONS],
	}
);

// ========================================
// getCompetitionsByOrganizer
// ========================================
export async function getCompetitionsByOrganizer(
	organizerName: string
): Promise<CompetitionRecord[]> {
	// Use text filter for JSONB organizer->>'name' search
	const { data, error } = await getSupabase()
		.from("competitions")
		.select("*")
		.text(`organizer->>'name' ilike '%${organizerName}%'`)
		.order("createdAt", { ascending: false });

	if (error) throw error;
	return data as CompetitionRecord[];
}

export const getCompetitionsByOrganizerCached = unstable_cache(
	async (organizerName: string) => getCompetitionsByOrganizer(organizerName),
	["competitions-by-organizer"],
	{
		revalidate: CACHE_DURATIONS.MEDIUM,
		tags: [CACHE_TAGS.ALL_COMPETITIONS],
	}
);

// ========================================
// getCompetitionsByCategory
// ========================================
export async function getCompetitionsByCategory(
	category: string
): Promise<CompetitionRecord[]> {
	const { data, error } = await getSupabase()
		.from("competitions")
		.select("*")
		.ilike("categories", category)
		.order("createdAt", { ascending: false });

	if (error) throw error;
	return data as CompetitionRecord[];
}

export const getCompetitionsByCategoryCached = unstable_cache(
	async (category: string) => getCompetitionsByCategory(category),
	["competitions-by-category"],
	{
		revalidate: CACHE_DURATIONS.MEDIUM,
		tags: [CACHE_TAGS.ALL_COMPETITIONS],
	}
);

// ========================================
// getCompetitionsByIds (no persistent cache - dynamic IDs)
// ========================================
export async function getCompetitionsByIds(
	ids: string[]
): Promise<CompetitionRecord[]> {
	if (ids.length === 0) {
		return [];
	}

	const { data, error } = await getSupabase()
		.from("competitions")
		.select("*")
		.in("id", ids);

	if (error) throw error;
	return data as CompetitionRecord[];
}

// ========================================
// getAllOrganizers
// ========================================
interface Organizer {
	name: string;
	competitionCount: number;
	categories: Set<string>;
}

export async function getAllOrganizers(): Promise<Organizer[]> {
	const { data, error } = await getSupabase()
		.from("competitions")
		.select("organizer, categories");

	if (error) throw error;

	const organizerMap = new Map<
		string,
		{ name: string; competitionCount: number; categories: Set<string> }
	>();

	(data as { organizer: unknown; categories: string | null }[]).forEach(
		(competition) => {
			const org = competition.organizer as unknown;
			let name: string | null = null;

			if (Array.isArray(org) && org.length > 0 && typeof org[0] === "string") {
				name = org[0] as string;
			} else if (typeof org === "object" && org !== null && "name" in org) {
				name = (org as { name: string }).name;
			} else if (typeof org === "string") {
				name = org;
			}

			if (name) {
				if (organizerMap.has(name)) {
					const existing = organizerMap.get(name)!;
					existing.competitionCount += 1;
					if (competition.categories) {
						existing.categories.add(competition.categories);
					}
				} else {
					organizerMap.set(name, {
						name,
						competitionCount: 1,
						categories: new Set(
							competition.categories ? [competition.categories] : []
						),
					});
				}
			}
		}
	);

	return Array.from(organizerMap.values()).sort(
		(a, b) => b.competitionCount - a.competitionCount
	);
}

export const getAllOrganizersCached = unstable_cache(
	getAllOrganizers,
	["all-organizers"],
	{
		revalidate: CACHE_DURATIONS.LONG,
		tags: [CACHE_TAGS.ALL_ORGANIZERS],
	}
);

// ========================================
// getAllCategories
// ========================================
export async function getAllCategories(): Promise<string[]> {
	const { data, error } = await getSupabase()
		.from("competitions")
		.select("categories")
		.not("categories", "is", null);

	if (error) throw error;

	const categorySet = new Set<string>();
	(data as { categories: string | null }[]).forEach((competition) => {
		if (competition.categories) {
			const categoryMapping: Record<string, string> = {
				"Akademik & Sains": "Science",
				"Teknologi & IT": "Technology",
				"Seni & Kreatif": "Art",
				"Bisnis & Startup": "Business",
				"Olahraga & E-sports": "Sports",
				"Sastra & Bahasa": "Writing",
				"Sosial & Lingkungan": "Social",
				Keagamaan: "Social",
				"Gaya Hidup & Hobi": "Art",
				Lainnya: "Other",
			};
			categorySet.add(
				categoryMapping[competition.categories] || competition.categories
			);
		}
	});

	return Array.from(categorySet).sort();
}

export const getAllCategoriesCached = unstable_cache(
	getAllCategories,
	["all-categories"],
	{
		revalidate: CACHE_DURATIONS.LONG,
		tags: [CACHE_TAGS.ALL_CATEGORIES],
	}
);