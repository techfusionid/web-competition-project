import { format } from "date-fns";
import { Calendar, Share2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import type { Competition } from "@/types/competition";
import { SharePopup } from "./SharePopup";

const formatLabels: Record<string, string> = {
	online: "Online",
	offline: "Offline",
	hybrid: "Hybrid",
};

interface CompetitionCardProps {
	competition: Competition;
	onClick?: () => void;
	onOrganizerClick?: (organizer: string) => void;
}

export function CompetitionCardSkeleton() {
	return (
		<div className="relative flex flex-col rounded-lg border border-border bg-secondary/15 ring-6 ring-background ring-inset md:p-4">
			<div className="flex items-start justify-between gap-2">
				<div className="min-w-0 flex-1 space-y-2">
					<Skeleton className="h-5 w-3/4" />
					<Skeleton className="h-3.5 w-1/2" />
				</div>
			</div>
			<div className="mt-2 space-y-2 md:mt-3">
				<Skeleton className="h-3.5 w-full" />
				<Skeleton className="h-3.5 w-4/5" />
			</div>
		</div>
	);
}

export function CompetitionCard({
	competition,
	onOrganizerClick,
	onClick,
}: CompetitionCardProps) {
	const [showShare, setShowShare] = useState(false);

	const shareUrl =
		typeof window !== "undefined"
			? `${process.env.NEXT_PUBLIC_SITE_URL || window.location.origin}/competition/${competition.id}`
			: "";

	return (
		<>
			<div
				className="group relative flex cursor-pointer flex-col rounded-lg border border-border bg-secondary/15 ring-6 ring-background ring-inset transition-all hover:border-primary/50 md:p-4"
				onClick={onClick}
			>
				{/* Header - Title, Organizer, Status (default), Share */}
				<div className="flex items-start justify-between">
					<div className="min-w-0 flex-1">
						<h3 className="truncate font-semibold text-base text-foreground tracking-wide transition-colors group-hover:text-primary md:text-lg">
							{competition.title}
						</h3>
						<button
							className="w-full truncate text-left text-muted-foreground text-xs hover:text-primary md:text-sm"
							onClick={(e) => {
								e.stopPropagation();
								onOrganizerClick?.(competition.organizer);
							}}
						>
							{competition.organizer}
						</button>
					</div>
					<div className="flex shrink-0 items-center gap-1">
						<Button
							className="h-7 w-7 shrink-0 opacity-0 transition-opacity group-hover:opacity-100 md:h-8 md:w-8"
							onClick={(e) => {
								e.stopPropagation();
								setShowShare(true);
							}}
							size="icon"
							variant="ghost"
						>
							<Share2 className="h-3.5 w-3.5 md:h-4 md:w-4" />
						</Button>
					</div>
				</div>

				{/* Content Area */}
				<div className="relative mt-2 min-h-[64px] md:mt-3 md:min-h-[72px]">
					{/* Default: Description. Hidden on hover (desktop); on touch (hover:none) hidden so meta shows below */}
					<div className="absolute inset-0 opacity-100 transition-opacity duration-200 group-hover:opacity-0 [@media(hover:none)]:opacity-0">
						<p className="line-clamp-2 text-muted-foreground text-xs leading-relaxed md:text-sm">
							{competition.description}
						</p>
					</div>

					{/* Hover: deadline, category, format, status. On touch (hover:none) always visible */}
					<div className="absolute inset-0 flex flex-col justify-center gap-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100 [@media(hover:none)]:opacity-100">
						<div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] text-foreground md:text-xs">
							<div className="flex items-center gap-1">
								<Calendar className="h-3 w-3 md:h-3.5 md:w-3.5" />
								<span className="font-medium">
									{format(competition.deadline, "d MMM yyyy")}
								</span>
							</div>
						</div>
						<div className="flex flex-wrap gap-1">
							<span className="rounded bg-secondary px-2 py-0.5 text-[10px] text-secondary-foreground md:text-xs">
								{competition.category}
							</span>
							<span className="rounded bg-secondary px-2 py-0.5 text-[10px] text-secondary-foreground capitalize md:text-xs">
								{formatLabels[competition.format]}
							</span>
						</div>
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
