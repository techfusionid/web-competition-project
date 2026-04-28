"use client";

import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { fetchCompetitions } from "@/app/actions/competitions";
import { CompetitionList } from "@/components/CompetitionList";
import { Hero } from "@/components/Hero";
import { SponsorSection } from "@/components/SponsorSection";
import { useBookmarks } from "@/hooks/useBookmarks";
import type { Competition } from "@/types/competition";

export default function Home() {
	const searchParams = useSearchParams();
	const [searchQuery, setSearchQuery] = useState("");
	const [resetTrigger, setResetTrigger] = useState(0);
	const [competitions, setCompetitions] = useState<Competition[]>([]);
	const [_isLoading, setIsLoading] = useState(true);
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

		window.addEventListener("reset-app", handleReset);
		return () => window.removeEventListener("reset-app", handleReset);
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
			id: "fydemy",
			name: "Fydemy",
			logo: "/sponsor/fydemy.jpeg",
			description: "A tech RnD community for validation and research.",
			website: "https://fydemy.com",
			tier: "platinum" as const,
		},
		{
			id: "pathseeker",
			name: "PathSeeker",
			logo: "/sponsor/pathseeker.jpg",
			description:
				"Pathseeker is a student-led startup created to provide career preparation products for students.",
			website: "https://pathseeker.com",
			tier: "platinum" as const,
		},
		{
			id: "magna",
			name: "Magna",
			logo: "/sponsor/magna.jpeg",
			description:
				"Magna Partners is an Indonesian-based, youth-led, not-for-profit collective network. It focuses on solving problems for Indonesian youth by offering career mentoring. IT community support, and competition hubs",
			website: "https://magna.com",
			tier: "gold" as const,
		},
	];

	return (
		<div className="flex min-h-screen flex-col bg-background">
			<div className="from-secondary/50 to-background">
				<main className="flex-1">
					<Hero />
				</main>
			</div>

			{/* Sponsor Section */}
			<SponsorSection
				description="We're backed by incredible partners and sponsors who make this project possible."
				dismissible={false}
				sponsorCtaLink="/advertise"
				sponsors={sponsors}
				storageKey="landing"
				title="Supported by the best"
				variant="minimal"
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
		</div>
	);
}
