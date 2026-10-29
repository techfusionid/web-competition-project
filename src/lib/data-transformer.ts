import type { CompetitionRecord } from "@/server/db/types";
import type { Competition } from "@/types/competition";

// Map Indonesian categories to English
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

const formatMapping: Record<string, Competition["format"]> = {
	Online: "online",
	Offline: "offline",
	Hybrid: "hybrid",
};

const participationTypeMapping: Record<
	string,
	Competition["participationType"]
> = {
	Individual: "individual",
	Team: "team",
};

const levelMapping: Record<string, Competition["level"][number]> = {
	// Direct mappings
	SMA: "sma",
	Mahasiswa: "mahasiswa",
	Umum: "umum",
	Profesional: "profesional",
	// English equivalents
	"High School": "sma",
	University: "mahasiswa",
	General: "umum",
	Professional: "profesional",
	// Additional mappings based on database
	SMP: "sma",
	SD: "sma",
	Sederajat: "umum",
	Gapyear: "umum",
	"Gap Year": "umum",
	Staff: "profesional",
	Public: "umum",
};

function getStatus(deadline: Date | null | undefined): Competition["status"] {
	if (!deadline) {
		return "closed";
	}

	const now = new Date();
	const daysUntilDeadline = Math.ceil(
		(deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
	);

	if (daysUntilDeadline < 0) {
		return "closed";
	}
	if (daysUntilDeadline <= 7) {
		return "closing-soon";
	}
	return "open";
}

function formatPrize(pricing: unknown): string {
	// Handle various possible formats of pricing data from JSONB
	if (!pricing) {
		return "TBA";
	}

	// JSONB can come back as the actual parsed value
	let prices: number[] = [];

	// If it's already an array
	if (Array.isArray(pricing)) {
		// Filter for valid numbers
		for (const p of pricing) {
			if (typeof p === "number" && !Number.isNaN(p)) {
				prices.push(p);
			} else if (typeof p === "string") {
				// Handle string numbers like "50000"
				const num = Number(p);
				if (!Number.isNaN(num)) {
					prices.push(num);
				}
			}
		}
	}
	// If it's an object with numeric values
	else if (
		typeof pricing === "object" &&
		pricing !== null &&
		!Array.isArray(pricing)
	) {
		for (const v of Object.values(pricing)) {
			if (typeof v === "number" && !Number.isNaN(v)) {
				prices.push(v);
			}
		}
	}
	// If it's a single number (primitive)
	else if (typeof pricing === "number") {
		prices = [pricing];
	}
	// If it's a string (like "Rp 100.000")
	else if (typeof pricing === "string") {
		// Try to extract numbers from string
		const numbers = pricing.match(/\d+/g);
		if (numbers) {
			prices = numbers.map(Number);
		}
	}

	if (prices.length === 0) {
		return "TBA";
	}

	const maxPrice = Math.max(...prices);
	if (maxPrice >= 1_000_000_000) {
		return `Rp ${(maxPrice / 1_000_000_000).toFixed(1)} Miliar`;
	}
	if (maxPrice >= 1_000_000) {
		return `Rp ${(maxPrice / 1_000_000).toFixed(0)} Juta`;
	}
	if (maxPrice >= 1000) {
		return `Rp ${(maxPrice / 1000).toFixed(0)} Ribu`;
	}
	return `Rp ${maxPrice.toLocaleString("id-ID")}`;
}

function normalizeLevels(levels: unknown): Competition["level"] {
	const levelArray = toValues(levels);
	const normalized: Competition["level"] = [];
	const seen = new Set<string>();

	for (const level of levelArray) {
		// Try direct mapping first
		if (level in levelMapping) {
			const mapped = levelMapping[level];
			if (mapped && !seen.has(mapped)) {
				seen.add(mapped);
				normalized.push(mapped);
			}
		} else {
			// Try case-insensitive matching
			const lowerLevel = level.toLowerCase();
			for (const [key, value] of Object.entries(levelMapping)) {
				if (key.toLowerCase() === lowerLevel || value === lowerLevel) {
					if (!seen.has(value)) {
						seen.add(value);
						normalized.push(value);
					}
					break;
				}
			}
		}
	}

	return normalized.length > 0 ? normalized : ["umum"];
}

// The legacy `categories`/`organizer`/`level` columns are jsonb (declared as
// plain strings/types in Drizzle). Rows can arrive as `{"data":[...]}` (object),
// bare arrays, or strings after JSON parsing.
function toValues(value: unknown): string[] {
	if (value === null || value === undefined) {
		return [];
	}
	if (typeof value === "string") {
		return [value];
	}
	if (Array.isArray(value)) {
		return value.filter((item): item is string => typeof item === "string");
	}
	if (typeof value === "object" && "data" in value) {
		return toValues(value.data);
	}
	return [];
}

export function dbToCompetition(dbRecord: CompetitionRecord): Competition {
	const organizerName =
		toValues(dbRecord.organizer).find((name) => name.trim() !== "") ||
		"Unknown Organizer";

	const categoryValues = toValues(dbRecord.categories)
		.map((name) => categoryMapping[name] || name)
		.filter((name) => name.trim() !== "");
	const category = categoryValues[0] ?? "Other";

	const endDate = dbRecord.endDate || dbRecord.startDate;
	const deadline = endDate ? new Date(endDate) : new Date();

	return {
		id: dbRecord.id,
		title: dbRecord.title || "Untitled Competition",
		organizer: organizerName,
		category,
		tags: [], // Tags not in schema
		level: normalizeLevels(dbRecord.level),
		startDate: dbRecord.startDate ? new Date(dbRecord.startDate) : undefined,
		deadline,
		format: dbRecord.format
			? formatMapping[dbRecord.format] || "online"
			: "online",
		participationType: dbRecord.participationType
			? participationTypeMapping[dbRecord.participationType] || "individual"
			: "individual",
		status: getStatus(deadline),
		prize: formatPrize(dbRecord.pricing),
		description: dbRecord.description || "",
		imageUrl: dbRecord.poster || undefined,
		registrationUrl: dbRecord.urlsource || "",
		location: dbRecord.location || undefined,
		socialMedia: {
			instagram: dbRecord.socialMedia?.instagram || undefined,
			website: dbRecord.url || undefined,
		},
	};
}

export function dbToCompetitions(
	dbRecords: CompetitionRecord[]
): Competition[] {
	return dbRecords.map(dbToCompetition);
}
