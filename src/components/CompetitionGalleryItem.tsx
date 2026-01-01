import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Calendar, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Competition } from "@/types/competition";
import { StatusBadge } from "./StatusBadge";

interface CompetitionGalleryItemProps {
	competition: Competition;
	isSelected: boolean;
	onClick: () => void;
}

export function CompetitionGalleryItem({
	competition,
	isSelected,
	onClick,
}: CompetitionGalleryItemProps) {
	return (
		<div
			className={cn(
				"group relative cursor-pointer overflow-hidden rounded-lg border bg-card transition-all hover:shadow-md",
				isSelected ? "border-primary ring-2 ring-primary/20" : "border-border"
			)}
			onClick={onClick}
		>
			{/* Image */}
			<div className="relative aspect-[4/3] w-full overflow-hidden bg-secondary">
				{competition.imageUrl ? (
					<img
						alt={competition.title}
						className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
						src={competition.imageUrl}
					/>
				) : (
					<div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5">
						<Trophy className="h-8 w-8 text-primary/30" />
					</div>
				)}

				{/* Status Badge */}
				<div className="absolute left-2 top-2">
					<StatusBadge status={competition.status} />
				</div>
			</div>

			{/* Content */}
			<div className="p-2.5">
				<h3
					className={cn(
						"truncate text-xs font-medium transition-colors",
						isSelected
							? "text-primary"
							: "text-foreground group-hover:text-primary"
					)}
				>
					{competition.title}
				</h3>
				<p className="truncate text-[10px] text-muted-foreground mt-0.5">
					{competition.organizer}
				</p>
				<div className="flex items-center gap-1 mt-1.5 text-[10px] text-muted-foreground">
					<Calendar className="h-3 w-3" />
					<span>{format(competition.deadline, "d MMM", { locale: id })}</span>
				</div>
			</div>
		</div>
	);
}
