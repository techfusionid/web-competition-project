import { useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
} from "@/components/ui/carousel";
import { useIsMobile } from "@/hooks/use-mobile";
import type { Competition } from "@/types/competition";
import { CompetitionCard, CompetitionCardSkeleton } from "./CompetitionCardGrid";
import { CompetitionCardPoster, CompetitionCardPosterSkeleton } from "./CompetitionCardPoster";
import { CompetitionDialog } from "./CompetitionCenterDialog";
import { CompetitionDrawer } from "./CompetitionDrawer";
import { CompetitionSheet } from "./CompetitionSideSheet";
import type { DetailViewMode } from "./DetailViewToggle";
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
	isLoading?: boolean;
}

const defaultFilters: FilterState = {
	categories: [],
	levels: [],
	format: "all",
	participationType: "all",
};

type SortOption = "deadline" | "name";

const VIEW_MODE_KEY = "competitions-view-mode";
const DETAIL_VIEW_MODE_KEY = "competitions-detail-view-mode";
const ITEMS_PER_PAGE = 20;

function getInitialViewMode(isMobile: boolean): ViewMode {
	if (typeof window === "undefined") {
		return isMobile ? "poster" : "card";
	}
	const stored = localStorage.getItem(VIEW_MODE_KEY);
	if (stored === "card" || stored === "poster") {
		return stored;
	}
	return isMobile ? "poster" : "card";
}

const SKELETON_COUNT_CARD = 12;
const SKELETON_COUNT_POSTER = 16;
const SKELETON_COUNT_MOBILE = 3;

