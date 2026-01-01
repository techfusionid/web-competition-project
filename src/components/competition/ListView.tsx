import { format } from "date-fns";
import { id } from "date-fns/locale";
import { ArrowUpRight, Bookmark, Calendar, MapPin, Users } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Competition } from "@/types/competition";
import { StatusBadge } from "../StatusBadge";

interface ListViewProps {
	competition: Competition;
	isBookmarked: boolean;
	onToggleBookmark: (id: string) => void;
	onClick?: () => void;
}

export function ListView({
	competition,
	isBookmarked,
	onToggleBookmark,
	onClick,
}: ListViewProps) {
	const levelLabels: Record<string, string> = {
		sma: "SMA/SMK",
		mahasiswa: "Mahasiswa",
		umum: "Umum",
		profesional: "Profesional",
	};

	const formatLabels: Record<string, string> = {
		online: "Online",
		offline: "Offline",
		hybrid: "Hybrid",
	};

	return (
		<div
			className="group flex cursor-pointer items-center gap-3 md:gap-4 rounded-lg border border-border bg-card p-3 md:p-4 transition-all hover:shadow-md"
			onClick={onClick}
		>
			{/* Thumbnail */}
			<div className="h-16 w-16 md:h-20 md:w-20 shrink-0 overflow-hidden rounded-lg bg-secondary">
				{competition.imageUrl ? (
					<img
						alt={competition.title}
						className="h-full w-full object-cover"
						src={competition.imageUrl}
					/>
				) : (
					<div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5">
						<span className="text-xl font-bold text-primary/30">
							{competition.title.charAt(0)}
						</span>
					</div>
				)}
			</div>

			{/* Content */}
			<div className="flex-1 min-w-0">
				<div className="flex items-start justify-between gap-2">
					<div className="min-w-0">
						<Link href={`/competition/${competition.id}`}>
							<h3 className="truncate text-sm md:text-base font-medium text-foreground transition-colors group-hover:text-primary">
								{competition.title}
							</h3>
						</Link>
						<p className="truncate text-xs md:text-sm text-muted-foreground">
							{competition.organizer}
						</p>
					</div>
					<StatusBadge status={competition.status} />
				</div>

				{/* Meta info */}
				<div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] md:text-xs text-muted-foreground">
					<div className="flex items-center gap-1">
						<Calendar className="h-3 w-3" />
						<span>
							{competition.startDate
								? `${format(competition.startDate, "d MMM", { locale: id })} - ${format(competition.deadline, "d MMM", { locale: id })}`
								: format(competition.deadline, "d MMM yyyy", { locale: id })}
						</span>
					</div>
					<div className="flex items-center gap-1">
						<MapPin className="h-3 w-3" />
						<span>{formatLabels[competition.format]}</span>
					</div>
					<div className="flex items-center gap-1">
						<Users className="h-3 w-3" />
						<span className="capitalize">
							{competition.participationType === "team" ? "Tim" : "Individu"}
						</span>
					</div>
				</div>

				{/* Tags */}
				<div className="mt-2 flex flex-wrap gap-1">
					<span className="rounded bg-primary/10 px-1.5 py-0.5 text-[9px] md:text-[10px] font-medium text-primary">
						{competition.category}
					</span>
					{competition.level.slice(0, 1).map((lvl) => (
						<span
							className="rounded bg-secondary px-1.5 py-0.5 text-[9px] md:text-[10px] text-secondary-foreground"
							key={lvl}
						>
							{levelLabels[lvl]}
						</span>
					))}
				</div>
			</div>

			{/* Actions */}
			<div className="flex shrink-0 flex-col items-end gap-2">
				<Button
					className={cn("h-8 w-8", isBookmarked && "text-foreground")}
					onClick={(e) => {
						e.stopPropagation();
						onToggleBookmark(competition.id);
					}}
					size="icon"
					variant="ghost"
				>
					<Bookmark className={cn("h-4 w-4", isBookmarked && "fill-current")} />
				</Button>
				<Link href={`/competition/${competition.id}`}>
					<Button className="gap-1 text-xs h-7 px-2" size="sm" variant="ghost">
						Detail
						<ArrowUpRight className="h-3 w-3" />
					</Button>
				</Link>
			</div>
		</div>
	);
}
