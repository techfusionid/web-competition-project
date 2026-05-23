import {
	boolean,
	date,
	integer,
	jsonb,
	pgTable,
	text,
	timestamp,
	uuid,
} from "drizzle-orm/pg-core";

export const competitions = pgTable("competitions", {
	id: uuid().primaryKey().defaultRandom(),
	title: text(),
	description: text(),
	organizer: jsonb().$type<{
		id?: string;
		name: string;
		abbreviation?: string;
		type?:
			| "University"
			| "Government"
			| "Corporate"
			| "Community"
			| "NGO"
			| "School"
			| "Individual"
			| "Other";
		logoUrl?: string;
		description?: string;
		website?: string;
		instagram?: string;
		linkedin?: string;
		tiktok?: string;
		isVerified?: boolean;
	}>(),
	categories: text().$type<
		| "Akademik & Sains"
		| "Teknologi & IT"
		| "Seni & Kreatif"
		| "Bisnis & Startup"
		| "Olahraga & E-sports"
		| "Sastra & Bahasa"
		| "Sosial & Lingkungan"
		| "Keagamaan"
		| "Gaya Hidup & Hobi"
		| "Lainnya"
	>(),
	views: integer().default(0),
	poster: text().notNull(),
	urlsource: text().notNull(),
	level: jsonb().$type<string[]>(),
	startDate: date(),
	endDate: date(),
	format: text().$type<"Online" | "Offline" | "Hybrid">(),
	participationType: text().$type<"Individual" | "Team">(),
	status: text()
		.$type<"draft" | "published" | "archived">()
		.notNull()
		.default("draft"),
	pricing: jsonb().$type<number[]>(),
	// contact: jsonb().$type<Array<{ name: string; phone: string }>>(),
	location: text(),
	whatsappChannel: boolean(),
	socialMedia: jsonb().$type<{
		instagram?: string;
		linkedin?: string;
		tiktok?: string;
		twitter?: string;
		facebook?: string;
		website?: string;
	}>(),
	createdAt: timestamp().notNull().defaultNow(),
	updatedAt: timestamp().notNull().defaultNow(),
	url: text(),
});
