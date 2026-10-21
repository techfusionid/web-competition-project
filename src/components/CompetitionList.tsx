import { useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import type { Competition } from "@/types/competition";
import {
	CompetitionCard,
	CompetitionCardSkeleton,
} from "./CompetitionCardGrid";
import {
	CompetitionCardPoster,
	CompetitionCardPosterSkeleton,
} from "./CompetitionCardPoster";
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

function matchCompetition(
	comp: Competition,
	searchQuery: string,
	categorySet: ReadonlySet<string>,
	levelSet: ReadonlySet<string>,
	filters: FilterState
): boolean {
	if (searchQuery) {
		const query = searchQuery.toLowerCase();
		const matchesSearch =
			comp.title.toLowerCase().includes(query) ||
			comp.description.toLowerCase().includes(query) ||
			comp.organizer.toLowerCase().includes(query) ||
			comp.category.toLowerCase().includes(query);
		if (!matchesSearch) return false;
	}

	if (filters.categories.length > 0 && !categorySet.has(comp.category)) {
		return false;
	}

	if (filters.levels.length > 0 && !comp.level.some((l) => levelSet.has(l))) {
		return false;
	}

	if (filters.format !== "all" && comp.format !== filters.format) return false;

	if (
		filters.participationType !== "all" &&
		comp.participationType !== filters.participationType
	)
		return false;

	return true;
}

// ── Sub-components ────────────────────────────────────────────────

interface MobileSkeletonListProps {
	viewMode: ViewMode;
}

function MobileSkeletonList({ viewMode }: MobileSkeletonListProps) {
	return (
		<div
			className={
				viewMode === "card"
					? "grid grid-cols-1 gap-3"
					: "grid grid-cols-2 gap-2.5 min-[420px]:gap-3"
			}
		>
			{Array.from({ length: SKELETON_COUNT_MOBILE }).map((_, i) => (
				<div key={i}>
					{viewMode === "poster" ? (
						<CompetitionCardPosterSkeleton />
					) : (
						<CompetitionCardSkeleton />
					)}
				</div>
			))}
		</div>
	);
}

interface MobileEmptyStateProps {
	onClearFilters: () => void;
}

function MobileEmptyState({ onClearFilters }: MobileEmptyStateProps) {
	return (
		<div className="flex flex-col items-center justify-center rounded-lg border border-border border-dashed py-16">
			<p className="font-medium text-muted-foreground text-sm">
				Tidak ada kompetisi yang cocok
			</p>
			<Button
				className="mt-4 text-xs"
				onClick={onClearFilters}
				size="sm"
				variant="outline"
			>
				Reset Filter
			</Button>
		</div>
	);
}

interface MobileCompetitionListProps {
	competitions: Competition[];
	viewMode: ViewMode;
	onItemClick: (index: number) => void;
	onLongPress: (index: number) => void;
	hasMore: boolean;
	onLoadMore: () => void;
	remainingCount: number;
}

function MobileCompetitionList({
	competitions,
	viewMode,
	onItemClick,
	onLongPress,
	hasMore,
	onLoadMore,
	remainingCount,
}: MobileCompetitionListProps) {
	return (
		<>
			<div
				className={
					viewMode === "card"
						? "grid grid-cols-1 gap-3"
						: "grid grid-cols-2 gap-2.5 min-[420px]:gap-3"
				}
			>
				{competitions.map((competition, index) => (
					<div className="min-w-0" key={competition.id}>
						{viewMode === "card" ? (
							<CompetitionCard
								competition={competition}
								onClick={() => onItemClick(index)}
							/>
						) : (
							<CompetitionCardPoster
								competition={competition}
								onClick={() => onItemClick(index)}
								onLongPress={() => onLongPress(index)}
							/>
						)}
					</div>
				))}
			</div>
			{hasMore && (
				<div className="mt-6 flex justify-center">
					<Button onClick={onLoadMore} size="sm" variant="outline">
						Lihat {remainingCount} lainnya
					</Button>
				</div>
			)}
		</>
	);
}

interface DesktopSkeletonGridProps {
	viewMode: ViewMode;
}

function DesktopSkeletonGrid({ viewMode }: DesktopSkeletonGridProps) {
	return viewMode === "poster" ? (
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
	);
}

interface DesktopEmptyStateProps {
	onClearFilters: () => void;
}

function DesktopEmptyState({ onClearFilters }: DesktopEmptyStateProps) {
	return (
		<div className="flex flex-col items-center justify-center rounded-lg border border-border border-dashed py-16">
			<p className="font-medium text-muted-foreground text-sm">
				Tidak ada kompetisi yang cocok
			</p>
			<Button
				className="mt-4 text-xs"
				onClick={onClearFilters}
				size="sm"
				variant="outline"
			>
				Reset Filter
			</Button>
		</div>
	);
}

interface DesktopCardGridProps {
	competitions: Competition[];
	viewMode: ViewMode;
	onItemClick: (index: number) => void;
	onOrganizerClick: (organizer: string) => void;
	onLongPress: (index: number) => void;
	hasMore: boolean;
	onLoadMore: () => void;
	remainingCount: number;
	setPosterPopupIndex: (index: number | null) => void;
	posterPopupIndex: number | null;
	filteredCompetitions: Competition[];
}

function DesktopCardGrid({
	competitions,
	viewMode,
	onItemClick,
	onOrganizerClick,
	onLongPress,
	hasMore,
	onLoadMore,
	remainingCount,
	setPosterPopupIndex,
	posterPopupIndex,
	filteredCompetitions,
}: DesktopCardGridProps) {
	if (viewMode === "card") {
		return (
			<>
				<div className="grid grid-cols-2 gap-4 md:grid-cols-3">
					{competitions.map((competition, index) => (
						<CompetitionCard
							competition={competition}
							key={competition.id}
							onClick={() => onItemClick(index)}
							onOrganizerClick={onOrganizerClick}
						/>
					))}
				</div>
				{hasMore && (
					<div className="mt-6 flex justify-center">
						<Button onClick={onLoadMore} variant="outline">
							Lihat {remainingCount} lainnya
						</Button>
					</div>
				)}
			</>
		);
	}

	return (
		<>
			<div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
				{competitions.map((competition, index) => (
					<CompetitionCardPoster
						competition={competition}
						key={competition.id}
						onClick={() => onItemClick(index)}
						onLongPress={() => onLongPress(index)}
					/>
				))}
			</div>
			{hasMore && (
				<div className="mt-6 flex justify-center">
					<Button onClick={onLoadMore} variant="outline">
						Lihat {remainingCount} lainnya
					</Button>
				</div>
			)}
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
	);
}

interface CompetitionFilterBarProps {
	searchQuery: string;
	onSearchChange: (query: string) => void;
	showFilters: boolean;
	setShowFilters: (show: boolean) => void;
	filteredCompetitions: Competition[];
	filters: FilterState;
	clearFilters: () => void;
	setFilters: (filters: FilterState) => void;
	onViewModeChange: (mode: ViewMode) => void;
	viewMode: ViewMode;
	isLoading: boolean;
	isMobile: boolean;
}

function CompetitionFilterBar({
	searchQuery,
	onSearchChange,
	showFilters,
	setShowFilters,
	filteredCompetitions,
	filters,
	clearFilters,
	setFilters,
	onViewModeChange,
	viewMode,
	isLoading,
	isMobile,
}: CompetitionFilterBarProps) {
	return (
		<div className="mb-4 flex flex-col gap-2 sm:mb-6 sm:gap-3">
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
			{isMobile ? (
				<div className="flex items-center justify-between">
					<p className="text-muted-foreground text-xs">
						{isLoading ? (
							<span className="inline-block h-3.5 w-20 animate-pulse rounded bg-muted" />
						) : (
							<>{filteredCompetitions.length} kompetisi</>
						)}
					</p>
					<ViewToggle onViewModeChange={onViewModeChange} viewMode={viewMode} />
				</div>
			) : (
				<div className="flex flex-wrap items-center justify-end gap-3">
					<ViewToggle onViewModeChange={onViewModeChange} viewMode={viewMode} />
				</div>
			)}
		</div>
	);
}

interface CompetitionDetailViewProps {
	detailViewMode: DetailViewMode;
	selectedIndex: number | null;
	dialogIndex: number | null;
	filteredCompetitions: Competition[];
	handleCloseDialog: () => void;
	handleDetailViewModeChange: (mode: DetailViewMode) => void;
	handleSheetNext: () => void;
	handleSheetPrevious: () => void;
	setDialogIndex: (index: number | null) => void;
}

function CompetitionDetailView({
	detailViewMode,
	selectedIndex,
	dialogIndex,
	filteredCompetitions,
	handleCloseDialog,
	handleDetailViewModeChange,
	handleSheetNext,
	handleSheetPrevious,
	setDialogIndex,
}: CompetitionDetailViewProps) {
	return (
		<>
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
					onNext={handleSheetNext}
					onPrevious={handleSheetPrevious}
				/>
			)}
			{detailViewMode === "sheet" && (
				<CompetitionSheet
					competition={
						selectedIndex !== null ? filteredCompetitions[selectedIndex] : null
					}
					detailViewMode={detailViewMode}
					hasNext={
						selectedIndex !== null &&
						selectedIndex < filteredCompetitions.length - 1
					}
					hasPrevious={selectedIndex !== null && selectedIndex > 0}
					isOpen={selectedIndex !== null}
					key={selectedIndex}
					onClose={handleCloseDialog}
					onDetailViewModeChange={handleDetailViewModeChange}
					onNext={handleSheetNext}
					onPrevious={handleSheetPrevious}
				/>
			)}
		</>
	);
}

