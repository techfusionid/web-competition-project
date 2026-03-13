import { format } from "date-fns";
import Image from "next/image";
import {
	BadgeCheck,
	Bookmark,
	Calendar,
	ChevronDown,
	Flag,
} from "lucide-react";
import { useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import type { Competition } from "@/types/competition";

interface CompetitionCardPosterProps {
	competition: Competition;
	isBookmarked: boolean;
	onToggleBookmark: (id: string) => void;
	onClick: () => void;
	onLongPress?: () => void;
	/** Dipanggil ketika penyelenggara memilih "Klaim" dari kartu */
	onClaim?: (competition: Competition) => void;
	/** Dipanggil ketika user memilih "Laporkan" dari kartu */
	onReport?: (competition: Competition) => void;
}

const LONG_PRESS_DURATION = 500;

export function CompetitionCardPoster({
	competition,
	isBookmarked,
	onToggleBookmark,
	onClick,
	onLongPress,
	onClaim,
	onReport,
}: CompetitionCardPosterProps) {
	const longPressTimer = useRef<NodeJS.Timeout | null>(null);
	const isLongPress = useRef(false);

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
				{/* Poster Image */}
				<div className="relative aspect-[3/4] w-full overflow-hidden bg-secondary">
					{competition.imageUrl ? (
						<Image
							alt={competition.title}
							className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
							src={competition.imageUrl}
							fill
							sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
							loading="lazy"
						/>
					) : (
						<div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5">
							<span className="text-5xl font-bold text-primary/30">
								{competition.title.charAt(0)}
							</span>
						</div>
					)}

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
							className={cn("h-4 w-4", isBookmarked && "fill-current")}
						/>
					</Button>

					{/* Hover Overlay - deadline, category, format, status (no level, no participant type). On touch always visible */}
					<div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 opacity-0 md:group-hover:opacity-100 transition-all duration-300 [@media(hover:none)]:opacity-100">
						<div className="space-y-3 text-white transform translate-y-4 md:group-hover:translate-y-0 transition-transform duration-300 [@media(hover:none)]:translate-y-0">
							{/* Tags: category, format */}
							<div className="flex flex-wrap gap-1.5">
								<span className="rounded-full bg-white/20 px-3 py-1 text-xs backdrop-blur-sm font-medium">
									{competition.category}
								</span>
								<span className="rounded-full bg-white/20 px-3 py-1 text-xs backdrop-blur-sm capitalize font-medium">
									{competition.format}
								</span>
							</div>

							{/* Deadline + status */}
							<div className="flex items-center gap-3 text-xs text-white/90 flex-wrap">
								<div className="flex items-center gap-1.5">
									<Calendar className="h-4 w-4" />
									<span className="font-medium">{formatDateRange()}</span>
								</div>
							</div>

							{/* Klaim/Laporkan */}
							<div className="flex justify-end items-center gap-1.5 pt-2">
								{(onClaim || onReport) && (
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<Button
												className="gap-1.5 text-xs bg-white/20 hover:bg-white/30 border-0 text-white"
												onClick={(e) => e.stopPropagation()}
												size="sm"
											>
												Klaim / Laporkan
												<ChevronDown className="h-3 w-3" />
											</Button>
										</DropdownMenuTrigger>
										<DropdownMenuContent
											align="end"
											onClick={(e) => e.stopPropagation()}
										>
											{onClaim && (
												<DropdownMenuItem
													onClick={() => onClaim(competition)}
													className="gap-2"
												>
													<BadgeCheck className="h-3.5 w-3.5" />
													Klaim sebagai Penyelenggara
												</DropdownMenuItem>
											)}
											{onReport && (
												<DropdownMenuItem
													onClick={() => onReport(competition)}
													className="gap-2"
												>
													<Flag className="h-3.5 w-3.5" />
													Laporkan
												</DropdownMenuItem>
											)}
										</DropdownMenuContent>
									</DropdownMenu>
								)}
							</div>
						</div>
					</div>
				</div>

				{/* Content Section - Default: title, organizer, description, status */}
				<div className="p-3 space-y-1.5">
					<div className="flex items-start justify-between gap-2">
						<div className="min-w-0 flex-1">
							<h3 className="truncate text-base md:text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
								{competition.title}
							</h3>
							<p className="truncate text-xs text-muted-foreground">
								{competition.organizer}
							</p>
						</div>
						<div className="shrink-0"></div>
					</div>
					<div className="flex items-center gap-1.5 text-xs text-muted-foreground">
						<Calendar className="h-3.5 w-3.5" />
						<span className="font-medium">{formatDateRange()}</span>
					</div>
				</div>
			</div>
		</>
	);
}
