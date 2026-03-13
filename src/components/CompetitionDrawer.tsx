import { format } from "date-fns";
import { id } from "date-fns/locale";
import {
	BadgeCheck,
	Calendar,
	ExternalLink,
	Flag,
	MapPin,
	Share2,
	Users,
	X,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerTitle,
} from "@/components/ui/drawer";
import { type Competition, LEVELS } from "@/types/competition";
import { ClaimCompetitionDialog } from "./ClaimCompetitionDialog";
import { ReportCompetitionDialog } from "./ReportCompetitionDialog";

interface CompetitionDrawerProps {
	competition: Competition | null;
	isOpen: boolean;
	onClose: () => void;
}

export function CompetitionDrawer({
	competition,
	isOpen,
	onClose,
}: CompetitionDrawerProps) {
	const [showReport, setShowReport] = useState(false);
	const [showClaim, setShowClaim] = useState(false);

	const handleShare = async () => {
		if (!competition) {
			return;
		}

		const shareData = {
			title: competition.title,
			text: `Lihat kompetisi "${competition.title}" di Competitions!`,
			url: competition.registrationUrl,
		};

		try {
			if (navigator.share) {
				await navigator.share(shareData);
			} else {
				await navigator.clipboard.writeText(competition.registrationUrl);
				toast.success("Link berhasil disalin!");
			}
		} catch (_err) {
			// User cancelled sharing
		}
	};

	if (!competition) {
		return null;
	}

	const levelLabels = LEVELS.reduce(
		(acc, l) => {
			acc[l.value] = l.label;
			return acc;
		},
		{} as Record<string, string>
	);

	return (
		<Drawer
			fadeFromIndex={0}
			onOpenChange={(open) => !open && onClose()}
			open={isOpen}
			snapPoints={[0.6, 0.9, 1]}
		>
			<DrawerContent className="flex max-h-[96vh] flex-col pb-0">
				<DrawerTitle className="sr-only">{competition.title}</DrawerTitle>

				{/* Single scroll area: poster then caption (Instagram-style) */}
				<div className="min-h-0 flex-1 overflow-y-auto overscroll-contain pb-safe">
					{/* Poster at top */}
					<div className="relative aspect-[4/5] w-full shrink-0 overflow-hidden bg-secondary">
						{competition.imageUrl ? (
							<img
								alt={competition.title}
								className="h-full w-full object-cover"
								src={competition.imageUrl}
							/>
						) : (
							<div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5">
								<span className="font-bold text-6xl text-primary/30">
									{competition.title.charAt(0)}
								</span>
							</div>
						)}

						{/* Close button - overlay left */}
						<DrawerClose className="absolute top-3 left-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm hover:bg-background focus:outline-none focus:ring-2 focus:ring-ring">
							<X className="h-4 w-4" />
							<span className="sr-only">Tutup</span>
						</DrawerClose>

						{/* Share button - overlay right */}
						<Button
							className="absolute top-3 right-3 z-10 h-9 w-9 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
							onClick={handleShare}
							size="icon"
							variant="ghost"
						>
							<Share2 className="h-4 w-4" />
						</Button>
					</div>

					{/* Caption & content below poster */}
					<div className="space-y-3 p-4">
						{/* Title + organizer (caption header) */}
						<div className="space-y-1">
							<div className="flex items-start justify-between gap-2">
								<h2 className="pr-2 font-semibold text-base text-foreground leading-tight">
									{competition.title}
								</h2>
							</div>
							<p className="text-muted-foreground text-sm">
								{competition.organizer}
							</p>
						</div>

						{/* Description as caption */}
						<div>
							<p className="whitespace-pre-wrap text-muted-foreground text-sm leading-relaxed">
								{competition.description}
							</p>
						</div>

						{/* Tags */}
						<div className="flex flex-wrap gap-1.5">
							<span className="rounded-full bg-primary/10 px-2 py-0.5 font-medium text-primary text-xs">
								{competition.category}
							</span>
							{competition.level.slice(0, 2).map((l) => (
								<span
									className="rounded-full bg-secondary px-2 py-0.5 text-muted-foreground text-xs"
									key={l}
								>
									{levelLabels[l]}
								</span>
							))}
							<span className="rounded-full bg-secondary px-2 py-0.5 text-muted-foreground text-xs capitalize">
								{competition.format}
							</span>
						</div>

						{/* Details */}
						<div className="grid gap-1.5 text-sm">
							<div className="flex items-center gap-1.5 text-muted-foreground">
								<Calendar className="h-4 w-4 shrink-0" />
								<span>
									{competition.startDate
										? `${format(competition.startDate, "d MMM", { locale: id })} - ${format(competition.deadline, "d MMM yyyy", { locale: id })}`
										: `Deadline: ${format(competition.deadline, "d MMM yyyy", { locale: id })}`}
								</span>
							</div>
							<div className="flex items-center gap-1.5 text-muted-foreground">
								<Users className="h-4 w-4 shrink-0" />
								<span className="capitalize">
									{competition.participationType === "team"
										? "Tim"
										: "Individual"}
								</span>
							</div>
							{competition.location && (
								<div className="flex items-center gap-1.5 text-muted-foreground">
									<MapPin className="h-4 w-4 shrink-0" />
									<span>{competition.location}</span>
								</div>
							)}
						</div>

						{/* Prize */}
						{competition.prize && (
							<div className="rounded-lg bg-primary/5 p-3">
								<p className="text-muted-foreground text-xs">Hadiah</p>
								<p className="font-medium text-foreground text-sm">
									{competition.prize}
								</p>
							</div>
						)}

						{/* CTA Button */}
						<a
							className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-primary px-3 py-2.5 font-medium text-primary-foreground text-sm transition-colors hover:bg-primary/90"
							href={competition.registrationUrl}
							rel="noopener noreferrer"
							target="_blank"
						>
							Daftar Sekarang
							<ExternalLink className="h-4 w-4" />
						</a>

						{/* Report & Claim */}
						<div className="flex gap-2 pt-1">
							<Button
								className="flex-1 gap-1.5 text-muted-foreground"
								onClick={() => setShowReport(true)}
								size="sm"
								variant="outline"
							>
								<Flag className="h-3.5 w-3.5" />
								Laporkan
							</Button>
							<Button
								className="flex-1 gap-1.5 text-muted-foreground"
								onClick={() => setShowClaim(true)}
								size="sm"
								variant="outline"
							>
								<BadgeCheck className="h-3.5 w-3.5" />
								Klaim
							</Button>
						</div>
					</div>
				</div>
			</DrawerContent>
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
		</Drawer>
	);
}
