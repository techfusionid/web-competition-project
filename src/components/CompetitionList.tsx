import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
} from "@/components/ui/carousel";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useIsMobile } from "@/hooks/use-mobile";
import type { Competition } from "@/types/competition";
import { CompetitionCard } from "./CompetitionCard";
import { CompetitionCardPoster } from "./CompetitionCardPoster";
import { CompetitionDetailPanel } from "./CompetitionDetailPanel";
import { CompetitionDialog } from "./CompetitionDialog";
import { CompetitionDrawer } from "./CompetitionDrawer";
import { CompetitionGalleryItem } from "./CompetitionGalleryItem";
import { type FilterState, Filters } from "./Filters";
import { PosterPopup } from "./PosterPopup";
import { SearchBar } from "./SearchBar";
import { type ViewMode, ViewToggle } from "./ViewToggle";

interface CompetitionListProps {
	competitions: Competition[];
	searchQuery: string;
	onSearchChange: (query: string) => void;
	bookmarks: string[];
	onToggleBookmark: (id: string) => void;
	onOrganizerClick: (organizer: string) => void;
	resetTrigger?: number;
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
	resetTrigger,
}: CompetitionListProps) {
	const isMobile = useIsMobile();
	const [filters, setFilters] = useState<FilterState>(defaultFilters);
	const [sortBy, setSortBy] = useState<SortOption>("deadline");
	const [showFilters, setShowFilters] = useState(false);
	const [viewMode, setViewMode] = useState<ViewMode>("grid");
	const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
	const [dialogIndex, setDialogIndex] = useState<number | null>(null);
	const [posterPopupIndex, setPosterPopupIndex] = useState<number | null>(null);
	const [visibleCount, setVisibleCount] = useState(20);
	const selectedItemRef = useRef<HTMLDivElement>(null);

	const ITEMS_PER_PAGE = 20;

	// Auto-scroll to selected item in gallery
	useEffect(() => {
		if (selectedIndex !== null && selectedItemRef.current) {
			selectedItemRef.current.scrollIntoView({
				behavior: "smooth",
				block: "center",
			});
		}
	}, [selectedIndex]);

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

	// Reset view when resetTrigger changes (e.g., when clicking home/logo)
	useEffect(() => {
		if (resetTrigger !== undefined) {
			setSelectedIndex(null);
		}
	}, [resetTrigger]);

	const filteredCompetitions = useMemo(() => {
		const result = competitions.filter((comp) => {
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
			prev !== null && prev < filteredCompetitions.length - 1 ? prev + 1 : prev
		);
	}, [filteredCompetitions.length]);

	const selectedCompetition =
		selectedIndex !== null ? filteredCompetitions[selectedIndex] : null;

	// Mobile View - Horizontal carousel with drawer
	if (isMobile) {
		return (
			<section className="py-8">
				<div className="container">
					<div className="mb-6 flex flex-col gap-3">
						<SearchBar
							onChange={onSearchChange}
							onToggleFilters={() => setShowFilters(!showFilters)}
							resultCount={filteredCompetitions.length}
							showFilters={showFilters}
							value={searchQuery}
						/>
						<div
							className={`overflow-hidden transition-all duration-300 ease-out ${
								showFilters ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
							}`}
						>
							<Filters
								filters={filters}
								onClearFilters={clearFilters}
								onFiltersChange={setFilters}
							/>
						</div>
						<div className="flex items-center justify-between">
							<p className="text-xs text-muted-foreground">
								{filteredCompetitions.length} competition{filteredCompetitions.length !== 1 ? "s" : ""}
							</p>
							<ViewToggle
								onViewModeChange={handleViewModeChange}
								viewMode={viewMode}
							/>
						</div>
					</div>

					{filteredCompetitions.length === 0 ? (
						<div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-16">
							<p className="text-sm font-medium text-muted-foreground">
								No competitions match
							</p>
							<Button
								className="mt-4 text-xs"
								onClick={clearFilters}
								size="sm"
								variant="outline"
							>
								Reset Filters
							</Button>
						</div>
					) : (
						<>
							{/* Horizontal Carousel */}
							<Carousel
								className="w-full"
								opts={{
									align: "center",
									loop: false,
									dragFree: false,
								}}
							>
								<CarouselContent className="-ml-3">
									{visibleCompetitions.map((competition, index) => (
										<CarouselItem
											className="pl-3 basis-[80%] sm:basis-[65%]"
											key={competition.id}
										>
											{viewMode === "grid" ? (
												<CompetitionCard
													competition={competition}
													onClick={() => handleItemClick(index)}
													onOrganizerClick={onOrganizerClick}
												/>
											) : (
												<CompetitionCardPoster
													competition={competition}
													isBookmarked={bookmarks.includes(competition.id)}
													onClick={() => handleItemClick(index)}
													onLongPress={() => setPosterPopupIndex(index)}
													onToggleBookmark={onToggleBookmark}
												/>
											)}
										</CarouselItem>
									))}
									{hasMore && (
										<CarouselItem className="pl-3 basis-[80%] sm:basis-[65%]">
											<div className="flex h-full min-h-[200px] items-center justify-center rounded-lg border border-dashed border-border bg-muted/30">
												<Button
													onClick={handleLoadMore}
													size="sm"
													variant="outline"
												>
													Load {filteredCompetitions.length - visibleCount} more
												</Button>
											</div>
										</CarouselItem>
									)}
								</CarouselContent>
							</Carousel>
						</>
					)}

					{/* Mobile Drawer */}
					<CompetitionDrawer
						competition={selectedCompetition}
						isOpen={selectedIndex !== null}
						onClose={handleCloseDialog}
					/>

					{/* Mobile Poster Popup - Shows clear poster on long press */}
					<PosterPopup
						competition={
							posterPopupIndex !== null
								? filteredCompetitions[posterPopupIndex]
								: null
						}
						isOpen={posterPopupIndex !== null}
						onClose={() => setPosterPopupIndex(null)}
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
						onChange={onSearchChange}
						onToggleFilters={() => setShowFilters(!showFilters)}
						resultCount={filteredCompetitions.length}
						showFilters={showFilters}
						value={searchQuery}
					/>
					<div
						className={`overflow-hidden transition-all duration-300 ease-out ${
							showFilters ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
						}`}
					>
						<Filters
							filters={filters}
							onClearFilters={clearFilters}
							onFiltersChange={setFilters}
						/>
					</div>
					<div className="flex items-center justify-between">
						<p className="text-sm text-muted-foreground">
							{filteredCompetitions.length} competition{filteredCompetitions.length !== 1 ? "s" : ""} found
						</p>
						<ViewToggle
							onViewModeChange={handleViewModeChange}
							viewMode={viewMode}
						/>
					</div>
				</div>

				{filteredCompetitions.length === 0 ? (
					<div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-16">
						<p className="text-sm font-medium text-muted-foreground">
							No competitions match
						</p>
						<Button
							className="mt-4 text-xs"
							onClick={clearFilters}
							size="sm"
							variant="outline"
						>
							Reset Filters
						</Button>
					</div>
				) : selectedIndex !== null ? (
					/* Split View - when a card is clicked */
					<div className="grid grid-cols-5 gap-4">
						{/* Left - Scrollable gallery with 2 columns of posters */}
						<div className="col-span-2 min-w-0 overflow-hidden">
							<ScrollArea className="h-[calc(100vh-6rem)]">
								<div className="grid grid-cols-2 gap-2 pr-3 pl-1 pt-1">
									{visibleCompetitions.map((competition, index) => {
										const isCurrentlySelected = selectedIndex === index;

										return (
											<div
												className={`transition-all duration-300 ${
													isCurrentlySelected
														? "opacity-100 scale-[1.02]"
														: "opacity-60 hover:opacity-100"
												}`}
												key={competition.id}
												ref={isCurrentlySelected ? selectedItemRef : null}
											>
												<CompetitionGalleryItem
													competition={competition}
													isSelected={isCurrentlySelected}
													onClick={() => handleItemClick(index)}
												/>
											</div>
										);
									})}
									{hasMore && (
										<div className="col-span-2">
											<Button
												className="mt-2 w-full"
												onClick={handleLoadMore}
												size="sm"
												variant="outline"
											>
												Load{" "}
												{Math.min(
													ITEMS_PER_PAGE,
													filteredCompetitions.length - visibleCount
												)}{" "}
												more
											</Button>
										</div>
									)}
								</div>
							</ScrollArea>
						</div>

						{/* Right - Large detail panel */}
						<div className="col-span-3 sticky top-18 h-[calc(100vh-6rem)]">
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
									competition={competition}
									key={competition.id}
									onClick={() => handleItemClick(index)}
									onOrganizerClick={onOrganizerClick}
								/>
							))}
						</div>
						{hasMore && (
							<div className="mt-6 flex justify-center">
								<Button onClick={handleLoadMore} variant="outline">
									Load more (
									{filteredCompetitions.length - visibleCount} more)
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
									competition={competition}
									isBookmarked={bookmarks.includes(competition.id)}
									key={competition.id}
									onClick={() => handleItemClick(index)}
									onLongPress={() => {
										// On mobile, show poster popup; on desktop, show full dialog
										if (isMobile) {
											setPosterPopupIndex(index);
										} else {
											setDialogIndex(index);
										}
									}}
									onToggleBookmark={onToggleBookmark}
								/>
							))}
						</div>
						{hasMore && (
							<div className="mt-6 flex justify-center">
								<Button onClick={handleLoadMore} variant="outline">
									Load more (
									{filteredCompetitions.length - visibleCount} more)
								</Button>
							</div>
						)}
						{/* Desktop Poster Long Press Dialog */}
						<CompetitionDialog
							competition={
								dialogIndex !== null ? filteredCompetitions[dialogIndex] : null
							}
							hasNext={
								dialogIndex !== null &&
								dialogIndex < filteredCompetitions.length - 1
							}
							hasPrevious={dialogIndex !== null && dialogIndex > 0}
							isOpen={dialogIndex !== null}
							onClose={() => setDialogIndex(null)}
							onNext={() =>
								setDialogIndex((prev) =>
									prev !== null && prev < filteredCompetitions.length - 1
										? prev + 1
										: prev
								)
							}
							onPrevious={() =>
								setDialogIndex((prev) =>
									prev !== null && prev > 0 ? prev - 1 : prev
								)
							}
						/>
						{/* Mobile Poster Popup - Shows clear poster on long press */}
						<PosterPopup
							competition={
								posterPopupIndex !== null
									? filteredCompetitions[posterPopupIndex]
									: null
							}
							isOpen={posterPopupIndex !== null}
							onClose={() => setPosterPopupIndex(null)}
						/>
					</>
				)}
			</div>
		</section>
	);
}
