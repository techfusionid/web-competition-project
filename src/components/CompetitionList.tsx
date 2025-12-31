import { Competition } from "@/types/competition";
import { CompetitionCard } from "./CompetitionCard";
import { CompetitionCardPoster } from "./CompetitionCardPoster";
import { CompetitionDialog } from "./CompetitionDialog";
import { CompetitionDetailPanel } from "./CompetitionDetailPanel";
import { CompetitionGalleryItem } from "./CompetitionGalleryItem";
import { FilterState, Filters } from "./Filters";
import { SearchBar } from "./SearchBar";
import { ViewToggle, ViewMode } from "./ViewToggle";
import { useState, useMemo, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { ScrollArea } from "@/components/ui/scroll-area";

interface CompetitionListProps {
	competitions: Competition[];
	searchQuery: string;
	onSearchChange: (query: string) => void;
	bookmarks: string[];
	onToggleBookmark: (id: string) => void;
	onOrganizerClick: (organizer: string) => void;
}

const defaultFilters: FilterState = {
	categories: [],
	levels: [],
	format: "all",
	participationType: "all",
	status: "all",
};

type SortOption = "deadline" | "name";

const VIEW_MODE_KEY = "lombahub-view-mode";

function getInitialViewMode(isMobile: boolean): ViewMode {
	if (typeof window === "undefined") return isMobile ? "poster" : "grid";
	const stored = localStorage.getItem(VIEW_MODE_KEY);
	if (stored === "grid" || stored === "poster") {
		return stored;
	}
	return isMobile ? "poster" : "grid";
}

export function CompetitionList({
	competitions,
	searchQuery,
	onSearchChange,
	bookmarks,
	onToggleBookmark,
	onOrganizerClick,
}: CompetitionListProps) {
	const isMobile = useIsMobile();
	const [filters, setFilters] = useState<FilterState>(defaultFilters);
	const [sortBy, setSortBy] = useState<SortOption>("deadline");
	const [showFilters, setShowFilters] = useState(false);
	const [viewMode, setViewMode] = useState<ViewMode>("grid");
	const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
	const [dialogIndex, setDialogIndex] = useState<number | null>(null);
	const [visibleCount, setVisibleCount] = useState(20);

	const ITEMS_PER_PAGE = 20;

	// Update view mode when it changes and persist to localStorage
	const handleViewModeChange = useCallback((mode: ViewMode) => {
		setViewMode(mode);
		localStorage.setItem(VIEW_MODE_KEY, mode);
	}, []);

	// Initialize view mode on mount and handle device changes
	useEffect(() => {
		const initialMode = getInitialViewMode(isMobile);
		setViewMode(initialMode);
	}, [isMobile]);

	// Close split view and reset visible count when filters change
	useEffect(() => {
		setSelectedIndex(null);
		setVisibleCount(20);
	}, [searchQuery, filters]);

	const filteredCompetitions = useMemo(() => {
		let result = competitions.filter((comp) => {
			if (searchQuery) {
				const query = searchQuery.toLowerCase();
				const matchesSearch =
					comp.title.toLowerCase().includes(query) ||
					comp.description.toLowerCase().includes(query) ||
					comp.organizer.toLowerCase().includes(query) ||
					comp.category.toLowerCase().includes(query);
				if (!matchesSearch) return false;
			}

			if (
				filters.categories.length > 0 &&
				!filters.categories.includes(comp.category)
			) {
				return false;
			}

			if (
				filters.levels.length > 0 &&
				!comp.level.some((l) => filters.levels.includes(l))
			) {
				return false;
			}

			if (filters.format !== "all" && comp.format !== filters.format) {
				return false;
			}

			if (
				filters.participationType !== "all" &&
				comp.participationType !== filters.participationType
			) {
				return false;
			}

			if (filters.status !== "all" && comp.status !== filters.status) {
				return false;
			}

			return true;
		});

		result.sort((a, b) => {
			switch (sortBy) {
				case "deadline":
					return (
						new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
					);
				case "name":
					return a.title.localeCompare(b.title);
				default:
					return 0;
			}
		});

		return result;
	}, [competitions, searchQuery, filters, sortBy]);

	const visibleCompetitions = useMemo(() => {
		return filteredCompetitions.slice(0, visibleCount);
	}, [filteredCompetitions, visibleCount]);

	const hasMore = visibleCount < filteredCompetitions.length;

	const handleLoadMore = useCallback(() => {
		setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
	}, [ITEMS_PER_PAGE]);

	const clearFilters = () => setFilters(defaultFilters);

	const handleItemClick = useCallback((index: number) => {
		setSelectedIndex(index);
	}, []);

	const handleCloseDialog = useCallback(() => {
		setSelectedIndex(null);
	}, []);

	const handlePrevious = useCallback(() => {
		setSelectedIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : prev));
	}, []);

	const handleNext = useCallback(() => {
		setSelectedIndex((prev) =>
			prev !== null && prev < filteredCompetitions.length - 1 ? prev + 1 : prev,
		);
	}, [filteredCompetitions.length]);

	const selectedCompetition =
		selectedIndex !== null ? filteredCompetitions[selectedIndex] : null;

	// Mobile View - keeps existing card/poster view with dialog
	if (isMobile) {
		return (
			<section className="py-8">
				<div className="container">
					<div className="mb-6 flex flex-col gap-3">
						<SearchBar
							value={searchQuery}
							onChange={onSearchChange}
							sortBy={sortBy}
							onSortChange={(v) => setSortBy(v as SortOption)}
							resultCount={filteredCompetitions.length}
							onToggleFilters={() => setShowFilters(!showFilters)}
							showFilters={showFilters}
						/>
						<div
							className={`overflow-hidden transition-all duration-300 ease-out ${showFilters ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
								}`}
						>
							<Filters
								filters={filters}
								onFiltersChange={setFilters}
								onClearFilters={clearFilters}
							/>
						</div>
						<div className="flex items-center justify-between">
							<p className="text-xs text-muted-foreground">
								{filteredCompetitions.length} kompetisi
							</p>
							<ViewToggle
								viewMode={viewMode}
								onViewModeChange={handleViewModeChange}
							/>
						</div>
					</div>

					{filteredCompetitions.length === 0 ? (
						<div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-16">
							<p className="text-sm font-medium text-muted-foreground">
								Tidak ada kompetisi yang cocok
							</p>
							<Button
								variant="outline"
								size="sm"
								onClick={clearFilters}
								className="mt-4 text-xs"
							>
								Reset Filter
							</Button>
						</div>
					) : viewMode === "grid" ? (
						<>
							<div className="grid gap-3 grid-cols-1">
								{visibleCompetitions.map((competition, index) => (
									<CompetitionCard
										key={competition.id}
										competition={competition}
										isBookmarked={bookmarks.includes(competition.id)}
										onToggleBookmark={onToggleBookmark}
										onOrganizerClick={onOrganizerClick}
										onClick={() => handleItemClick(index)}
									/>
								))}
							</div>
							{hasMore && (
								<div className="mt-6 flex justify-center">
									<Button variant="outline" onClick={handleLoadMore}>
										Muat lebih banyak (
										{filteredCompetitions.length - visibleCount} lagi)
									</Button>
								</div>
							)}
						</>
					) : (
						<>
							<div className="grid gap-4 grid-cols-1">
								{visibleCompetitions.map((competition, index) => (
									<CompetitionCardPoster
										key={competition.id}
										competition={competition}
										isBookmarked={bookmarks.includes(competition.id)}
										onToggleBookmark={onToggleBookmark}
										onClick={() => handleItemClick(index)}
									/>
								))}
							</div>
							{hasMore && (
								<div className="mt-6 flex justify-center">
									<Button variant="outline" onClick={handleLoadMore}>
										Muat lebih banyak (
										{filteredCompetitions.length - visibleCount} lagi)
									</Button>
								</div>
							)}
						</>
					)}

					{/* Mobile Dialog */}
					<CompetitionDialog
						competition={selectedCompetition}
						isOpen={selectedIndex !== null}
						onClose={handleCloseDialog}
						onPrevious={handlePrevious}
						onNext={handleNext}
						hasPrevious={selectedIndex !== null && selectedIndex > 0}
						hasNext={
							selectedIndex !== null &&
							selectedIndex < filteredCompetitions.length - 1
						}
					/>
				</div>
			</section>
		);
	}

	// Desktop View - Normal grid/poster, split view only when clicked
	return (
		<section className="py-8 md:py-12">
			<div className="container">
				<div className="mb-6 flex flex-col gap-3">
					<SearchBar
						value={searchQuery}
						onChange={onSearchChange}
						sortBy={sortBy}
						onSortChange={(v) => setSortBy(v as SortOption)}
						resultCount={filteredCompetitions.length}
						onToggleFilters={() => setShowFilters(!showFilters)}
						showFilters={showFilters}
					/>
					<div
						className={`overflow-hidden transition-all duration-300 ease-out ${showFilters ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
							}`}
					>
						<Filters
							filters={filters}
							onFiltersChange={setFilters}
							onClearFilters={clearFilters}
						/>
					</div>
					<div className="flex items-center justify-between">
						<p className="text-sm text-muted-foreground">
							{filteredCompetitions.length} kompetisi ditemukan
						</p>
						<ViewToggle
							viewMode={viewMode}
							onViewModeChange={handleViewModeChange}
						/>
					</div>
				</div>

				{filteredCompetitions.length === 0 ? (
					<div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-16">
						<p className="text-sm font-medium text-muted-foreground">
							Tidak ada kompetisi yang cocok
						</p>
						<Button
							variant="outline"
							size="sm"
							onClick={clearFilters}
							className="mt-4 text-xs"
						>
							Reset Filter
						</Button>
					</div>
				) : selectedIndex !== null ? (
					/* Split View - when a card is clicked */
					<div className="grid grid-cols-3 gap-6">
						{/* Left - Single column gallery */}
						<div className="col-span-1">
							<ScrollArea className="h-[calc(100vh-280px)]">
								<div className="flex flex-col gap-3 pr-4">
									{visibleCompetitions.map((competition, index) => (
										<CompetitionGalleryItem
											key={competition.id}
											competition={competition}
											isSelected={selectedIndex === index}
											onClick={() => handleItemClick(index)}
										/>
									))}
									{hasMore && (
										<Button
											variant="outline"
											size="sm"
											onClick={handleLoadMore}
											className="mt-2"
										>
											Muat{" "}
											{Math.min(
												ITEMS_PER_PAGE,
												filteredCompetitions.length - visibleCount,
											)}{" "}
											lagi
										</Button>
									)}
								</div>
							</ScrollArea>
						</div>

						{/* Right - Large detail panel */}
						<div className="col-span-2 sticky top-[4.5rem] h-[calc(100vh-6rem)]">
							<CompetitionDetailPanel
								competition={selectedCompetition}
								onClose={handleCloseDialog}
							/>
						</div>
					</div>
				) : viewMode === "grid" ? (
					/* Normal Card Grid View */
					<>
						<div className="grid gap-4 grid-cols-2 lg:grid-cols-3">
							{visibleCompetitions.map((competition, index) => (
								<CompetitionCard
									key={competition.id}
									competition={competition}
									isBookmarked={bookmarks.includes(competition.id)}
									onToggleBookmark={onToggleBookmark}
									onOrganizerClick={onOrganizerClick}
									onClick={() => handleItemClick(index)}
								/>
							))}
						</div>
						{hasMore && (
							<div className="mt-6 flex justify-center">
								<Button variant="outline" onClick={handleLoadMore}>
									Muat lebih banyak (
									{filteredCompetitions.length - visibleCount} lagi)
								</Button>
							</div>
						)}
					</>
				) : (
					/* Normal Poster Grid View - Landing page keeps poster format */
					<>
						<div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
							{visibleCompetitions.map((competition, index) => (
								<CompetitionCardPoster
									key={competition.id}
									competition={competition}
									isBookmarked={bookmarks.includes(competition.id)}
									onToggleBookmark={onToggleBookmark}
									onClick={() => handleItemClick(index)}
									onLongPress={() => setDialogIndex(index)}
								/>
							))}
						</div>
						{hasMore && (
							<div className="mt-6 flex justify-center">
								<Button variant="outline" onClick={handleLoadMore}>
									Muat lebih banyak (
									{filteredCompetitions.length - visibleCount} lagi)
								</Button>
							</div>
						)}
						{/* Desktop Poster Long Press Dialog */}
						<CompetitionDialog
							competition={
								dialogIndex !== null ? filteredCompetitions[dialogIndex] : null
							}
							isOpen={dialogIndex !== null}
							onClose={() => setDialogIndex(null)}
							onPrevious={() =>
								setDialogIndex((prev) =>
									prev !== null && prev > 0 ? prev - 1 : prev,
								)
							}
							onNext={() =>
								setDialogIndex((prev) =>
									prev !== null && prev < filteredCompetitions.length - 1
										? prev + 1
										: prev,
								)
							}
							hasPrevious={dialogIndex !== null && dialogIndex > 0}
							hasNext={
								dialogIndex !== null &&
								dialogIndex < filteredCompetitions.length - 1
							}
						/>
					</>
				)}
			</div>
		</section>
	);
}
