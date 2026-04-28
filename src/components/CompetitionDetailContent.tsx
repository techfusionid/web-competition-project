import { format } from "date-fns";
import { id } from "date-fns/locale";
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
import Image from "next/image";
import { useCallback, useMemo, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogPortal } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { type Competition, LEVELS } from "@/types/competition";
import { ClaimCompetitionDialog } from "./ClaimCompetitionDialog";
import { ReportCompetitionDialog } from "./ReportCompetitionDialog";

interface CompetitionDetailContentProps {
	competition: Competition;
	onClose?: () => void;
	variant?: "sheet" | "dialog";
	// Share
	showShareButton?: boolean;
}

export function CompetitionDetailContent({
	competition,
	onClose,
	variant = "sheet",
	showShareButton = false,
}: CompetitionDetailContentProps) {
	const [showReport, setShowReport] = useState(false);
	const [showClaim, setShowClaim] = useState(false);
	const [showShare, setShowShare] = useState(false);
	const [showPosterLightbox, setShowPosterLightbox] = useState(false);

	// Memoize level labels
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

	const handleShare = async () => {
		const shareData = {
			title: competition.title,
			text: `View competition "${competition.title}" on Competitions!`,
			url: competition.registrationUrl,
		};
		try {
			if (navigator.share) {
				await navigator.share(shareData);
			} else {
				await navigator.clipboard.writeText(shareData.url);
				toast.success("Link copied successfully!");
			}
		} catch {
			// User cancelled
		}
	};

	const isSheet = variant === "sheet";

	return (
		<>
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
											fill
											sizes="(max-width: 640px) 100vw, 320px"
											src={competition.imageUrl}
										/>
									</div>
									{/* Hover overlay with View Detail button */}
									<div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
										<Button
											className="bg-primary text-primary-foreground shadow-lg hover:bg-primary/90"
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
									<span className="font-bold text-6xl text-primary/30">
										{competition.title.charAt(0)}
									</span>
								</div>
							)}
						</div>

						{/* Share Button */}
						{showShareButton && (
							<Button
								className="absolute top-3 right-3 h-9 w-9 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
								onClick={() => setShowShare(true)}
								size="icon"
								variant="ghost"
							>
								<Share2 className="h-4 w-4" />
							</Button>
						)}
					</div>

					{/* Content */}
					<div className="space-y-4 p-5">
						{/* Header */}
						<div className="space-y-2">
							<div className="flex items-start justify-between gap-3">
								<h2 className="font-bold text-2xl text-foreground leading-tight">
									{competition.title}
								</h2>
							</div>
							<p className="text-muted-foreground text-sm">
								{competition.organizer}
							</p>
						</div>

						{/* Tags */}
						<div className="flex flex-wrap gap-1.5">
							<span className="rounded-full bg-primary/10 px-2.5 py-0.5 font-medium text-primary text-xs">
								{competition.category}
							</span>
							{competition.level.map((l) => (
								<span
									className="rounded-full bg-secondary px-2.5 py-0.5 text-muted-foreground text-xs"
									key={l}
								>
									{levelLabels[l]}
								</span>
							))}
							<span className="rounded-full bg-secondary px-2.5 py-0.5 text-muted-foreground text-xs capitalize">
								{competition.format}
							</span>
						</div>

						{/* Details - Boxed Style */}
						<div className="grid gap-2 text-sm">
							<div className="flex items-center justify-between gap-3 rounded-lg bg-muted/50 px-3 py-2.5">
								<div className="flex flex-1 items-center gap-3">
									<div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
										<Calendar className="h-4 w-4 text-primary" />
									</div>
									<span className="text-foreground text-xs md:text-sm">
										{competition.startDate
											? `${format(competition.startDate, "d MMMM", { locale: id })} - ${format(competition.deadline, "d MMMM yyyy", { locale: id })}`
											: `Deadline: ${format(competition.deadline, "d MMMM yyyy", { locale: id })}`}
									</span>
								</div>
								{competition.location && (
									<div className="flex flex-1 items-center justify-end gap-3">
										<span className="text-right text-foreground text-xs md:text-sm">
											{competition.location}
										</span>
										<div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
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
								<p className="text-muted-foreground text-xs">Hadiah</p>
								<p className="font-medium text-foreground text-sm">
									{competition.prize}
								</p>
							</div>
						)}

						{/* Description */}
						<div>
							<p className="mb-1.5 font-medium text-muted-foreground text-sm">
								About Competition
							</p>
							<Separator className="my-3" />
							<p className="whitespace-pre-line text-muted-foreground text-sm leading-relaxed">
								{competition.description}
							</p>
						</div>

						{/* CTA Button */}
						<a
							className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 font-medium text-primary-foreground text-sm transition-colors hover:bg-primary/90"
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
			</ScrollArea>

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
								className="absolute top-0 right-0 z-10 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
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
										height={600}
										sizes="(max-width: 640px) 100vw, 80rem"
										src={competition.imageUrl}
										width={800}
									/>
								</div>
							)}
						</div>
					</div>
				</DialogPortal>
			</Dialog>
		</>
	);
}

function SharePopup({
	isOpen,
	onClose,
	title,
	url,
}: {
	isOpen: boolean;
	onClose: () => void;
	title: string;
	url: string;
}) {
	const [showCopyToast, setShowCopyToast] = useState(false);

	const handleCopy = useCallback(async () => {
		await navigator.clipboard.writeText(url);
		setShowCopyToast(true);
		setTimeout(() => setShowCopyToast(false), 2000);
	}, [url]);

	if (!isOpen) {
		return null;
	}

	return (
		<Dialog onOpenChange={onClose} open={isOpen}>
			<DialogPortal>
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
					<div className="w-full max-w-sm rounded-xl bg-card p-4 shadow-lg">
						<div className="mb-4 flex items-center justify-between">
							<h3 className="font-semibold text-foreground">
								Share Competition
							</h3>
							<Button
								className="h-8 w-8 rounded-full p-0"
								onClick={onClose}
								size="icon"
								variant="ghost"
							>
								<X className="h-4 w-4" />
							</Button>
						</div>
						<p className="mb-4 text-muted-foreground text-sm">{title}</p>
						<div className="flex gap-2">
							<Button className="flex-1" onClick={handleCopy} variant="outline">
								{showCopyToast ? "Copied!" : "Copy Link"}
							</Button>
						</div>
					</div>
				</div>
			</DialogPortal>
		</Dialog>
	);
}
