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
			id: "google",
			name: "Google",
			logo: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 272 92'%3E%3Cpath fill='%234285F4' d='M115.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18C71.25 34.32 81.24 25 93.5 25s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44S80.99 39.2 80.99 47.18c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z'/%3E%3Cpath fill='%23EA4335' d='M163.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18c0-12.85 9.99-22.18 22.25-22.18s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44s-12.51 5.46-12.51 13.44c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z'/%3E%3Cpath fill='%23FBBC05' d='M209.75 26.34v39.82c0 16.38-9.66 23.07-21.08 23.07-10.75 0-17.22-7.19-19.66-13.07l8.48-3.53c1.51 3.61 5.21 7.87 11.17 7.87 7.31 0 11.84-4.51 11.84-13v-3.19h-.34c-2.18 2.69-6.38 5.04-11.68 5.04-11.09 0-21.25-9.66-21.25-22.09 0-12.52 10.16-22.26 21.25-22.26 5.29 0 9.49 2.35 11.68 4.96h.34v-3.61h9.25zm-8.56 20.92c0-7.81-5.21-13.52-11.84-13.52-6.72 0-12.35 5.71-12.35 13.52 0 7.73 5.63 13.36 12.35 13.36 6.63 0 11.84-5.63 11.84-13.36z'/%3E%3Cpath fill='%234285F4' d='M225 3v65h-9.5V3h9.5z'/%3E%3Cpath fill='%2334A853' d='M262.02 54.48l7.56 5.04c-2.44 3.61-8.32 9.83-18.48 9.83-12.6 0-22.01-9.74-22.01-22.18 0-13.19 9.49-22.18 20.92-22.18 11.51 0 17.14 9.16 18.99 14.11l1.01 2.52-29.65 12.28c2.27 4.45 5.8 6.72 10.75 6.72 4.96 0 8.4-2.44 10.92-6.13zm-23.27-7.98l19.82-8.23c-1.09-2.77-4.37-4.7-8.23-4.7-4.95 0-11.84 4.37-11.59 12.93z'/%3E%3Cpath fill='%23EA4335' d='M35.29 41.41V32H67c.31 1.64.47 3.58.47 5.68 0 7.06-1.93 15.79-8.15 22.01-6.05 6.3-13.78 9.66-24.02 9.66C16.32 69.35.36 53.89.36 34.91.36 15.93 16.32.47 35.3.47c10.5 0 17.98 4.12 23.6 9.49l-6.64 6.64c-4.03-3.78-9.49-6.72-16.97-6.72-13.86 0-24.7 11.17-24.7 25.03 0 13.86 10.84 25.03 24.7 25.03 8.99 0 14.11-3.61 17.39-6.89 2.66-2.66 4.41-6.46 5.1-11.65l-22.49.01z'/%3E%3C/svg%3E",
			description:
				"Organizing the world's information and making it universally accessible and useful",
			website: "https://google.com",
			tier: "platinum" as const,
		},
		{
			id: "apple",
			name: "Apple",
			logo: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 384 512'%3E%3Cpath fill='currentColor' d='M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z'/%3E%3C/svg%3E",
			description:
				"Designing the future of technology with innovative products and services",
			website: "https://apple.com",
			tier: "platinum" as const,
		},
		{
			id: "facebook",
			name: "Facebook",
			logo: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Cpath fill='%231877F2' d='M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256C0 376 82.7 476.8 194.2 504.5V334.2H141.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H287V510.1C413.8 494.8 512 386.9 512 256z'/%3E%3C/svg%3E",
			description:
				"Connecting people around the world through social technology",
			website: "https://facebook.com",
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
				title="Supported by the best"
				description="We're backed by incredible partners and sponsors who make this project possible."
				variant="minimal"
				storageKey="landing"
				dismissible={false}
				sponsorCtaLink="/advertise"
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
