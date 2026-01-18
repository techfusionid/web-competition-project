import { format } from "date-fns";
import { Calendar, Share2, Users } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Competition } from "@/types/competition";
import { SharePopup } from "./SharePopup";
import { StatusBadge } from "./StatusBadge";

interface CompetitionCardProps {
	competition: Competition;
	onClick?: () => void;
	onOrganizerClick?: (organizer: string) => void;
}

export function CompetitionCard({
	competition,
	onOrganizerClick,
	onClick,
}: CompetitionCardProps) {
	const [showShare, setShowShare] = useState(false);

	const levelLabels: Record<string, string> = {
		sma: "High School",
		mahasiswa: "University",
		umum: "General",
		profesional: "Professional",
	};

	const formatLabels: Record<string, string> = {
		online: "Online",
		offline: "Offline",
		hybrid: "Hybrid",
	};

	const shareUrl = typeof window !== "undefined"
		? `${window.location.origin}/competition/${competition.id}`
		: "";

	return (
		<>
			<div
				className="group relative flex cursor-pointer flex-col rounded-lg border border-border bg-card p-3 md:p-4 transition-all hover:shadow-md hover:border-primary/50"
				onClick={onClick}
			>
				{/* Header - Title and Organizer with Share */}
				<div className="flex items-start justify-between gap-2">
					<div className="min-w-0 flex-1">
						<h3 className="truncate text-sm md:text-base font-semibold text-foreground group-hover:text-primary transition-colors">
							{competition.title}
						</h3>
						<button
							className="truncate text-xs md:text-sm text-muted-foreground hover:text-primary hover:underline text-left w-full"
							onClick={(e) => {
								e.stopPropagation();
								onOrganizerClick?.(competition.organizer);
							}}
						>
							{competition.organizer}
						</button>
					</div>
					<Button
						className="h-7 w-7 md:h-8 md:w-8 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
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

				{/* Content Area - Fixed height for smooth transition */}
				<div className="mt-2 md:mt-3 relative min-h-[60px] md:min-h-[70px]">
					{/* Description - Visible by default, hidden on hover */}
					<div className="absolute inset-0 opacity-100 group-hover:opacity-0 transition-opacity duration-200">
						<p className="text-[10px] md:text-xs text-muted-foreground leading-relaxed line-clamp-2">
							{competition.description}
						</p>
					</div>

					{/* Hover Info - Hidden by default, shown on hover */}
					<div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-center gap-2">
						{/* Deadline & Level */}
						<div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] md:text-xs text-foreground">
							<div className="flex items-center gap-1">
								<Calendar className="h-3 w-3 md:h-3.5 md:w-3.5" />
								<span className="font-medium">{format(competition.deadline, "d MMM yyyy")}</span>
							</div>
							{competition.level.slice(0, 1).map((lvl) => (
								<span
									className="rounded bg-secondary px-2 py-0.5 text-[10px] md:text-xs text-secondary-foreground"
									key={lvl}
								>
									{levelLabels[lvl]}
								</span>
							))}
						</div>

						{/* Category & Format Tags */}
						<div className="flex flex-wrap gap-1">
							<span className="rounded bg-secondary px-2 py-0.5 text-[10px] md:text-xs text-secondary-foreground">
								{competition.category}
							</span>
							<span className="rounded bg-secondary px-2 py-0.5 text-[10px] md:text-xs text-secondary-foreground capitalize">
								{formatLabels[competition.format]}
							</span>
						</div>

						{/* Participation Type & Status */}
						<div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] md:text-xs text-foreground">
							<div className="flex items-center gap-1">
								<Users className="h-3 w-3 md:h-3.5 md:w-3.5" />
								<span className="capitalize font-medium">
									{competition.participationType === "team" ? "Team" : "Individual"}
								</span>
							</div>
							<StatusBadge status={competition.status} />
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
