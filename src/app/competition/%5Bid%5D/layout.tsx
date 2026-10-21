import type { Metadata } from "next";
import type { ReactNode } from "react";
import { fetchCompetitionById } from "@/app/actions/competitions";

const BASE_URL = "https://competition.techfusion.id";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ id: string }>;
}): Promise<Metadata> {
	const { id } = await params;

	let competition;
	try {
		competition = await fetchCompetitionById(id);
	} catch {
		// Fallback if fetch fails
	}

	if (!competition) {
		return {
			title: "Competition Not Found",
			description: "The requested competition could not be found.",
		};
	}

	const title = competition.title;
	const description =
		competition.description.length > 160
			? `${competition.description.slice(0, 157)}...`
			: competition.description;
	const category = competition.category || "Competition";
	const ogImageUrl = `${BASE_URL}/api/og?title=${encodeURIComponent(title)}&category=${encodeURIComponent(category)}&type=competition`;

	return {
		title,
		description,
		openGraph: {
			title,
			description,
			type: "article",
			url: `${BASE_URL}/competition/${id}`,
			images: [
				{
					url: ogImageUrl,
					width: 1200,
					height: 630,
					alt: title,
				},
			],
		},
		twitter: {
			card: "summary_large_image",
			title,
			description,
			images: [ogImageUrl],
		},
	};
}

export default function CompetitionMetadataLayout({
	children,
}: {
	children: ReactNode;
}) {
	return children;
}
