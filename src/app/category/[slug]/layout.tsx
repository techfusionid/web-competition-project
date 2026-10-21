import type { Metadata } from "next";
import type { ReactNode } from "react";

const BASE_URL = "https://competition.techfusion.id";

const CATEGORY_NAMES: Record<string, string> = {
	teknologi: "Technology",
	bisnis: "Business",
	akademik: "Science",
	seni: "Design",
	sastra: "Writing",
	olahraga: "Sports",
	sosial: "Social",
};

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>;
}): Promise<Metadata> {
	const { slug } = await params;

	const categoryName = CATEGORY_NAMES[slug] || slug;
	const title = `${categoryName} Competitions`;
	const description = `Discover and join the best ${categoryName.toLowerCase()} competitions. Find contests, challenges, and awards in ${categoryName.toLowerCase()}.`;
	const ogImageUrl = `${BASE_URL}/api/og?title=${encodeURIComponent(title)}&category=${encodeURIComponent(categoryName)}&type=category`;

	return {
		title,
		description,
		openGraph: {
			title,
			description,
			type: "website",
			url: `${BASE_URL}/category/${slug}`,
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

export default function CategoryLayout({ children }: { children: ReactNode }) {
	return children;
}