// ── Main Component ────────────────────────────────────────────────

export function CompetitionList({
	competitions,
	searchQuery,
	onSearchChange,
	bookmarks,
	onToggleBookmark,
	onOrganizerClick,
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

	const categorySet = useMemo(
		() => new Set(filters.categories),
		[filters.categories]
	);
	const levelSet = useMemo(() => new Set(filters.levels), [filters.levels]);

	const filteredCompetitions = useMemo(() => {
		const result = competitions.filter((comp) =>
			matchCompetition(comp, searchQuery, categorySet, levelSet, filters)
		);

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
	}, [competitions, searchQuery, filters, sortBy, categorySet, levelSet]);

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

	const remainingCount = filteredCompetitions.length - visibleCount;
	const handleLongPress = useCallback(
		(index: number) => {
			if (isMobile) {
				setPosterPopupIndex(index);
			} else {
				setDialogIndex(index);
			}
		},
		[isMobile]
	);

	const selectedCompetition =
		selectedIndex !== null ? filteredCompetitions[selectedIndex] : null;

	const sharedFilterBar = (
		<CompetitionFilterBar
			clearFilters={clearFilters}
			filteredCompetitions={filteredCompetitions}
			filters={filters}
			isLoading={isLoading}
			isMobile={isMobile}
			onSearchChange={onSearchChange}
			onViewModeChange={handleViewModeChange}
			searchQuery={searchQuery}
			setFilters={setFilters}
			setShowFilters={setShowFilters}
			showFilters={showFilters}
			viewMode={viewMode}
		/>
	);

	// Mobile View - Horizontal carousel with drawer
	if (isMobile) {
		return (
			<section className="py-8">
				<div className="container">
					{sharedFilterBar}

					{isLoading ? (
						<MobileSkeletonList viewMode={viewMode} />
					) : filteredCompetitions.length === 0 ? (
						<MobileEmptyState onClearFilters={clearFilters} />
					) : (
						<MobileCompetitionList
							competitions={visibleCompetitions}
							hasMore={hasMore}
							onItemClick={handleItemClick}
							onLoadMore={handleLoadMore}
							onLongPress={setPosterPopupIndex}
							remainingCount={remainingCount}
							viewMode={viewMode}
						/>
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
				{sharedFilterBar}

				{isLoading ? (
					<DesktopSkeletonGrid viewMode={viewMode} />
				) : filteredCompetitions.length === 0 ? (
					<DesktopEmptyState onClearFilters={clearFilters} />
				) : (
					<DesktopCardGrid
						competitions={visibleCompetitions}
						filteredCompetitions={filteredCompetitions}
						hasMore={hasMore}
						onItemClick={handleItemClick}
						onLoadMore={handleLoadMore}
						onLongPress={handleLongPress}
						onOrganizerClick={onOrganizerClick}
						posterPopupIndex={posterPopupIndex}
						remainingCount={remainingCount}
						setPosterPopupIndex={setPosterPopupIndex}
						viewMode={viewMode}
					/>
				)}

				{/* Desktop detail dialog/sheet */}
				<CompetitionDetailView
					detailViewMode={detailViewMode}
					dialogIndex={dialogIndex}
					filteredCompetitions={filteredCompetitions}
					handleCloseDialog={handleCloseDialog}
					handleDetailViewModeChange={handleDetailViewModeChange}
					handleSheetNext={handleSheetNext}
					handleSheetPrevious={handleSheetPrevious}
					selectedIndex={selectedIndex}
					setDialogIndex={setDialogIndex}
				/>
			</div>
		</section>
	);
}
