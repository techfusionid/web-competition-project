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
	"Teknologi",
	"Bisnis",
	"Sains",
	"Desain",
	"Penulisan",
	"Debat",
	"Olahraga",
	"Seni",
	"Sosial",
] as const;

export const LEVELS: { value: CompetitionLevel; label: string }[] = [
	{ value: "sma", label: "SMA/SMK" },
	{ value: "mahasiswa", label: "Mahasiswa" },
	{ value: "umum", label: "Umum" },
	{ value: "profesional", label: "Profesional" },
];
