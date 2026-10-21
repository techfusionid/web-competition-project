import { format } from "date-fns";
import { BadgeCheck, Calendar, ChevronDown, Flag } from "lucide-react";
import Image from "next/image";
import { useCallback, useMemo, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import type { Competition } from "@/types/competition";

interface CompetitionCardPosterProps {
	competition: Competition;
	onClick: () => void;
	onLongPress?: () => void;
	/** Dipanggil ketika penyelenggara memilih "Klaim" dari kartu */
	onClaim?: (competition: Competition) => void;
	/** Dipanggil ketika user memilih "Laporkan" dari kartu */
	onReport?: (competition: Competition) => void;
}

export function CompetitionCardPosterSkeleton() {
	return (
		<div className="relative overflow-hidden rounded-xl border border-border bg-card">
			<Skeleton className="aspect-[3/4] w-full rounded-none" />
			<div className="space-y-1 p-2 sm:space-y-2 sm:p-3">
				<Skeleton className="h-4 w-3/4 sm:h-5" />
				<Skeleton className="h-3 w-1/2 sm:h-3.5" />
				<Skeleton className="h-3 w-2/3 sm:h-3.5" />
			</div>
		</div>
	);
}

const LONG_PRESS_DURATION = 500;

export function CompetitionCardPoster({
	competition,
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

	const formatDateRange = useMemo(() => {
		if (competition.startDate) {
			return `${format(competition.startDate, "d MMM")} - ${format(competition.deadline, "d MMM yyyy")}`;
		}
		return format(competition.deadline, "d MMM yyyy");
	}, [competition.startDate, competition.deadline]);

	return (
		<div
			className="group relative cursor-pointer select-none overflow-hidden rounded-lg border border-border bg-card transition-colors transition-shadow hover:border-primary/50 hover:shadow-lg sm:rounded-xl"
			onClick={handleClick}
			onContextMenu={(e) => e.preventDefault()}
			onKeyDown={(e) => {
				if (e.key === "Enter" || e.key === " ") {
					e.preventDefault();
					handleClick();
				}
			}}
			onPointerDown={handlePointerDown}
			onPointerLeave={handlePointerUp}
			onPointerUp={handlePointerUp}
			role="button"
			tabIndex={0}
		>
			{/* Poster Image */}
			<div className="relative w-full overflow-hidden bg-secondary aspect-[3/4] sm:aspect-[3/4]">
				{competition.imageUrl ? (
					<Image
						alt={competition.title}
						className="object-cover transition-transform duration-500 group-hover:scale-105"
						fill
						loading="lazy"
						sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
						src={competition.imageUrl}
					/>
				) : (
					<div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5">
						<span className="font-bold text-4xl text-primary/30 sm:text-5xl">
							{competition.title.charAt(0)}
						</span>
					</div>
				)}

				{/* Hover Overlay - deadline, category, format, status (no level, no participant type). On touch always visible */}
				<div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/50 to-transparent p-2 opacity-0 transition-opacity duration-300 sm:p-3 md:p-4 md:group-hover:opacity-100 [@media(hover:none)]:opacity-100">
					<div className="translate-y-4 transform space-y-1 text-white transition-transform duration-300 sm:space-y-1.5 md:space-y-3 md:group-hover:translate-y-0 [@media(hover:none)]:translate-y-0">
						{/* Tags: category, format */}
						<div className="flex flex-wrap gap-1">
							<span className="max-w-full truncate rounded-full bg-white/20 px-1.5 py-0.5 font-medium text-[10px] backdrop-blur-sm sm:px-2">
								{competition.category}
							</span>
							<span className="rounded-full bg-white/20 px-1.5 py-0.5 font-medium text-[10px] capitalize backdrop-blur-sm sm:px-2">
								{competition.format}
							</span>
						</div>

						{/* Deadline + status */}
						<div className="flex flex-wrap items-center gap-1.5 text-white/90 text-[10px] leading-tight">
							<Calendar className="h-3 w-3 shrink-0" />
							<span className="truncate font-medium">{formatDateRange}</span>
						</div>

						{/* Klaim/Laporkan */}
						<div className="flex items-center justify-end gap-1.5 pt-1 sm:pt-2">
							{(onClaim || onReport) && (
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Button
											className="gap-1.5 border-0 bg-white/20 text-white text-[10px] hover:bg-white/30 sm:text-xs"
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
												className="gap-2"
												onClick={() => onClaim(competition)}
											>
												<BadgeCheck className="h-3.5 w-3.5" />
												Klaim sebagai Penyelenggara
											</DropdownMenuItem>
										)}
										{onReport && (
											<DropdownMenuItem
												className="gap-2"
												onClick={() => onReport(competition)}
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
			<div className="space-y-0.5 p-2 text-left sm:space-y-1 sm:p-3">
				<div className="flex items-start justify-between gap-2">
					<div className="min-w-0 flex-1">
						<h3
							className="line-clamp-2 text-left font-semibold text-foreground text-xs leading-tight transition-colors group-hover:text-primary sm:truncate sm:text-base md:text-lg"
							title={competition.title}
						>
							{competition.title}
						</h3>
						<button
							className="mt-0.5 block w-full truncate text-left text-[10px] text-muted-foreground leading-normal hover:text-primary sm:text-xs"
							onClick={(e) => {
								e.preventDefault();
								e.stopPropagation();
								window.open(
									`/organizer/${encodeURIComponent(competition.organizer)}`,
									"_self"
								);
							}}
							title={competition.organizer}
						>
							{competition.organizer}
						</button>
					</div>
				</div>
				<div className="mt-1 flex items-center gap-1 text-left text-[10px] text-muted-foreground sm:gap-1.5 sm:text-xs">
					<Calendar className="h-3 w-3 shrink-0" />
					<span className="font-medium">{formatDateRange}</span>
				</div>
			</div>
		</div>
	);
}
