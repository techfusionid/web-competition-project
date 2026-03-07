import { db, competitions } from "./index";
import { and, eq, ilike, sql, desc, gte, lte } from "drizzle-orm";

export interface FilterState {
	category?: string;
	level?: string;
	format?: string;
	participationType?: string;
	search?: string;
	status?: string;
}

export async function getAllCompetitions() {
	const allCompetitions = await db
		.select()
		.from(competitions)
		.orderBy(desc(competitions.createdAt));
	return allCompetitions;
}

export async function getCompetitionById(id: string) {
	const [competition] = await db
		.select()
		.from(competitions)
		.where(eq(competitions.id, id))
		.limit(1);
	return competition || null;
}

export async function getCompetitionsByFilter(filter: FilterState) {
	const conditions = [];

	if (filter.category) {
		conditions.push(ilike(competitions.categories, filter.category));
	}

	if (filter.format) {
		conditions.push(eq(competitions.format, filter.format as any));
	}

	if (filter.participationType) {
		conditions.push(
			eq(competitions.participationType, filter.participationType as any)
		);
	}

	if (filter.status) {
		conditions.push(eq(competitions.status, filter.status as any));
	}

	if (filter.search) {
		conditions.push(
			sql`${competitions.title} ILIKE ${`%${filter.search}%`} OR ${competitions.description} ILIKE ${`%${filter.search}%`}`
		);
	}

	const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

	const results = await db
		.select()
		.from(competitions)
		.where(whereClause)
		.orderBy(desc(competitions.createdAt));

	return results;
}

export async function getCompetitionsByOrganizer(organizerName: string) {
	// Organizer is stored as JSONB object like {name: "Organizer Name", ...}
	// Use JSONB querying to check if organizer name matches
	const results = await db
		.select()
		.from(competitions)
		.where(
			sql`(${competitions.organizer}->>'name') ILIKE ${`%${organizerName}%`}`
		)
		.orderBy(desc(competitions.createdAt));

	return results;
}

export async function getCompetitionsByCategory(category: string) {
	const results = await db
		.select()
		.from(competitions)
		.where(ilike(competitions.categories, category))
		.orderBy(desc(competitions.createdAt));

	return results;
}

export async function getCompetitionsByIds(ids: string[]) {
	if (ids.length === 0) return [];

	const results = await db
		.select()
		.from(competitions)
		.where(sql`${competitions.id} = ANY(${ids})`);

	return results;
}

interface Organizer {
	name: string;
	competitionCount: number;
	categories: Set<string>;
}

export async function getAllOrganizers(): Promise<Organizer[]> {
	const allCompetitions = await db
		.select({
			organizer: competitions.organizer,
			category: competitions.categories,
		})
		.from(competitions);

	const organizerMap = new Map<
		string,
		{ name: string; competitionCount: number; categories: Set<string> }
	>();

	allCompetitions.forEach((competition) => {
		// Organizer is stored as JSONB array like ["Organizer Name"]
		const org = competition.organizer as unknown;
		let name = null;

		if (Array.isArray(org) && org.length > 0 && typeof org[0] === "string") {
			name = org[0];
		} else if (typeof org === "object" && org !== null && "name" in org) {
			name = (org as { name: string }).name;
		} else if (typeof org === "string") {
			name = org;
		}

		if (name) {
			if (organizerMap.has(name)) {
				const existing = organizerMap.get(name)!;
				existing.competitionCount += 1;
				if (competition.category) {
					existing.categories.add(competition.category);
				}
			} else {
				organizerMap.set(name, {
					name,
					competitionCount: 1,
					categories: new Set(
						competition.category ? [competition.category] : []
					),
				});
			}
		}
	});

	return Array.from(organizerMap.values()).sort(
		(a, b) => b.competitionCount - a.competitionCount
	);
}

export async function getAllCategories(): Promise<string[]> {
	const allCompetitions = await db
		.select({
			category: competitions.categories,
		})
		.from(competitions)
		.where(sql`${competitions.categories} IS NOT NULL`);

	const categorySet = new Set<string>();
	allCompetitions.forEach((competition) => {
		if (competition.category) {
			// Map Indonesian categories to English for display
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
				categoryMapping[competition.category] || competition.category
			);
		}
	});

	return Array.from(categorySet).sort();
}
