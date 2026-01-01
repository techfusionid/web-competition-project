import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Calendar, ExternalLink, Share2, Users } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import type { Competition } from "@/types/competition";
import { SharePopup } from "../SharePopup";

interface PosterViewProps {
	competition: Competition;
	isBookmarked: boolean;
	onToggleBookmark: (id: string) => void;
	onClick: () => void;
	onLongPress?: () => void;
}

const LONG_PRESS_DURATION = 500;

export function PosterView({
	competition,
	isBookmarked,
	onToggleBookmark,
	onClick,
	onLongPress,
}: PosterViewProps) {
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
			return `${format(competition.startDate, "d MMM", { locale: id })} - ${format(competition.deadline, "d MMM yyyy", { locale: id })}`;
		}
		return format(competition.deadline, "d MMM yyyy", { locale: id });
	};

	const shareUrl = `${window.location.origin}/competition/${competition.id}`;

	return (
		<>
			<div
				className="group relative cursor-pointer overflow-hidden rounded-lg border border-border bg-card select-none"
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
							className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
							src={competition.imageUrl}
						/>
					) : (
						<div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5">
							<span className="text-4xl font-bold text-primary/30">
								{competition.title.charAt(0)}
							</span>
						</div>
					)}

					{/* Hover Overlay */}
					<div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-foreground/95 via-foreground/60 to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
						<div className="space-y-2 text-background">
							<div className="flex flex-wrap gap-1.5">
								<span className="rounded bg-background/20 px-2 py-0.5 text-xs backdrop-blur-sm">
									{competition.category}
								</span>
								<span className="rounded bg-background/20 px-2 py-0.5 text-xs backdrop-blur-sm capitalize">
									{competition.format}
								</span>
							</div>
							<div className="flex items-center gap-3 text-xs text-background/80">
								<div className="flex items-center gap-1">
									<Calendar className="h-3.5 w-3.5" />
									<span>{formatDateRange()}</span>
								</div>
								<div className="flex items-center gap-1">
									<Users className="h-3.5 w-3.5" />
									<span className="capitalize">
										{competition.participationType === "team"
											? "Tim"
											: "Individual"}
									</span>
								</div>
							</div>

							{/* Action Buttons */}
							<div className="flex gap-2 mt-2">
								{competition.registrationUrl && (
									<Button
										className="flex-1 gap-1.5 text-xs"
										onClick={(e) => {
											e.stopPropagation();
											window.open(competition.registrationUrl, "_blank");
										}}
										size="sm"
									>
										<ExternalLink className="h-3.5 w-3.5" />
										Daftar
									</Button>
								)}
								<Button
									className="gap-1.5 text-xs"
									onClick={(e) => {
										e.stopPropagation();
										setShowShare(true);
									}}
									size="sm"
									variant="secondary"
								>
									<Share2 className="h-3.5 w-3.5" />
								</Button>
							</div>
						</div>
					</div>
				</div>

				{/* Content Section - Minimal */}
				<div className="p-3">
					<h3 className="truncate text-sm font-medium text-foreground transition-colors group-hover:text-primary">
						{competition.title}
					</h3>
					<p className="truncate text-xs text-muted-foreground">
						{competition.organizer}
					</p>
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
