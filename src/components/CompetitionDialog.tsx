import * as DialogPrimitive from "@radix-ui/react-dialog";
import { format } from "date-fns";
import {
	BadgeCheck,
	Calendar,
	ChevronDown,
	ChevronLeft,
	ChevronRight,
	ChevronUp,
	ExternalLink,
	Flag,
	MapPin,
	Share2,
	Users,
	X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogOverlay,
	DialogPortal,
	DialogTitle,
} from "@/components/ui/dialog";
import { type Competition, LEVELS } from "@/types/competition";
import { ClaimCompetitionDialog } from "./ClaimCompetitionDialog";
import { ReportCompetitionDialog } from "./ReportCompetitionDialog";

interface CompetitionDialogProps {
	competition: Competition | null;
	isOpen: boolean;
	onClose: () => void;
	onPrevious: () => void;
	onNext: () => void;
	hasPrevious: boolean;
	hasNext: boolean;
}

export function CompetitionDialog({
	competition,
	isOpen,
	onClose,
	onPrevious,
	onNext,
	hasPrevious,
	hasNext,
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

	// Keyboard navigation (arrows: up/previous, down/next; left/right for swipe consistency)
	useEffect(() => {
		if (!isOpen) return;

		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "ArrowUp" && hasPrevious) {
				onPrevious();
			} else if (e.key === "ArrowDown" && hasNext) {
				onNext();
			} else if (e.key === "ArrowLeft" && hasPrevious) {
				onPrevious();
			} else if (e.key === "ArrowRight" && hasNext) {
				onNext();
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [isOpen, hasPrevious, hasNext, onPrevious, onNext]);

	const onTouchStart = (e: React.TouchEvent) => {
		setTouchEnd(null);
		setTouchStart({
			x: e.targetTouches[0].clientX,
			y: e.targetTouches[0].clientY,
		});
	};

	const onTouchMove = (e: React.TouchEvent) => {
		setTouchEnd({
			x: e.targetTouches[0].clientX,
			y: e.targetTouches[0].clientY,
		});
	};

	const onTouchEnd = () => {
		if (!touchStart || !touchEnd) return;

		const dx = touchStart.x - touchEnd.x;
		const dy = touchStart.y - touchEnd.y;

		// If user is scrolling vertically, don't treat it as a swipe
		if (Math.abs(dx) <= Math.abs(dy)) return;

		const isLeftSwipe = dx > minSwipeDistance;
		const isRightSwipe = dx < -minSwipeDistance;

		if (isLeftSwipe && hasNext) {
			onNext();
		} else if (isRightSwipe && hasPrevious) {
			onPrevious();
		}
	};

	const handleShare = async () => {
		if (!competition) return;

		const shareData = {
			title: competition.title,
			text: `View competition "${competition.title}" on Competitions!`,
			url: competition.registrationUrl,
		};

		try {
			if (navigator.share) {
				await navigator.share(shareData);
			} else {
				await navigator.clipboard.writeText(competition.registrationUrl);
				toast.success("Link copied successfully!");
			}
		} catch (err) {
			// User cancelled sharing
		}
	};

	if (!competition) return null;

	const levelLabels = LEVELS.reduce(
		(acc, l) => {
			acc[l.value] = l.label;
			return acc;
		},
		{} as Record<string, string>
	);

	return (
		<Dialog onOpenChange={(open) => !open && onClose()} open={isOpen}>
			<DialogPortal>
				<DialogOverlay className="bg-transparent md:bg-black/80" />

				<DialogPrimitive.Content
					className={
						"fixed left-1/2 top-1/2 z-50 w-[92vw] max-w-[340px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-xl border bg-background p-0 shadow-lg md:max-w-lg md:w-full"
					}
					ref={contentRef}
				>
					<DialogTitle className="sr-only">{competition.title}</DialogTitle>

					{/* Top-left: small up/down arrows to switch competition */}
					{hasPrevious || hasNext ? (
						<div className="absolute left-2 top-2 z-10 flex flex-row items-center gap-0.5">
							{hasPrevious && (
								<Button
									className="h-6 w-6 rounded-full bg-background/80 backdrop-blur-sm p-0 hover:bg-background focus:outline-none focus:ring-2 focus:ring-ring"
									onClick={onPrevious}
									size="icon"
									variant="ghost"
									aria-label="Previous competition"
								>
									<ChevronUp className="h-3.5 w-3.5" />
								</Button>
							)}
							{hasNext && (
								<Button
									className="h-6 w-6 rounded-full bg-background/80 backdrop-blur-sm p-0 hover:bg-background focus:outline-none focus:ring-2 focus:ring-ring"
									onClick={onNext}
									size="icon"
									variant="ghost"
									aria-label="Next competition"
								>
									<ChevronDown className="h-3.5 w-3.5" />
								</Button>
							)}
						</div>
					) : null}

					{/* Top-right: Share and Close side by side */}
					<div className="absolute right-2 top-2 z-10 flex items-center gap-1.5">
						<Button
							className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
							onClick={handleShare}
							size="icon"
							variant="ghost"
							aria-label="Share"
						>
							<Share2 className="h-4 w-4" />
						</Button>
						<DialogPrimitive.Close className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm hover:bg-background focus:outline-none focus:ring-2 focus:ring-ring">
							<X className="h-4 w-4" />
							<span className="sr-only">Close</span>
						</DialogPrimitive.Close>
					</div>

					{/* Scroll container (fix iOS/Android scroll) */}
					<div className="max-h-[90vh] overflow-y-auto overscroll-contain [webkit-overflow-scrolling:touch] md:max-h-[80vh]">
						{/* Poster Image - 3:4 on mobile, 16:9 on desktop */}
						<div
							className="relative aspect-[3/4] md:aspect-[16/9] w-full overflow-hidden bg-secondary"
							onTouchEnd={onTouchEnd}
							onTouchMove={onTouchMove}
							onTouchStart={onTouchStart}
						>
							{competition.imageUrl ? (
								<img
									alt={competition.title}
									className="h-full w-full object-cover"
									src={competition.imageUrl}
								/>
							) : (
								<div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5">
									<span className="text-3xl md:text-6xl font-bold text-primary/30">
										{competition.title.charAt(0)}
									</span>
								</div>
							)}

							{/* Swipe Indicator for Mobile */}
							<div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5 text-[10px] text-white/70 bg-black/40 px-2 py-1 rounded-full md:hidden">
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
									<h2 className="text-sm md:text-lg font-semibold text-foreground leading-tight">
										{competition.title}
									</h2>
									</div>
								<p className="text-[11px] md:text-sm text-muted-foreground">
									{competition.organizer}
								</p>
							</div>

							{/* Tags */}
							<div className="flex flex-wrap gap-1 md:gap-1.5">
								<span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] md:text-xs font-medium text-primary">
									{competition.category}
								</span>
								{competition.level.slice(0, 2).map((l) => (
									<span
										className="rounded-full bg-secondary px-2 py-0.5 text-[10px] md:text-xs text-muted-foreground"
										key={l}
									>
										{levelLabels[l]}
									</span>
								))}
								<span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] md:text-xs capitalize text-muted-foreground">
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
									<p className="text-[10px] md:text-xs text-muted-foreground">
										Prize
									</p>
									<p className="text-[11px] md:text-sm font-medium text-foreground">
										{competition.prize}
									</p>
								</div>
							)}

							{/* Description */}
							<div>
								<p className="text-[10px] md:text-xs font-medium text-muted-foreground mb-1">
									Description
								</p>
								<p className="text-[11px] md:text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
									{competition.description}
								</p>
							</div>

							{/* CTA Button */}
							<a
								className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-primary px-3 py-2 md:py-2.5 text-[11px] md:text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
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
									className="flex-1 gap-1.5 text-muted-foreground text-[11px] md:text-sm"
									onClick={() => setShowReport(true)}
									size="sm"
									variant="outline"
								>
									<Flag className="h-3 w-3 md:h-3.5 md:w-3.5" />
									Report
								</Button>
								<Button
									className="flex-1 gap-1.5 text-muted-foreground text-[11px] md:text-sm"
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
