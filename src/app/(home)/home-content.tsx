"use client";

import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CompetitionList } from "@/components/CompetitionList";
import { Hero } from "@/components/Hero";
import { competitions } from "@/data/competitions";
import { useBookmarks } from "@/hooks/useBookmarks";

export function HomeContent() {
	const searchParams = useSearchParams();
	const [searchQuery, setSearchQuery] = useState("");
	const [resetTrigger, setResetTrigger] = useState(0);
	const { bookmarks, toggleBookmark } = useBookmarks();

	// Sync search query with URL
	useEffect(() => {
		const query = searchParams.get("q");
		if (query !== null) {
			setSearchQuery(query);
		}
	}, [searchParams]);

	// Listen for reset event from Header
	useEffect(() => {
		const handleReset = () => {
			setSearchQuery("");
			setResetTrigger((prev) => prev + 1);
			// Clear URL search params
			const url = new URL(window.location.href);
			url.searchParams.delete("q");
			window.history.replaceState({}, "", url.toString());
		};

		window.addEventListener('reset-app', handleReset);
		return () => window.removeEventListener('reset-app', handleReset);
	}, []);

	const handleSearchChange = useCallback((query: string) => {
		setSearchQuery(query);
		// Update URL without refreshing
		const url = new URL(window.location.href);
		if (query) {
			url.searchParams.set("q", query);
		} else {
			url.searchParams.delete("q");
		}
		window.history.replaceState({}, "", url.toString());
	}, []);

	const handleOrganizerClick = useCallback((organizer: string) => {
		handleSearchChange(organizer);
	}, [handleSearchChange]);

	return (
		<>
			<div className="from-secondary/50 to-background">
				<main className="flex-1">
					<Hero />
				</main>
			</div>
			<div id="competitions">
				<CompetitionList
					bookmarks={bookmarks}
					competitions={competitions}
					onOrganizerClick={handleOrganizerClick}
					onSearchChange={handleSearchChange}
					onToggleBookmark={toggleBookmark}
					resetTrigger={resetTrigger}
					searchQuery={searchQuery}
				/>
			</div>
		</>
	);
}
