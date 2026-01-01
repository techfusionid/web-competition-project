"use client";

import { Bookmark } from "lucide-react";
import Link from "next/link";
import { CompetitionCard } from "@/components/CompetitionCard";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { competitions } from "@/data/competitions";
import { useBookmarks } from "@/hooks/useBookmarks";

export default function BookmarksPage() {
	const { bookmarks, toggleBookmark } = useBookmarks();

	const bookmarkedCompetitions = competitions.filter((c) =>
		bookmarks.includes(c.id)
	);

	return (
		<div className="flex min-h-screen flex-col bg-background">
			<Header />
			<main className="container flex-1 py-8 md:py-12">
				<div className="mb-6">
					<h1 className="text-xl font-semibold text-foreground md:text-2xl">
						Kompetisi Tersimpan
					</h1>
					<p className="mt-1 text-sm text-muted-foreground">
						{bookmarkedCompetitions.length} kompetisi telah Anda simpan
					</p>
				</div>

				{bookmarkedCompetitions.length === 0 ? (
					<div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-16">
						<div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
							<Bookmark className="h-6 w-6 text-muted-foreground" />
						</div>
						<h2 className="mt-4 text-sm font-medium text-foreground">
							Belum ada kompetisi tersimpan
						</h2>
						<p className="mt-1 text-center text-xs text-muted-foreground">
							Simpan kompetisi yang menarik untuk akses cepat
						</p>
						<Link href="/">
							<Button className="mt-4 text-xs" size="sm">
								Jelajahi Kompetisi
							</Button>
						</Link>
					</div>
				) : (
					<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
						{bookmarkedCompetitions.map((competition) => (
							<CompetitionCard
								competition={competition}
								isBookmarked={true}
								key={competition.id}
								onToggleBookmark={toggleBookmark}
							/>
						))}
					</div>
				)}
			</main>
			<Footer />
		</div>
	);
}
