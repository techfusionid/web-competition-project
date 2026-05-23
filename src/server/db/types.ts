export type OrganizerInfo = {
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
};

export type SocialMediaInfo = {
	instagram?: string;
	linkedin?: string;
	tiktok?: string;
	twitter?: string;
	facebook?: string;
	website?: string;
};

export type CompetitionRecord = {
	id: string;
	title: string | null;
	description: string | null;
	organizer: OrganizerInfo | null;
	categories:
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
		| null;
	views: number | null;
	poster: string;
	urlsource: string;
	level: string[] | null;
	startDate: string | null;
	endDate: string | null;
	format: "Online" | "Offline" | "Hybrid" | null;
	participationType: "Individual" | "Team" | null;
	status: "draft" | "published" | "archived";
	pricing: number[] | null;
	location: string | null;
	whatsappChannel: boolean | null;
	socialMedia: SocialMediaInfo | null;
	createdAt: string;
	updatedAt: string;
	url: string | null;
};