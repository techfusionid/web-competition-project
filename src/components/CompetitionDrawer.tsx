import { format } from "date-fns";
import { id } from "date-fns/locale";
import {
	Calendar,
	ExternalLink,
	MapPin,
	Share2,
	Users,
	X,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerTitle,
} from "@/components/ui/drawer";
import { type Competition, LEVELS } from "@/types/competition";
import { StatusBadge } from "./StatusBadge";

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
	const handleShare = async () => {
		if (!competition) return;

		const shareData = {
			title: competition.title,
			text: `Lihat kompetisi "${competition.title}" di LombaHub!`,
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

	if (!competition) return null;

	const levelLabels = LEVELS.reduce(
		(acc, l) => {
			acc[l.value] = l.label;
			return acc;
		},
		{} as Record<string, string>
	);

	return (
		<Drawer
			onOpenChange={(open) => !open && onClose()}
			open={isOpen}
			snapPoints={[0.6, 0.9, 1]}
			fadeFromIndex={0}
		>
			<DrawerContent className="max-h-[96vh] pb-0">
				<DrawerTitle className="sr-only">{competition.title}</DrawerTitle>

				{/* Drag Handle - visual indicator */}
				<div className="mx-auto mb-2 h-1.5 w-12 rounded-full bg-muted" />

				<DrawerClose className="absolute right-3 top-3 z-10 inline-flex h-8 w-8 items-center justify-center rounded-full bg-muted/50 hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring">
					<X className="h-4 w-4" />
					<span className="sr-only">Tutup</span>
				</DrawerClose>

				{/* Scrollable content */}
				<div className="overflow-y-auto overscroll-contain pb-safe">
					{/* Content */}
					<div className="space-y-3 p-4 pt-2">
						{/* Header */}
						<div className="space-y-1">
							<div className="flex items-start justify-between gap-2">
								<h2 className="text-base font-semibold text-foreground leading-tight pr-2">
									{competition.title}
								</h2>
								<div className="flex items-center gap-1 shrink-0">
									<StatusBadge status={competition.status} />
									<Button
										className="h-7 w-7 rounded-full"
										onClick={handleShare}
										size="icon"
										variant="ghost"
									>
										<Share2 className="h-3.5 w-3.5" />
									</Button>
								</div>
							</div>
							<p className="text-sm text-muted-foreground">
								{competition.organizer}
							</p>
						</div>

						{/* Tags */}
						<div className="flex flex-wrap gap-1.5">
							<span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
								{competition.category}
							</span>
							{competition.level.slice(0, 2).map((l) => (
								<span
									className="rounded-full bg-secondary px-2 py-0.5 text-xs text-muted-foreground"
									key={l}
								>
									{levelLabels[l]}
								</span>
							))}
							<span className="rounded-full bg-secondary px-2 py-0.5 text-xs capitalize text-muted-foreground">
								{competition.format}
							</span>
						</div>

						{/* Details */}
						<div className="grid gap-1.5 text-sm">
							<div className="flex items-center gap-1.5 text-muted-foreground">
								<Calendar className="h-4 w-4" />
								<span>
									{competition.startDate
										? `${format(competition.startDate, "d MMM", { locale: id })} - ${format(competition.deadline, "d MMM yyyy", { locale: id })}`
										: `Deadline: ${format(competition.deadline, "d MMM yyyy", { locale: id })}`}
								</span>
							</div>
							<div className="flex items-center gap-1.5 text-muted-foreground">
								<Users className="h-4 w-4" />
								<span className="capitalize">
									{competition.participationType === "team" ? "Tim" : "Individual"}
								</span>
							</div>
							{competition.location && (
								<div className="flex items-center gap-1.5 text-muted-foreground">
									<MapPin className="h-4 w-4" />
									<span>{competition.location}</span>
								</div>
							)}
						</div>

						{/* Prize */}
						{competition.prize && (
							<div className="rounded-lg bg-primary/5 p-3">
								<p className="text-xs text-muted-foreground">Hadiah</p>
								<p className="text-sm font-medium text-foreground">
									{competition.prize}
								</p>
							</div>
						)}

						{/* Description */}
						<div>
							<p className="text-xs font-medium text-muted-foreground mb-1">
								Deskripsi
							</p>
							<p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
								{competition.description}
							</p>
						</div>

						{/* CTA Button */}
						<a
							className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-primary px-3 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
							href={competition.registrationUrl}
							rel="noopener noreferrer"
							target="_blank"
						>
							Daftar Sekarang
							<ExternalLink className="h-4 w-4" />
						</a>
					</div>
				</div>
			</DrawerContent>
		</Drawer>
	);
}
