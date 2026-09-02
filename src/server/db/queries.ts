import { and, desc, eq, ilike, inArray, isNotNull, or, sql } from "drizzle-orm";
import { unstable_cache } from "next/cache";
import { CACHE_DURATIONS, CACHE_TAGS } from "@/lib/cache";
import { getDb } from "./index";
import { competitions } from "./schema";
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
	const rows = await getDb()
		.select()
		.from(competitions)
		.orderBy(desc(competitions.createdAt));

	return rows as unknown as CompetitionRecord[];
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
	const rows = await getDb()
		.select()
		.from(competitions)
		.where(eq(competitions.id, id))
		.limit(1);

	return (rows[0] as unknown as CompetitionRecord) ?? null;
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
	const conditions = [];

	if (filter.category) {
		conditions.push(ilike(competitions.categories, filter.category));
	}

	if (filter.format) {
		conditions.push(
			eq(competitions.format, filter.format as "Online" | "Offline" | "Hybrid")
		);
	}

	if (filter.participationType) {
		conditions.push(
			eq(
				competitions.participationType,
				filter.participationType as "Individual" | "Team"
			)
		);
	}

	if (filter.status) {
		conditions.push(
			eq(
				competitions.status,
				filter.status as "draft" | "published" | "archived"
			)
		);
	}

	if (filter.search) {
		conditions.push(
			or(
				ilike(competitions.title, `%${filter.search}%`),
				ilike(competitions.description, `%${filter.search}%`)
			)
		);
	}

	const rows = await getDb()
		.select()
		.from(competitions)
		.where(conditions.length > 0 ? and(...conditions) : undefined)
		.orderBy(desc(competitions.createdAt));

	return rows as unknown as CompetitionRecord[];
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
	const rows = await getDb()
		.select()
		.from(competitions)
		.where(
			sql`${competitions.organizer}->>'name' ILIKE ${`%${organizerName}%`}`
		)
		.orderBy(desc(competitions.createdAt));

	return rows as unknown as CompetitionRecord[];
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
	const rows = await getDb()
		.select()
		.from(competitions)
		.where(ilike(competitions.categories, category))
		.orderBy(desc(competitions.createdAt));

	return rows as unknown as CompetitionRecord[];
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

	const rows = await getDb()
		.select()
		.from(competitions)
		.where(inArray(competitions.id, ids));

	return rows as unknown as CompetitionRecord[];
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
	const rows = await getDb()
		.select({
			organizer: competitions.organizer,
			categories: competitions.categories,
		})
		.from(competitions);

	const organizerMap = new Map<
		string,
		{ name: string; competitionCount: number; categories: Set<string> }
	>();

	(rows as { organizer: unknown; categories: string | null }[]).forEach(
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
	const rows = await getDb()
		.select({ categories: competitions.categories })
		.from(competitions)
		.where(isNotNull(competitions.categories));

	const categorySet = new Set<string>();
	(rows as { categories: string | null }[]).forEach((competition) => {
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
