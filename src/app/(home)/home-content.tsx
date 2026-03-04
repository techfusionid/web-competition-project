"use client";

import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CompetitionList } from "@/components/CompetitionList";
import { Hero } from "@/components/Hero";
import { SponsorSection } from "@/components/SponsorSection";
import { fetchCompetitions } from "@/app/actions/competitions";
import type { Competition } from "@/types/competition";
import { useBookmarks } from "@/hooks/useBookmarks";

export function HomeContent() {
	const searchParams = useSearchParams();
	const [searchQuery, setSearchQuery] = useState("");
	const [resetTrigger, setResetTrigger] = useState(0);
	const [competitions, setCompetitions] = useState<Competition[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const { bookmarks, toggleBookmark } = useBookmarks();

	// Fetch competitions from database on mount
	useEffect(() => {
		async function loadData() {
			setIsLoading(true);
			try {
				const data = await fetchCompetitions();
				setCompetitions(data);
			} catch (error) {
				console.error("Failed to fetch competitions:", error);
				setCompetitions([]);
			} finally {
				setIsLoading(false);
			}
		}
		loadData();
	}, []);

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

	// Klik organizer tidak lagi memasukkan keyword ke search bar
	const handleOrganizerClick = useCallback((_organizer: string) => {
		// No-op: mekanisme isi search bar dihilangkan
	}, []);

	// Sponsor data
	const sponsors = [
		{
			id: "techfusion",
			name: "Techfusion",
			logo: "🚀",
			description: "Building the future of tech competitions",
			website: "https://techfusion.id",
			tier: "platinum" as const,
		},
		{
			id: "neon",
			name: "Neon",
			logo: "⚡",
			description: "Serverless PostgreSQL platform",
			website: "https://neon.tech",
			tier: "gold" as const,
		},
	];

	return (
		<>
			<div className="from-secondary/50 to-background">
				<main className="flex-1">
					<Hero />
				</main>
			</div>

			{/* Sponsor Section */}
			<SponsorSection
				sponsors={sponsors}
				title="Our Sponsors"
				description="Supported by leading organizations"
				variant="minimal"
				storageKey="landing"
			/>

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
