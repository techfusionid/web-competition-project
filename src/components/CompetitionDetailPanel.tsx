import { format } from "date-fns";
import { id } from "date-fns/locale";
import Image from "next/image";
import {
	BadgeCheck,
	Calendar,
	ExternalLink,
	Eye,
	Flag,
	MapPin,
	Share2,
	Users,
	X,
} from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogPortal } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { type Competition, LEVELS } from "@/types/competition";
import { ClaimCompetitionDialog } from "./ClaimCompetitionDialog";
import { ReportCompetitionDialog } from "./ReportCompetitionDialog";
import { SharePopup } from "./SharePopup";

interface CompetitionDetailPanelProps {
	competition: Competition | null;
	onClose?: () => void;
}

export function CompetitionDetailPanel({
	competition,
	onClose,
}: CompetitionDetailPanelProps) {
	const [showReport, setShowReport] = useState(false);
	const [showClaim, setShowClaim] = useState(false);
	const [showShare, setShowShare] = useState(false);
	const [showPosterLightbox, setShowPosterLightbox] = useState(false);

	// Memoize level labels to avoid recreating on every render
	const levelLabels = useMemo(
		() =>
			LEVELS.reduce(
				(acc, l) => {
					acc[l.value] = l.label;
					return acc;
				},
				{} as Record<string, string>
			),
		[]
	);

	if (!competition) {
		return (
			<div className="flex h-full items-center justify-center rounded-lg border border-dashed border-border bg-card/50 p-8">
				<p className="text-sm text-muted-foreground text-center">
					Pilih kompetisi untuk melihat detail
				</p>
			</div>
		);
	}

	return (
		<ScrollArea className="h-full">
			<div className="p-0">
				{/* Poster Image with hover effect */}
				<div className="relative w-full px-4 py-4">
					<div className="group relative mx-auto w-full max-w-xs">
						{competition.imageUrl ? (
							<>
								<div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg">
									<Image
										alt={competition.title}
										className="object-cover transition-transform duration-300 group-hover:scale-105"
										src={competition.imageUrl}
										fill
										sizes="(max-width: 640px) 100vw, 320px"
									/>
								</div>
								{/* Hover overlay with View Detail button */}
								<div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
									<Button
										className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg"
										onClick={() => setShowPosterLightbox(true)}
										size="sm"
									>
										<Eye className="mr-2 h-4 w-4" />
										View Detail
									</Button>
								</div>
							</>
						) : (
							<div className="flex aspect-[3/4] w-full items-center justify-center rounded-lg bg-gradient-to-br from-primary/20 to-primary/5">
								<span className="text-6xl font-bold text-primary/30">
									{competition.title.charAt(0)}
								</span>
							</div>
						)}
					</div>

					{/* Close Button */}
					{onClose && (
						<Button
							className="absolute left-3 top-3 h-9 w-9 rounded-lg bg-background/80 backdrop-blur-sm hover:bg-background"
							onClick={onClose}
							size="icon"
							variant="ghost"
						>
							<X className="h-4 w-4" />
						</Button>
					)}

					{/* Share Button */}
					<Button
						className="absolute right-3 top-3 h-9 w-9 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
						onClick={() => setShowShare(true)}
						size="icon"
						variant="ghost"
					>
						<Share2 className="h-4 w-4" />
					</Button>
				</div>

				{/* Content */}
				<div className="space-y-4 p-5">
					{/* Header */}
					<div className="space-y-2">
						<div className="flex items-start justify-between gap-3">
							<h2 className="text-2xl font-bold text-foreground leading-tight">
								{competition.title}
							</h2>
						</div>
						<p className="text-sm text-muted-foreground">
							{competition.organizer}
						</p>
					</div>

					{/* Tags */}
					<div className="flex flex-wrap gap-1.5">
						<span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
							{competition.category}
						</span>
						{competition.level.map((l) => (
							<span
								className="rounded-full bg-secondary px-2.5 py-0.5 text-xs text-muted-foreground"
								key={l}
							>
								{levelLabels[l]}
							</span>
						))}
						<span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs capitalize text-muted-foreground">
							{competition.format}
						</span>
					</div>

					{/* Details - Boxed Style */}
					<div className="grid gap-2 text-sm">
						<div className="flex items-center justify-between gap-3 rounded-lg bg-muted/50 px-3 py-2.5">
							<div className="flex items-center gap-3 flex-1">
								<div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 shrink-0">
									<Calendar className="h-4 w-4 text-primary" />
								</div>
								<span className="text-foreground text-xs md:text-sm">
									{competition.startDate
										? `${format(competition.startDate, "d MMMM", { locale: id })} - ${format(competition.deadline, "d MMMM yyyy", { locale: id })}`
										: `Deadline: ${format(competition.deadline, "d MMMM yyyy", { locale: id })}`}
								</span>
							</div>
							{competition.location && (
								<div className="flex items-center gap-3 flex-1 justify-end">
									<span className="text-foreground text-xs md:text-sm text-right">
										{competition.location}
									</span>
									<div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 shrink-0">
										<MapPin className="h-4 w-4 text-primary" />
									</div>
								</div>
							)}
						</div>
						<div className="flex items-center gap-3 rounded-lg bg-muted/50 px-3 py-2.5">
							<div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
								<Users className="h-4 w-4 text-primary" />
							</div>
							<span className="text-foreground capitalize">
								{competition.participationType === "team"
									? "Tim"
									: "Individual"}
							</span>
						</div>
					</div>

					{/* Prize */}
					{competition.prize && (
						<div className="rounded-lg bg-primary/5 p-4">
							<p className="text-xs text-muted-foreground">Hadiah</p>
							<p className="text-sm font-medium text-foreground">
								{competition.prize}
							</p>
						</div>
					)}

					{/* Description */}
					<div>
						<p className="text-sm font-medium text-muted-foreground mb-1.5">
							About Competition
						</p>
						<Separator className="my-3" />
						<p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
							{competition.description}
						</p>
					</div>

					{/* CTA Button */}
					<a
						className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
						href={competition.registrationUrl}
						rel="noopener noreferrer"
						target="_blank"
					>
						Daftar Sekarang
						<ExternalLink className="h-4 w-4" />
					</a>

					{/* Report & Claim */}
					<div className="flex flex-col gap-2 pt-2">
						<Button
							className="w-fit justify-start gap-2 text-muted-foreground"
							onClick={() => setShowReport(true)}
							size="sm"
							variant="ghost"
						>
							<Flag className="h-4 w-4" />
							Report event
						</Button>
						<Button
							className="w-fit justify-start gap-2 text-muted-foreground"
							onClick={() => setShowClaim(true)}
							size="sm"
							variant="ghost"
						>
							<BadgeCheck className="h-4 w-4" />
							Contact the host
						</Button>
					</div>
				</div>
			</div>
			<ReportCompetitionDialog
				competition={competition}
				isOpen={showReport}
				onClose={() => setShowReport(false)}
			/>
			<ClaimCompetitionDialog
				competition={competition}
				isOpen={showClaim}
				onClose={() => setShowClaim(false)}
			/>
			<SharePopup
				isOpen={showShare}
				onClose={() => setShowShare(false)}
				title={competition.title}
				url={competition.registrationUrl}
			/>

			{/* Poster Lightbox Dialog */}
			<Dialog onOpenChange={setShowPosterLightbox} open={showPosterLightbox}>
				<DialogPortal>
					<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
						<div className="relative max-h-[90vh] max-w-4xl">
							<Button
								className="absolute right-0 top-0 z-10 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
								onClick={() => setShowPosterLightbox(false)}
								size="icon"
								variant="ghost"
							>
								<X className="h-5 w-5" />
							</Button>
							{competition.imageUrl && (
								<div className="relative h-auto max-h-[90vh] w-auto">
									<Image
										alt={competition.title}
										className="rounded-lg object-contain"
										src={competition.imageUrl}
										width={800}
										height={600}
										sizes="(max-width: 640px) 100vw, 80rem"
									/>
								</div>
							)}
						</div>
					</div>
				</DialogPortal>
			</Dialog>
		</ScrollArea>
	);
}
