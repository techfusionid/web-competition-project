import { useState } from "react";
import {
	Calendar,
	MapPin,
	Users,
	Bookmark,
	ArrowUpRight,
	Trophy,
	Globe,
	Instagram,
	Mail,
	ChevronDown,
	ChevronUp,
} from "lucide-react";
import { Competition } from "@/types/competition";
import { StatusBadge } from "./StatusBadge";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface CompetitionCardProps {
	competition: Competition;
	isBookmarked: boolean;
	onToggleBookmark: (id: string) => void;
	onOrganizerClick?: (organizer: string) => void;
	onClick?: () => void;
}

export function CompetitionCard({
	competition,
	isBookmarked,
	onToggleBookmark,
	onOrganizerClick,
	onClick,
}: CompetitionCardProps) {
	const [isExpanded, setIsExpanded] = useState(false);

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

	const shouldShowReadMore = competition.description.length > 100;

	return (
		<div
			className="group relative flex cursor-pointer flex-col rounded-lg border border-border bg-card p-3 md:p-4 transition-all hover:shadow-md"
			onClick={onClick}
		>
			<div className="flex items-start justify-between gap-2">
				<div className="flex items-center gap-2 md:gap-3 min-w-0">
					<div className="flex h-8 w-8 md:h-10 md:w-10 shrink-0 items-center justify-center rounded-lg bg-secondary">
						<Trophy className="h-4 w-4 md:h-5 md:w-5 text-muted-foreground" />
					</div>
					<div className="min-w-0 flex-1">
						<Link href={`/competition/${competition.id}`}>
							<h3 className="truncate text-xs md:text-sm font-medium text-foreground transition-colors group-hover:text-primary">
								{competition.title}
							</h3>
						</Link>
						<button
							onClick={(e) => {
								e.stopPropagation();
								onOrganizerClick?.(competition.organizer);
							}}
							className="truncate text-[10px] md:text-xs text-muted-foreground hover:text-primary hover:underline text-left w-full"
						>
							{competition.organizer}
						</button>
					</div>
				</div>
				<Button
					variant="ghost"
					size="icon"
					onClick={(e) => {
						e.stopPropagation();
						onToggleBookmark(competition.id);
					}}
					className={cn(
						"h-7 w-7 md:h-8 md:w-8 shrink-0",
						isBookmarked && "text-foreground",
					)}
				>
					<Bookmark
						className={cn(
							"h-3.5 w-3.5 md:h-4 md:w-4",
							isBookmarked && "fill-current",
						)}
					/>
				</Button>
			</div>

			{/* Description with expand/collapse */}
			<div className="mt-2 md:mt-3">
				<p
					className={cn(
						"text-[10px] md:text-xs text-muted-foreground leading-relaxed",
						!isExpanded && "line-clamp-2",
					)}
				>
					{competition.description}
				</p>
				{shouldShowReadMore && (
					<button
						onClick={(e) => {
							e.stopPropagation();
							setIsExpanded(!isExpanded);
						}}
						className="mt-1 flex items-center gap-0.5 text-[10px] md:text-xs text-primary hover:underline"
					>
						{isExpanded ? (
							<>
								<span>Lebih sedikit</span>
								<ChevronUp className="h-3 w-3" />
							</>
						) : (
							<>
								<span>Selengkapnya</span>
								<ChevronDown className="h-3 w-3" />
							</>
						)}
					</button>
				)}
			</div>

			{/* Location Info */}
			<div className="mt-2 md:mt-3 flex flex-wrap items-center gap-x-2 md:gap-x-3 gap-y-1 text-[10px] md:text-xs text-muted-foreground">
				<div className="flex items-center gap-1">
					<MapPin className="h-3 w-3 md:h-3.5 md:w-3.5" />
					<span className="font-medium">
						{formatLabels[competition.format]}
					</span>
					{competition.format !== "online" && competition.location && (
						<span className="text-muted-foreground">
							• {competition.location}
						</span>
					)}
				</div>
			</div>

			{/* Institutions (if offline/hybrid with multiple institutions) */}
			{competition.format !== "online" &&
				competition.institutions &&
				competition.institutions.length > 0 && (
					<div className="mt-1.5 flex flex-wrap gap-1">
						{competition.institutions.map((inst, idx) => (
							<span
								key={idx}
								className="rounded bg-muted px-1.5 py-0.5 text-[9px] md:text-[10px] text-muted-foreground"
							>
								{inst}
							</span>
						))}
					</div>
				)}

			{/* Social Media */}
			{competition.socialMedia && (
				<div className="mt-2 flex flex-wrap items-center gap-2">
					{competition.socialMedia.instagram && (
						<a
							href={`https://instagram.com/${competition.socialMedia.instagram.replace("@", "")}`}
							target="_blank"
							rel="noopener noreferrer"
							onClick={(e) => e.stopPropagation()}
							className="flex items-center gap-1 text-[10px] md:text-xs text-muted-foreground hover:text-primary"
						>
							<Instagram className="h-3 w-3" />
							<span className="hidden md:inline">
								{competition.socialMedia.instagram}
							</span>
						</a>
					)}
					{competition.socialMedia.website && (
						<a
							href={competition.socialMedia.website}
							target="_blank"
							rel="noopener noreferrer"
							onClick={(e) => e.stopPropagation()}
							className="flex items-center gap-1 text-[10px] md:text-xs text-muted-foreground hover:text-primary"
						>
							<Globe className="h-3 w-3" />
							<span className="hidden md:inline">Website</span>
						</a>
					)}
					{competition.socialMedia.email && (
						<a
							href={`mailto:${competition.socialMedia.email}`}
							onClick={(e) => e.stopPropagation()}
							className="flex items-center gap-1 text-[10px] md:text-xs text-muted-foreground hover:text-primary"
						>
							<Mail className="h-3 w-3" />
							<span className="hidden md:inline">
								{competition.socialMedia.email}
							</span>
						</a>
					)}
				</div>
			)}

			<div className="mt-2 md:mt-3 flex flex-wrap items-center gap-x-2 md:gap-x-4 gap-y-1 text-[10px] md:text-xs text-muted-foreground">
				<div className="flex items-center gap-1">
					<Calendar className="h-3 w-3 md:h-3.5 md:w-3.5" />
					<span>{format(competition.deadline, "d MMM", { locale: id })}</span>
				</div>
				<div className="flex items-center gap-1">
					<Users className="h-3 w-3 md:h-3.5 md:w-3.5" />
					<span className="capitalize">
						{competition.participationType === "team" ? "Tim" : "Individu"}
					</span>
				</div>
				<StatusBadge status={competition.status} />
			</div>

			<div className="mt-2 md:mt-3 flex flex-wrap gap-1">
				<span className="rounded bg-secondary px-1.5 md:px-2 py-0.5 text-[9px] md:text-xs text-secondary-foreground">
					{competition.category}
				</span>
				{competition.level.slice(0, 1).map((lvl) => (
					<span
						key={lvl}
						className="rounded bg-secondary px-1.5 md:px-2 py-0.5 text-[9px] md:text-xs text-secondary-foreground"
					>
						{levelLabels[lvl]}
					</span>
				))}
			</div>

			<div className="mt-2 md:mt-4 flex items-center justify-between border-t border-border pt-2 md:pt-4">
				<div className="min-w-0">
					<p className="text-[9px] md:text-xs text-muted-foreground">Hadiah</p>
					<p className="text-[10px] md:text-sm font-medium text-foreground truncate">
						{competition.prize}
					</p>
				</div>
				<Link href={`/competition/${competition.id}`}>
					<Button
						variant="ghost"
						size="sm"
						className="gap-1 text-[10px] md:text-xs h-7 px-2 md:px-3"
					>
						Detail
						<ArrowUpRight className="h-2.5 w-2.5 md:h-3 md:w-3" />
					</Button>
				</Link>
			</div>
		</div>
	);
}
