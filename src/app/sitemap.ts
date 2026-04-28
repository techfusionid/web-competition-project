import type { MetadataRoute } from "next";
import { fetchCompetitions } from "./actions/competitions";

export const dynamic = "force-dynamic";

const BASE_URL = "https://competition.techfusion.id";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const competitions = await fetchCompetitions();

	const staticPages: MetadataRoute.Sitemap = [
		{
			url: BASE_URL,
			lastModified: new Date(),
			changeFrequency: "daily",
			priority: 1,
		},
		{
			url: `${BASE_URL}/discover`,
			lastModified: new Date(),
			changeFrequency: "daily",
			priority: 0.8,
		},
		{
			url: `${BASE_URL}/category`,
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 0.7,
		},
		{
			url: `${BASE_URL}/organizer`,
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 0.7,
		},
		{
			url: `${BASE_URL}/about-us`,
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.6,
		},
		{
			url: `${BASE_URL}/advertise`,
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.5,
		},
		{
			url: `${BASE_URL}/terms`,
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.4,
		},
		{
			url: `${BASE_URL}/privacy`,
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.4,
		},
		{
			url: `${BASE_URL}/resources`,
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 0.6,
		},
	];

	const categoryPages: MetadataRoute.Sitemap = [
		"Technology",
		"Business",
		"Science",
		"Design",
		"Writing",
		"Debate",
		"Sports",
		"Art",
		"Social",
	].map((category) => ({
		url: `${BASE_URL}/category/${encodeURIComponent(category)}`,
		lastModified: new Date(),
		changeFrequency: "daily" as const,
		priority: 0.7,
	}));

	const organizerPages: MetadataRoute.Sitemap = [
		"ITB",
		"UI",
		"Google",
		"UGM",
	].map((organizer) => ({
		url: `${BASE_URL}/organizer/${encodeURIComponent(organizer)}`,
		lastModified: new Date(),
		changeFrequency: "weekly" as const,
		priority: 0.6,
	}));

	const competitionPages: MetadataRoute.Sitemap = competitions.map((comp) => ({
		url: `${BASE_URL}/competition/${comp.id}`,
		lastModified: new Date(comp.deadline),
		changeFrequency: "weekly" as const,
		priority: 0.8,
	}));

	return [
		...staticPages,
		...categoryPages,
		...organizerPages,
		...competitionPages,
	];
}
