import * as DialogPrimitive from "@radix-ui/react-dialog";
import { format } from "date-fns";
import {
	BadgeCheck,
	Calendar,
	ChevronLeft,
	ChevronRight,
	ExternalLink,
	Flag,
	MapPin,
	Share2,
	Users,
	X,
} from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogOverlay,
	DialogPortal,
	DialogTitle,
} from "@/components/ui/dialog";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { type Competition, LEVELS } from "@/types/competition";
import { ClaimCompetitionDialog } from "./ClaimCompetitionDialog";
import { type DetailViewMode, DetailViewToggle } from "./DetailViewToggle";
import { ReportCompetitionDialog } from "./ReportCompetitionDialog";

interface CompetitionDialogProps {
	competition: Competition | null;
	isOpen: boolean;
	onClose: () => void;
	onPrevious: () => void;
	onNext: () => void;
	hasPrevious: boolean;
	hasNext: boolean;
	detailViewMode?: DetailViewMode;
	onDetailViewModeChange?: (mode: DetailViewMode) => void;
}

export function CompetitionDialog({
	competition,
	isOpen,
	onClose,
	onPrevious,
	onNext,
	hasPrevious,
	hasNext,
	detailViewMode = "dialog",
	onDetailViewModeChange,
}: CompetitionDialogProps) {
	const contentRef = useRef<HTMLDivElement>(null);
	const [showReport, setShowReport] = useState(false);
	const [showClaim, setShowClaim] = useState(false);
	const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(
		null
	);
	const [touchEnd, setTouchEnd] = useState<{ x: number; y: number } | null>(
		null
	);

	// Minimum swipe distance (in px)
	const minSwipeDistance = 50;

	// Memoize level labels to avoid recreating on every render
	const levelLabels = useMemo(
		() =>
			LEVELS.reduce(
				(acc, l) => {
					acc[l.value] = l.label;
					return acc;
				},
				{} as Record<string, string>
			),
		[]
	);

	// Memoize share data to avoid recreating
	const shareData = useMemo(
		() =>
			competition
				? {
						title: competition.title,
						text: `View competition "${competition.title}" on Competitions!`,
						url: competition.registrationUrl,
					}
				: null,
		[competition]
	);

	// Keyboard navigation (arrows: left/previous, right/next)
	useEffect(() => {
		if (!isOpen) {
			return;
		}

		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "ArrowLeft" && hasPrevious) {
				onPrevious();
			} else if (e.key === "ArrowRight" && hasNext) {
				onNext();
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [isOpen, hasPrevious, hasNext, onPrevious, onNext]);

	const onTouchStart = useCallback((e: React.TouchEvent) => {
		setTouchEnd(null);
		setTouchStart({
			x: e.targetTouches[0].clientX,
			y: e.targetTouches[0].clientY,
		});
	}, []);

	const onTouchMove = useCallback((e: React.TouchEvent) => {
		setTouchEnd({
			x: e.targetTouches[0].clientX,
			y: e.targetTouches[0].clientY,
		});
	}, []);

	const onTouchEnd = useCallback(() => {
		if (!(touchStart && touchEnd)) {
			return;
		}

		const dx = touchStart.x - touchEnd.x;
		const dy = touchStart.y - touchEnd.y;

		// If user is scrolling vertically, don't treat it as a swipe
		if (Math.abs(dx) <= Math.abs(dy)) {
			return;
		}

		const isLeftSwipe = dx > minSwipeDistance;
		const isRightSwipe = dx < -minSwipeDistance;

		if (isLeftSwipe && hasNext) {
			onNext();
		} else if (isRightSwipe && hasPrevious) {
			onPrevious();
		}
	}, [touchStart, touchEnd, hasNext, hasPrevious, onNext, onPrevious]);

	const handleShare = useCallback(async () => {
		if (!shareData) {
			return;
		}

		try {
			if (navigator.share) {
				await navigator.share(shareData);
			} else {
				await navigator.clipboard.writeText(shareData.url);
				toast.success("Link copied successfully!");
			}
		} catch (_err) {
			// User cancelled sharing
		}
	}, [shareData]);

	if (!competition) {
		return null;
	}

	return (
		<Dialog onOpenChange={(open) => !open && onClose()} open={isOpen}>
			<DialogPortal>
				<DialogOverlay className="bg-transparent md:bg-black/80" />

				<DialogPrimitive.Content
					className={
						"fixed top-1/2 left-1/2 z-50 w-[92vw] max-w-[340px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-xl border bg-background p-0 shadow-lg md:w-full md:max-w-2xl"
					}
					ref={contentRef}
				>
					<DialogTitle className="sr-only">{competition.title}</DialogTitle>

					{/* Top bar with close button and view toggle */}
					<div className="flex items-center justify-end border-b bg-background/95 p-2 backdrop-blur-sm">
						<div className="flex items-center gap-2">
							{onDetailViewModeChange && (
								<DetailViewToggle
									detailViewMode={detailViewMode}
									onDetailViewModeChange={onDetailViewModeChange}
								/>
							)}
							<DialogPrimitive.Close className="inline-flex h-8 w-8 items-center justify-center rounded-full hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring">
								<X className="h-4 w-4" />
								<span className="sr-only">Close</span>
							</DialogPrimitive.Close>
						</div>
					</div>

					{/* Top-left: left/right arrows to switch competition */}
					{hasPrevious || hasNext ? (
						<div className="absolute top-2 left-2 z-10 flex max-w-[calc(100%-6rem)] items-center gap-1">
							{hasPrevious && (
								<Tooltip>
									<TooltipTrigger asChild>
										<Button
											aria-label="Previous competition"
											className="h-8 w-8 shrink-0 rounded-lg p-0"
											onClick={onPrevious}
											size="icon"
											variant="secondary"
										>
											<ChevronLeft className="h-3.5 w-3.5" />
										</Button>
									</TooltipTrigger>
									<TooltipContent>Previous</TooltipContent>
								</Tooltip>
							)}
							{hasNext && (
								<Tooltip>
									<TooltipTrigger asChild>
										<Button
											aria-label="Next competition"
											className="h-8 w-8 shrink-0 rounded-lg p-0"
											onClick={onNext}
											size="icon"
											variant="secondary"
										>
											<ChevronRight className="h-3.5 w-3.5" />
										</Button>
									</TooltipTrigger>
									<TooltipContent>Next</TooltipContent>
								</Tooltip>
							)}
						</div>
					) : null}

					{/* Top-right: Share button */}
					<div className="absolute top-14 right-2 z-10 md:top-2">
						<Tooltip>
							<TooltipTrigger asChild>
								<Button
									aria-label="Share"
									className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
									onClick={handleShare}
									size="icon"
									variant="ghost"
								>
									<Share2 className="h-4 w-4" />
								</Button>
							</TooltipTrigger>
							<TooltipContent>Share</TooltipContent>
						</Tooltip>
					</div>

					{/* Scroll container (fix iOS/Android scroll) */}
					<div className="max-h-[90vh] overflow-y-auto overscroll-contain [webkit-overflow-scrolling:touch] md:max-h-[80vh]">
						{/* Poster Image - 3:4 on mobile, 16:9 on desktop */}
						<div
							className="relative aspect-[3/4] w-full overflow-hidden bg-secondary md:aspect-[16/9]"
							onTouchEnd={onTouchEnd}
							onTouchMove={onTouchMove}
							onTouchStart={onTouchStart}
						>
							{competition.imageUrl ? (
								<Image
									alt={competition.title}
									className="object-cover"
									fill
									priority
									sizes="(max-width: 640px) 92vw, (max-width: 768px) 340px, 48rem"
									src={competition.imageUrl}
								/>
							) : (
								<div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5">
									<span className="font-bold text-3xl text-primary/30 md:text-6xl">
										{competition.title.charAt(0)}
									</span>
								</div>
							)}

							{/* Swipe Indicator for Mobile */}
							<div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-black/40 px-2 py-1 text-[10px] text-white/70 md:hidden">
								<ChevronLeft className="h-3 w-3" />
								<span>Swipe to navigate</span>
								<ChevronRight className="h-3 w-3" />
							</div>
						</div>

						{/* Content */}
						<div className="space-y-3 p-3 md:space-y-4 md:p-5">
							{/* Header */}
							<div className="space-y-1">
								<div className="flex items-start justify-between gap-2">
									<h2 className="font-semibold text-foreground text-sm leading-tight md:text-lg">
										{competition.title}
									</h2>
								</div>
								<p className="text-[11px] text-muted-foreground md:text-sm">
									{competition.organizer}
								</p>
							</div>

							{/* Tags */}
							<div className="flex flex-wrap gap-1 md:gap-1.5">
								<span className="rounded-full bg-primary/10 px-2 py-0.5 font-medium text-[10px] text-primary md:text-xs">
									{competition.category}
								</span>
								{competition.level.slice(0, 2).map((l) => (
									<span
										className="rounded-full bg-secondary px-2 py-0.5 text-[10px] text-muted-foreground md:text-xs"
										key={l}
									>
										{levelLabels[l]}
									</span>
								))}
								<span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] text-muted-foreground capitalize md:text-xs">
									{competition.format}
								</span>
							</div>

							{/* Details */}
							<div className="grid gap-1.5 text-[11px] md:text-sm">
								<div className="flex items-center gap-1.5 text-muted-foreground">
									<Calendar className="h-3 w-3 md:h-4 md:w-4" />
									<span>
										{competition.startDate
											? `${format(competition.startDate, "d MMM")} - ${format(competition.deadline, "d MMM yyyy")}`
											: `Deadline: ${format(competition.deadline, "d MMM yyyy")}`}
									</span>
								</div>
								<div className="flex items-center gap-1.5 text-muted-foreground">
									<Users className="h-3 w-3 md:h-4 md:w-4" />
									<span className="capitalize">
										{competition.participationType === "team"
											? "Team"
											: "Individual"}
									</span>
								</div>
								{competition.location && (
									<div className="flex items-center gap-1.5 text-muted-foreground">
										<MapPin className="h-3 w-3 md:h-4 md:w-4" />
										<span>{competition.location}</span>
									</div>
								)}
							</div>

							{/* Prize */}
							{competition.prize && (
								<div className="rounded-lg bg-primary/5 p-2.5 md:p-3">
									<p className="text-[10px] text-muted-foreground md:text-xs">
										Prize
									</p>
									<p className="font-medium text-[11px] text-foreground md:text-sm">
										{competition.prize}
									</p>
								</div>
							)}

							{/* Description */}
							<div>
								<p className="mb-1 font-medium text-[10px] text-muted-foreground md:text-xs">
									Description
								</p>
								<p className="whitespace-pre-wrap text-[11px] text-muted-foreground leading-relaxed md:text-sm">
									{competition.description}
								</p>
							</div>

							{/* CTA Button */}
							<a
								className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-primary px-3 py-2 font-medium text-[11px] text-primary-foreground transition-colors hover:bg-primary/90 md:py-2.5 md:text-sm"
								href={competition.registrationUrl}
								rel="noopener noreferrer"
								target="_blank"
							>
								Register Now
								<ExternalLink className="h-3 w-3 md:h-4 md:w-4" />
							</a>

							{/* Report & Claim */}
							<div className="flex gap-2 pt-1">
								<Button
									className="flex-1 gap-1.5 text-[11px] text-muted-foreground md:text-sm"
									onClick={() => setShowReport(true)}
									size="sm"
									variant="outline"
								>
									<Flag className="h-3 w-3 md:h-3.5 md:w-3.5" />
									Report
								</Button>
								<Button
									className="flex-1 gap-1.5 text-[11px] text-muted-foreground md:text-sm"
									onClick={() => setShowClaim(true)}
									size="sm"
									variant="outline"
								>
									<BadgeCheck className="h-3 w-3 md:h-3.5 md:w-3.5" />
									Claim
								</Button>
							</div>
						</div>
					</div>
				</DialogPrimitive.Content>
			</DialogPortal>
			<ReportCompetitionDialog
				competition={competition}
				isOpen={showReport}
				onClose={() => setShowReport(false)}
			/>
			<ClaimCompetitionDialog
				competition={competition}
				isOpen={showClaim}
				onClose={() => setShowClaim(false)}
			/>
		</Dialog>
	);
}
