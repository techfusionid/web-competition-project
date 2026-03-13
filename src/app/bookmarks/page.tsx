"use client";

import { Bookmark } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchCompetitionsByIds } from "@/app/actions/competitions";
import { CompetitionCard } from "@/components/CompetitionCard";
import { Button } from "@/components/ui/button";
import { useBookmarks } from "@/hooks/useBookmarks";
import type { Competition } from "@/types/competition";

export default function BookmarksPage() {
	const { bookmarks, toggleBookmark } = useBookmarks();
	const [bookmarkedCompetitions, setBookmarkedCompetitions] = useState<
		Competition[]
	>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		async function loadBookmarkedCompetitions() {
			setIsLoading(true);
			try {
				if (bookmarks.length > 0) {
					const data = await fetchCompetitionsByIds(bookmarks);
					setBookmarkedCompetitions(data);
				} else {
					setBookmarkedCompetitions([]);
				}
			} catch (error) {
				console.error("Failed to fetch bookmarked competitions:", error);
				setBookmarkedCompetitions([]);
			} finally {
				setIsLoading(false);
			}
		}
		loadBookmarkedCompetitions();
	}, [bookmarks]);

	return (
		<main className="container py-8 md:py-12">
			<div className="mb-6">
				<h1 className="font-semibold text-foreground text-xl md:text-2xl">
					Saved Competitions
				</h1>
				<p className="mt-1 text-muted-foreground text-sm">
					{isLoading
						? "Loading..."
						: `${bookmarkedCompetitions.length} competition${bookmarkedCompetitions.length !== 1 ? "s" : ""} you've saved`}
				</p>
			</div>

			{isLoading ? (
				<div className="flex items-center justify-center py-16">
					<p className="text-muted-foreground">Loading saved competitions...</p>
				</div>
			) : bookmarkedCompetitions.length === 0 ? (
				<div className="flex flex-col items-center justify-center rounded-lg border border-border border-dashed py-16">
					<div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
						<Bookmark className="h-6 w-6 text-muted-foreground" />
					</div>
					<h2 className="mt-4 font-medium text-foreground text-sm">
						No saved competitions yet
					</h2>
					<p className="mt-1 text-center text-muted-foreground text-xs">
						Save interesting competitions for quick access
					</p>
					<Link href="/">
						<Button className="mt-4 text-xs" size="sm">
							Explore Competitions
						</Button>
					</Link>
				</div>
			) : (
				<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{bookmarkedCompetitions.map((competition) => (
						<CompetitionCard competition={competition} key={competition.id} />
					))}
				</div>
			)}
		</main>
	);
}
