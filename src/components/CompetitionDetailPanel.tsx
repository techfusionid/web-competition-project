import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Calendar, ExternalLink, MapPin, Share2, Users, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { type Competition, LEVELS } from "@/types/competition";
import { StatusBadge } from "./StatusBadge";

interface CompetitionDetailPanelProps {
	competition: Competition | null;
	onClose?: () => void;
}

export function CompetitionDetailPanel({
	competition,
	onClose,
}: CompetitionDetailPanelProps) {
	const handleShare = async () => {
		if (!competition) return;

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
		} catch (err) {
			// User cancelled sharing
		}
	};

	const levelLabels = LEVELS.reduce(
		(acc, l) => {
			acc[l.value] = l.label;
			return acc;
		},
		{} as Record<string, string>
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
		<ScrollArea className="h-full rounded-lg border border-border bg-card">
			<div className="p-0">
				{/* Poster Image */}
				<div className="relative aspect-[16/9] w-full overflow-hidden bg-secondary">
					{competition.imageUrl ? (
						<img
							alt={competition.title}
							className="h-full w-full object-cover"
							src={competition.imageUrl}
						/>
					) : (
						<div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5">
							<span className="text-6xl font-bold text-primary/30">
								{competition.title.charAt(0)}
							</span>
						</div>
					)}

					{/* Close Button */}
					{onClose && (
						<Button
							className="absolute left-3 top-3 h-9 w-9 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
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
						onClick={handleShare}
						size="icon"
						variant="ghost"
					>
						<Share2 className="h-4 w-4" />
					</Button>
				</div>

				{/* Content */}
				<div className="space-y-4 p-5">
					{/* Header */}
					<div className="space-y-1.5">
						<div className="flex items-start justify-between gap-3">
							<h2 className="text-lg font-semibold text-foreground leading-tight">
								{competition.title}
							</h2>
							<StatusBadge status={competition.status} />
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

					{/* Details */}
					<div className="grid gap-2 text-sm">
						<div className="flex items-center gap-2 text-muted-foreground">
							<Calendar className="h-4 w-4" />
							<span>
								{competition.startDate
									? `${format(competition.startDate, "d MMMM", { locale: id })} - ${format(competition.deadline, "d MMMM yyyy", { locale: id })}`
									: `Deadline: ${format(competition.deadline, "d MMMM yyyy", { locale: id })}`}
							</span>
						</div>
						<div className="flex items-center gap-2 text-muted-foreground">
							<Users className="h-4 w-4" />
							<span className="capitalize">
								{competition.participationType === "team"
									? "Tim"
									: "Individual"}
							</span>
						</div>
						{competition.location && (
							<div className="flex items-center gap-2 text-muted-foreground">
								<MapPin className="h-4 w-4" />
								<span>{competition.location}</span>
							</div>
						)}
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
						<p className="text-xs font-medium text-muted-foreground mb-1.5">
							Deskripsi
						</p>
						<p className="text-sm text-muted-foreground leading-relaxed">
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
				</div>
			</div>
		</ScrollArea>
	);
}
