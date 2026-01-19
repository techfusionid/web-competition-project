"use client";

import { ArrowLeft, Building2, Trophy } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { CompetitionCard } from "@/components/CompetitionCard";
import { Button } from "@/components/ui/button";
import { competitions } from "@/data/competitions";
import { useBookmarks } from "@/hooks/useBookmarks";

export default function InstitutionDetailPage() {
	const params = useParams();
	const slug = params.slug as string;
	const decodedName = slug ? decodeURIComponent(slug) : "";
	const { isBookmarked, toggleBookmark } = useBookmarks();

	const institutionCompetitions = competitions.filter((comp) =>
		comp.institutions?.includes(decodedName)
	);

	return (
		<>
			<main className="container py-8">
				<Link href="/institution">
					<Button className="mb-6 -ml-2" size="sm" variant="ghost">
						<ArrowLeft className="h-4 w-4 mr-2" />
						Kembali ke Institusi
					</Button>
				</Link>

				<div className="flex items-start gap-4 mb-8">
					<div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-primary/10">
						<Building2 className="h-8 w-8 text-primary" />
					</div>
					<div>
						<h1 className="text-2xl font-bold text-foreground">
							{decodedName}
						</h1>
						<div className="flex items-center gap-1.5 mt-1 text-muted-foreground">
							<Trophy className="h-4 w-4" />
							<span>{institutionCompetitions.length} kompetisi</span>
						</div>
					</div>
				</div>

				{institutionCompetitions.length > 0 ? (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
						{institutionCompetitions.map((competition) => (
							<CompetitionCard
								competition={competition}
								key={competition.id}
							/>
						))}
					</div>
				) : (
					<div className="text-center py-12">
						<Trophy className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
						<p className="text-muted-foreground">
							Tidak ada kompetisi dari institusi ini
						</p>
					</div>
				)}
			</main>
		</>
	);
}
