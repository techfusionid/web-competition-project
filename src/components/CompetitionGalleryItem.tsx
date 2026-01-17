import { Trophy } from "lucide-react";
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
				"group relative cursor-pointer overflow-hidden rounded-md border bg-card transition-all hover:shadow-md",
				isSelected ? "border-primary ring-2 ring-primary/20" : "border-border"
			)}
			onClick={onClick}
		>
			{/* Image */}
			<div className="relative aspect-[3/4] w-full overflow-hidden bg-secondary">
				{competition.imageUrl ? (
					<img
						alt={competition.title}
						className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
						src={competition.imageUrl}
					/>
				) : (
					<div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5">
						<Trophy className="h-5 w-5 text-primary/30" />
					</div>
				)}

				{/* Status Badge */}
				<div className="absolute left-1 top-1">
					<StatusBadge status={competition.status} />
				</div>
			</div>

			{/* Minimal Content - just title */}
			<div className="p-1.5">
				<h3
					className={cn(
						"line-clamp-2 text-[10px] font-medium leading-tight transition-colors",
						isSelected
							? "text-primary"
							: "text-foreground group-hover:text-primary"
					)}
				>
					{competition.title}
				</h3>
			</div>
		</div>
	);
}
