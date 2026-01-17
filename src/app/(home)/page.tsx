"use client";

import { useCallback, useState } from "react";
import { CompetitionList } from "@/components/CompetitionList";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { competitions } from "@/data/competitions";
import { useBookmarks } from "@/hooks/useBookmarks";

export default function Home() {
	const [searchQuery, setSearchQuery] = useState("");
	const [resetTrigger, setResetTrigger] = useState(0);
	const { bookmarks, toggleBookmark } = useBookmarks();

	const handleTagClick = useCallback((tag: string) => {
		setSearchQuery(tag);
		const element = document.getElementById("competitions");
		element?.scrollIntoView({ behavior: "smooth" });
	}, []);

	const handleOrganizerClick = useCallback((organizer: string) => {
		setSearchQuery(organizer);
	}, []);

	const handleHomeClick = useCallback(() => {
		setResetTrigger((prev) => prev + 1);
		setSearchQuery("");
	}, []);

	return (
		<div className="flex min-h-screen flex-col bg-background">
			<Header onHomeClick={handleHomeClick} />
			<main className="flex-1">
				<Hero onTagClick={handleTagClick} />
				<div id="competitions">
					<CompetitionList
						bookmarks={bookmarks}
						competitions={competitions}
						onOrganizerClick={handleOrganizerClick}
						onSearchChange={setSearchQuery}
						onToggleBookmark={toggleBookmark}
						resetTrigger={resetTrigger}
						searchQuery={searchQuery}
					/>
				</div>
			</main>
			<Footer />
		</div>
	);
}
