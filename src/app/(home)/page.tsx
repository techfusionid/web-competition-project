"use client";

import { useState, useCallback } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { CompetitionList } from "@/components/CompetitionList";
import { Footer } from "@/components/Footer";
import { competitions } from "@/data/competitions";
import { useBookmarks } from "@/hooks/useBookmarks";

export default function Home() {
	const [searchQuery, setSearchQuery] = useState("");
	const { bookmarks, toggleBookmark } = useBookmarks();

	const handleTagClick = useCallback((tag: string) => {
		setSearchQuery(tag);
		const element = document.getElementById("competitions");
		element?.scrollIntoView({ behavior: "smooth" });
	}, []);

	const handleOrganizerClick = useCallback((organizer: string) => {
		setSearchQuery(organizer);
	}, []);

	return (
		<div className="flex min-h-screen flex-col bg-background">
			<Header />
			<main className="flex-1">
				<Hero onTagClick={handleTagClick} />
				<div id="competitions">
					<CompetitionList
						competitions={competitions}
						searchQuery={searchQuery}
						onSearchChange={setSearchQuery}
						bookmarks={bookmarks}
						onToggleBookmark={toggleBookmark}
						onOrganizerClick={handleOrganizerClick}
					/>
				</div>
			</main>
			<Footer />
		</div>
	);
}
