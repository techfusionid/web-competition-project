export type CompetitionStatus = "open" | "closing-soon" | "closed";
export type CompetitionLevel = "sma" | "mahasiswa" | "umum" | "profesional";
export type CompetitionFormat = "online" | "offline" | "hybrid";
export type ParticipationType = "individual" | "team";

export interface SocialMedia {
	instagram?: string;
	twitter?: string;
	website?: string;
	whatsapp?: string;
	email?: string;
}

export interface Competition {
	id: string;
	title: string;
	organizer: string;
	category: string;
	tags?: string[];
	level: CompetitionLevel[];
	startDate?: Date;
	deadline: Date;
	format: CompetitionFormat;
	participationType: ParticipationType;
	status: CompetitionStatus;
	prize: string;
	description: string;
	imageUrl?: string;
	registrationUrl: string;
	location?: string;
	institutions?: string[]; // For offline events with multiple host institutions
	socialMedia?: SocialMedia;
}

export const CATEGORIES = [
	"Technology",
	"Business",
	"Science",
	"Design",
	"Writing",
	"Debate",
	"Sports",
	"Art",
	"Social",
] as const;

export const LEVELS: { value: CompetitionLevel; label: string }[] = [
	{ value: "sma", label: "High School" },
	{ value: "mahasiswa", label: "University" },
	{ value: "umum", label: "General" },
	{ value: "profesional", label: "Professional" },
];

// Mapping from English category names (used in UI) to Indonesian (used in database)
export const CATEGORY_MAPPING: Record<string, string> = {
	"Technology": "Teknologi & IT",
	"Business": "Bisnis & Startup",
	"Science": "Akademik & Sains",
	"Design": "Seni & Kreatif",
	"Writing": "Sastra & Bahasa",
	"Debate": "Sastra & Bahasa",
	"Sports": "Olahraga & E-sports",
	"Art": "Seni & Kreatif",
	"Social": "Sosial & Lingkungan",
};

// Reverse mapping from Indonesian to English
export const CATEGORY_MAPPING_REVERSE: Record<string, string> = Object.entries(
	CATEGORY_MAPPING
).reduce((acc, [en, id]) => ({ ...acc, [id]: en }), {});
