import { format } from "date-fns";
import { Bookmark, Calendar, Share2, Users } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Competition } from "@/types/competition";
import { SharePopup } from "./SharePopup";
import { StatusBadge } from "./StatusBadge";

interface CompetitionCardPosterProps {
	competition: Competition;
	isBookmarked: boolean;
	onToggleBookmark: (id: string) => void;
	onClick: () => void;
	onLongPress?: () => void;
}

const LONG_PRESS_DURATION = 500;

export function CompetitionCardPoster({
	competition,
	isBookmarked,
	onToggleBookmark,
	onClick,
	onLongPress,
}: CompetitionCardPosterProps) {
	const longPressTimer = useRef<NodeJS.Timeout | null>(null);
	const isLongPress = useRef(false);
	const [showShare, setShowShare] = useState(false);

	const handlePointerDown = useCallback(() => {
		isLongPress.current = false;
		longPressTimer.current = setTimeout(() => {
			isLongPress.current = true;
			if (onLongPress) {
				onLongPress();
			} else {
				onClick();
			}
		}, LONG_PRESS_DURATION);
	}, [onLongPress, onClick]);

	const handlePointerUp = useCallback(() => {
		if (longPressTimer.current) {
			clearTimeout(longPressTimer.current);
			longPressTimer.current = null;
		}
	}, []);

	const handleClick = useCallback(() => {
		if (!isLongPress.current) {
			onClick();
		}
	}, [onClick]);

	const formatDateRange = () => {
		if (competition.startDate) {
			return `${format(competition.startDate, "d MMM")} - ${format(competition.deadline, "d MMM yyyy")}`;
		}
		return format(competition.deadline, "d MMM yyyy");
	};

	const shareUrl = `${window.location.origin}/competition/${competition.id}`;

	return (
		<>
			<div
				className="group relative cursor-pointer overflow-hidden rounded-xl border border-border bg-card select-none transition-all hover:shadow-lg hover:border-primary/50"
				onClick={handleClick}
				onContextMenu={(e) => e.preventDefault()}
				onPointerDown={handlePointerDown}
				onPointerLeave={handlePointerUp}
				onPointerUp={handlePointerUp}
			>
				{/* Poster Image - 3:4 aspect ratio */}
				<div className="relative aspect-[3/4] w-full overflow-hidden bg-secondary">
					{competition.imageUrl ? (
						<img
							alt={competition.title}
							className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
							src={competition.imageUrl}
						/>
					) : (
						<div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5">
							<span className="text-5xl font-bold text-primary/30">
								{competition.title.charAt(0)}
							</span>
						</div>
					)}

					{/* Status Badge - Top Right */}
					<div className="absolute top-2 right-2">
						<StatusBadge status={competition.status} />
					</div>

					{/* Bookmark Button - Top Left */}
					<Button
						className={cn(
							"h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background",
							isBookmarked && "text-foreground"
						)}
						onClick={(e) => {
							e.stopPropagation();
							onToggleBookmark(competition.id);
						}}
						size="icon"
						variant="ghost"
					>
						<Bookmark
							className={cn(
								"h-4 w-4",
								isBookmarked && "fill-current"
							)}
						/>
					</Button>

					{/* Hover Overlay - Info on hover (desktop) */}
					<div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 opacity-0 md:group-hover:opacity-100 transition-all duration-300">
						<div className="space-y-3 text-white transform translate-y-4 md:group-hover:translate-y-0 transition-transform duration-300">
							{/* Tags */}
							<div className="flex flex-wrap gap-1.5">
								<span className="rounded-full bg-white/20 px-3 py-1 text-xs backdrop-blur-sm font-medium">
									{competition.category}
								</span>
								<span className="rounded-full bg-white/20 px-3 py-1 text-xs backdrop-blur-sm capitalize font-medium">
									{competition.format}
								</span>
							</div>

							{/* Info */}
							<div className="flex items-center gap-4 text-xs text-white/90">
								<div className="flex items-center gap-1.5">
									<Calendar className="h-4 w-4" />
									<span className="font-medium">{formatDateRange()}</span>
								</div>
								<div className="flex items-center gap-1.5">
									<Users className="h-4 w-4" />
									<span className="capitalize font-medium">
										{competition.participationType === "team" ? "Team" : "Individual"}
									</span>
								</div>
							</div>

							{/* Share Button */}
							<div className="flex justify-end pt-2">
								<Button
									className="gap-1.5 text-xs bg-white/20 hover:bg-white/30 border-0 text-white"
									onClick={(e) => {
										e.stopPropagation();
										setShowShare(true);
									}}
									size="sm"
								>
									<Share2 className="h-3.5 w-3.5" />
									Share
								</Button>
							</div>
						</div>
					</div>
				</div>

				{/* Content Section - Clean and minimal */}
				<div className="p-3 space-y-1">
					<div className="flex items-start justify-between gap-2">
						<div className="min-w-0 flex-1">
							<h3 className="truncate text-sm font-semibold text-foreground transition-colors group-hover:text-primary">
								{competition.title}
							</h3>
							<p className="truncate text-xs text-muted-foreground">
								{competition.organizer}
							</p>
						</div>
					</div>

					{/* Deadline indicator - Always visible for quick reference */}
					<div className="flex items-center gap-1.5 text-[10px] text-muted-foreground pt-1">
						<Calendar className="h-3 w-3" />
						<span>{format(competition.deadline, "d MMM yyyy")}</span>
					</div>
				</div>
			</div>

			<SharePopup
				isOpen={showShare}
				onClose={() => setShowShare(false)}
				title={competition.title}
				url={shareUrl}
			/>
		</>
	);
}