export function CompetitionList({
	competitions,
	searchQuery,
	onSearchChange,
	bookmarks,
	onToggleBookmark,
	onOrganizerClick,
	resetTrigger,
	isLoading = false,
}: CompetitionListProps) {
	const isMobile = useIsMobile();
	const [filters, setFilters] = useState<FilterState>(defaultFilters);
	const [sortBy, _setSortBy] = useState<SortOption>("deadline");
	const [showFilters, setShowFilters] = useState(false);
	const [viewMode, setViewMode] = useState<ViewMode>("card");
	const [detailViewMode, setDetailViewMode] =
		useState<DetailViewMode>("dialog");
	const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
	const [dialogIndex, setDialogIndex] = useState<number | null>(null);
	const [posterPopupIndex, setPosterPopupIndex] = useState<number | null>(null);
	const [visibleCount, setVisibleCount] = useState(20);

	// Update view mode when it changes and persist to localStorage
	const handleViewModeChange = useCallback((mode: ViewMode) => {
		setViewMode(mode);
		localStorage.setItem(VIEW_MODE_KEY, mode);
	}, []);

	// Update detail view mode when it changes and persist to localStorage
	const handleDetailViewModeChange = useCallback(
		(mode: DetailViewMode) => {
			// When switching from dialog to sheet, transfer dialogIndex to selectedIndex
			if (
				detailViewMode === "dialog" &&
				mode === "sheet" &&
				dialogIndex !== null
			) {
				setSelectedIndex(dialogIndex);
				setDialogIndex(null);
			}
			// When switching from sheet to dialog, transfer selectedIndex to dialogIndex
			else if (
				detailViewMode === "sheet" &&
				mode === "dialog" &&
				selectedIndex !== null
			) {
				setDialogIndex(selectedIndex);
				setSelectedIndex(null);
			}
			setDetailViewMode(mode);
			localStorage.setItem(DETAIL_VIEW_MODE_KEY, mode);
		},
		[detailViewMode, dialogIndex, selectedIndex]
	);

	// Initialize detail view mode on mount from localStorage
	useEffect(() => {
		const stored = localStorage.getItem(DETAIL_VIEW_MODE_KEY);
		if (stored === "dialog" || stored === "sheet") {
			setDetailViewMode(stored);
		}
	}, []);

	// Initialize view mode on mount and handle device changes
	useEffect(() => {
		const initialMode = getInitialViewMode(isMobile);
		setViewMode(initialMode);
	}, [isMobile]);

	// Close split view / dialog and reset visible count when filters change
	useEffect(() => {
		setSelectedIndex(null);
		setDialogIndex(null);
		setVisibleCount(20);
	}, []);

	// Reset view when resetTrigger changes (e.g., when clicking home/logo)
	useEffect(() => {
		if (resetTrigger !== undefined) {
			setSelectedIndex(null);
			setFilters(defaultFilters);
			setVisibleCount(20);
			setShowFilters(false);
			setDialogIndex(null);
			setPosterPopupIndex(null);
			// Scroll to top of competitions section
			const competitionsSection = document.getElementById("competitions");
			if (competitionsSection) {
				competitionsSection.scrollIntoView({ behavior: "smooth" });
			}
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
				if (!matchesSearch) {
					return false;
				}
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

			return true;
		});

		result.sort((a, b) => {
			switch (sortBy) {
				case "deadline":
					return (
						new Date(b.deadline).getTime() - new Date(a.deadline).getTime()
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
	}, []);

	const clearFilters = () => setFilters(defaultFilters);

	const handleItemClick = useCallback(
		(index: number) => {
			if (detailViewMode === "dialog") {
				setDialogIndex(index);
			} else if (detailViewMode === "sheet") {
				setSelectedIndex(index);
			}
		},
		[detailViewMode]
	);

	const handleCloseDialog = useCallback(() => {
		setSelectedIndex(null);
	}, []);

	const handleSheetPrevious = useCallback(() => {
		setSelectedIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : prev));
	}, []);

	const handleSheetNext = useCallback(() => {
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
							<p className="text-muted-foreground text-xs">
								{isLoading ? (
									<span className="inline-block h-3.5 w-20 animate-pulse rounded bg-muted" />
								) : (
									<>
										{filteredCompetitions.length} competition
										{filteredCompetitions.length !== 1 ? "s" : ""}
									</>
								)}
							</p>
							<ViewToggle
								onViewModeChange={handleViewModeChange}
								viewMode={viewMode}
							/>
						</div>
					</div>

					{isLoading ? (
						/* Mobile Skeleton Carousel */
						<Carousel
							className="w-full"
							opts={{ align: "center", loop: false, dragFree: false }}
						>
							<CarouselContent className="-ml-3">
								{Array.from({ length: SKELETON_COUNT_MOBILE }).map((_, i) => (
									<CarouselItem
										className="basis-[80%] pl-3 sm:basis-[65%]"
										key={i}
									>
										{viewMode === "poster" ? (
											<CompetitionCardPosterSkeleton />
										) : (
											<CompetitionCardSkeleton />
										)}
									</CarouselItem>
								))}
							</CarouselContent>
						</Carousel>
					) : filteredCompetitions.length === 0 ? (
						<div className="flex flex-col items-center justify-center rounded-lg border border-border border-dashed py-16">
							<p className="font-medium text-muted-foreground text-sm">
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
											className="basis-[80%] pl-3 sm:basis-[65%]"
											key={competition.id}
										>
											{viewMode === "card" ? (
												<CompetitionCard
													competition={competition}
													onClick={() => handleItemClick(index)}
													onOrganizerClick={onOrganizerClick}
												/>
											) : (
												<CompetitionCardPoster
													competition={competition}
													onClick={() => handleItemClick(index)}
													onLongPress={() => setPosterPopupIndex(index)}
												/>
											)}
										</CarouselItem>
									))}
									{hasMore && (
										<CarouselItem className="basis-[80%] pl-3 sm:basis-[65%]">
											<div className="flex h-full min-h-[200px] items-center justify-center rounded-lg border border-border border-dashed bg-muted/30">
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
					<div className="flex flex-wrap items-center justify-end gap-3">
						<ViewToggle
							onViewModeChange={handleViewModeChange}
							viewMode={viewMode}
						/>
					</div>
				</div>

				{isLoading ? (
					/* Desktop Skeleton Grid */
					viewMode === "poster" ? (
						<div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
							{Array.from({ length: SKELETON_COUNT_POSTER }).map((_, i) => (
								<CompetitionCardPosterSkeleton key={i} />
							))}
						</div>
					) : (
						<div className="grid grid-cols-2 gap-4 md:grid-cols-3">
							{Array.from({ length: SKELETON_COUNT_CARD }).map((_, i) => (
								<CompetitionCardSkeleton key={i} />
							))}
						</div>
					)
				) : filteredCompetitions.length === 0 ? (
					<div className="flex flex-col items-center justify-center rounded-lg border border-border border-dashed py-16">
						<p className="font-medium text-muted-foreground text-sm">
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
				) : viewMode === "card" ? (
					/* Normal Card Grid View */
					<>
						<div className="grid grid-cols-2 gap-4 md:grid-cols-3">
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
									Load more ({filteredCompetitions.length - visibleCount} more)
								</Button>
							</div>
						)}
					</>
				) : (
					/* Normal Poster Grid View - Landing page keeps poster format */
					<>
						<div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
							{visibleCompetitions.map((competition, index) => (
								<CompetitionCardPoster
									competition={competition}
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
								/>
							))}
						</div>
						{hasMore && (
							<div className="mt-6 flex justify-center">
								<Button onClick={handleLoadMore} variant="outline">
									Load more ({filteredCompetitions.length - visibleCount} more)
								</Button>
							</div>
						)}
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

				{/* Desktop detail dialog - used for dialog mode */}
				{detailViewMode === "dialog" && (
					<CompetitionDialog
						competition={
							dialogIndex !== null ? filteredCompetitions[dialogIndex] : null
						}
						detailViewMode={detailViewMode}
						hasNext={
							dialogIndex !== null &&
							dialogIndex < filteredCompetitions.length - 1
						}
						hasPrevious={dialogIndex !== null && dialogIndex > 0}
						isOpen={dialogIndex !== null}
						onClose={() => setDialogIndex(null)}
						onDetailViewModeChange={handleDetailViewModeChange}
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
				)}

				{/* Desktop sheet - used for sheet mode */}
				{detailViewMode === "sheet" && (
					<CompetitionSheet
						competition={selectedCompetition}
						detailViewMode={detailViewMode}
						hasNext={
							selectedIndex !== null &&
							selectedIndex < filteredCompetitions.length - 1
						}
						hasPrevious={selectedIndex !== null && selectedIndex > 0}
						isOpen={selectedIndex !== null}
						onClose={() => setSelectedIndex(null)}
						onDetailViewModeChange={handleDetailViewModeChange}
						onNext={handleSheetNext}
						onPrevious={handleSheetPrevious}
					/>
				)}
			</div>
		</section>
	);
}
