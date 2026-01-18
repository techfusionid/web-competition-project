import { z } from "zod";

export const CompetitionCategory = [
	"Akademik & Sains",
	"Teknologi & IT",
	"Seni & Kreatif",
	"Bisnis & Startup",
	"Olahraga & E-sports",
	"Sastra & Bahasa",
	"Sosial & Lingkungan",
	"Keagamaan",
	"Gaya Hidup & Hobi",
	"Lainnya",
] as const;

export type CompetitionCategory = (typeof CompetitionCategory)[number];

// ============================================================
// ORGANIZER SCHEMA
// ============================================================
/**
 * Hubungan ke Competition: Many-to-Many
 * - Satu organizer bisa menyelenggarakan banyak kompetisi
 * - Satu kompetisi bisa diselenggarakan oleh banyak organizer (co-organizer, sponsor, dll)
 */
export const OrganizerSchema = z.object({
	id: z.string().optional().describe("Unique identifier untuk organizer"),
	name: z.string().describe("Nama organizer/penyelenggara"),
	abbreviation: z.string().optional().describe("Singkatan nama (contoh: UI, ITB, Kemendikbud)"),
	type: z.enum([
		"University",
		"Government",
		"Corporate",
		"Community",
		"NGO",
		"School",
		"Individual",
		"Other",
	]).optional().describe("Tipe organizer"),
	logoUrl: z.string().optional().describe("URL logo organizer"),
	description: z.string().optional().describe("Deskripsi singkat organizer"),

	// Social Media & Contact
	website: z.string().optional().describe("Website resmi organizer"),
	instagram: z.string().optional().describe("Username Instagram tanpa @"),
	linkedin: z.string().optional().describe("URL LinkedIn"),
	tiktok: z.string().optional().describe("Username TikTok tanpa @"),

	// Verified status untuk trusted organizer
	isVerified: z.boolean().default(false).describe("Status verifikasi organizer"),

	// Metadata
	createdAt: z.string().optional(),
	updatedAt: z.string().optional(),
});

export type Organizer = z.infer<typeof OrganizerSchema>;

// ============================================================
// JUNCTION TABLE: COMPETITION <-> ORGANIZER (Many-to-Many)
// ============================================================
export const CompetitionOrganizerSchema = z.object({
	competitionId: z.string().describe("ID kompetisi"),
	organizerId: z.string().describe("ID organizer"),
});

export type CompetitionOrganizer = z.infer<typeof CompetitionOrganizerSchema>;

export const CompetitionSchema = z.object({
	id: z.string().optional().describe("Unique identifier untuk kompetisi"),
	title: z.string().describe("Judul kompetisi"),
	// Organizer di-handle melalui CompetitionOrganizer junction table (Many-to-Many)
	// organizer: z.array(z.string()).nullable().describe("Penyelenggara kompetisi - DEPRECATED, use CompetitionOrganizer relation"),
	// description: z.string().optional(), // deskripsi diambil dari captions instagram
	categories: z.array(z.enum(CompetitionCategory)).nullable().describe(
		`Kategori lomba untuk AI/hint mapping:
		Akademik & Sains: Olimpiade, Karya Tulis Ilmiah (KTI), Esai, Debat, Pidato, Riset
		Teknologi & IT: Coding/Programming, Robotik, UI/UX Design, Cyber Security, Data Science, Game Dev
		Seni & Kreatif: Fotografi, Videografi, Desain Grafis, Ilustrasi, Seni Lukis, Musik, Tari, Teater
		Bisnis & Startup: Business Plan, Pitching, Marketing Plan, Stock Trading, Social Entrepreneurship
		Olahraga & E-sports: Atletik, Bela Diri, Permainan Tim, Mobile Legends, PUBG, Valorant
		Sastra & Bahasa: Cerpen, Puisi, Menulis Artikel, Jurnalistik, Storytelling
		Sosial & Lingkungan: Inovasi Sosial, Kampanye Lingkungan, SDGs, Volunteerism
		Keagamaan: MTQ, Nasyid, Cerdas Cermat Agama, Da'i Muda
		Gaya Hidup & Hobi: Memasak (Culinary), Fashion/Beauty Pageant, Modeling, Cosplay
		Lainnya: Lomba Tradisional, Kuis, Game Show, Lomba Hobi Unik`
	),
	level: z.array(z.enum(["SD", "SMP", "SMA", "Mahasiswa", "Umum"])).nullable().describe("tingkat peserta"),

	startDate: z.string().nullable().describe("Tanggal mulai registrasi, format YYYY-MM-DD"),
	endDate: z.string().nullable().describe("Tanggal selesai registrasi, format YYYY-MM-DD"),

	format: z.enum(["Online", "Offline", "Hybrid"]).nullable().describe("Format pelaksanaan kompetisi, Online/Offline/Hybrid"),

	participationType: z.enum(["Individual", "Team"]).nullable().describe("Tipe partisipasi"),

	pricing: z.array(z.number()).nullable().describe("Biaya pendaftaran dalam rupiah, kosong berarti gratis"),
	contact: z.array(z.string()).nullable().describe("Kontak penyelenggara, nama dan nomor yang bisa dihubungi"),

	prizePool: z.string().nullable().describe("total nominal hadiah"),
	benefits: z.string().nullable().describe("manfaatnya"),

	url: z.string().nullable().describe("URL pendaftaran kompetisi"),
});

export type Competition = z.infer<typeof CompetitionSchema>;