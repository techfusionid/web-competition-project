"use client";

import { format } from "date-fns";
import { id } from "date-fns/locale";
import {
	ArrowLeft,
	Bookmark,
	Calendar,
	ExternalLink,
	Globe,
	MapPin,
	Share2,
	Trophy,
	Users,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner"; // Changed from use-toast as sonner seems to be the preferred toast in this project
import { fetchCompetitionById } from "@/app/actions/competitions";
import { Button } from "@/components/ui/button";
import { useBookmarks } from "@/hooks/useBookmarks";
import { cn } from "@/lib/utils";
import type { Competition } from "@/types/competition";

export default function CompetitionDetailPage() {
	const params = useParams();
	const competitionId = params.id as string;
	const { isBookmarked, toggleBookmark } = useBookmarks();
	const [competition, setCompetition] = useState<Competition | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		async function loadCompetition() {
			setIsLoading(true);
			try {
				const data = await fetchCompetitionById(competitionId);
				setCompetition(data);
			} catch (error) {
				console.error("Failed to fetch competition:", error);
				setCompetition(null);
			} finally {
				setIsLoading(false);
			}
		}
		loadCompetition();
	}, [competitionId]);

	if (isLoading) {
		return (
			<main className="container flex flex-1 flex-col items-center justify-center py-16">
				<p className="text-muted-foreground">Memuat kompetisi...</p>
			</main>
		);
	}

	if (!competition) {
		return (
			<main className="container flex flex-1 flex-col items-center justify-center py-16">
				<h1 className="font-medium text-foreground text-xl">
					Kompetisi tidak ditemukan
				</h1>
				<Link className="mt-4 text-primary text-sm hover:underline" href="/">
					Kembali ke beranda
				</Link>
			</main>
		);
	}

	const levelLabels: Record<string, string> = {
		sma: "SMA/SMK",
		mahasiswa: "Mahasiswa",
		umum: "Umum",
		profesional: "Profesional",
	};

	const bookmarked = isBookmarked(competition.id);

	const handleShare = async () => {
		try {
			await navigator.share({
				title: competition.title,
				text: competition.description,
				url: window.location.href,
			});
		} catch {
			navigator.clipboard.writeText(window.location.href);
			toast.success("Link disalin! Link kompetisi telah disalin ke clipboard.");
		}
	};

	const handleBookmark = () => {
		toggleBookmark(competition.id);
		if (bookmarked) {
			toast.info(
				"Dihapus dari tersimpan. Kompetisi dihapus dari daftar tersimpan."
			);
		} else {
			toast.success("Disimpan! Kompetisi ditambahkan ke daftar tersimpan.");
		}
	};

	return (
		<main className="flex-1">
			<div className="border-border border-b bg-card">
				<div className="container py-6">
					<Link
						className="inline-flex items-center gap-1.5 text-muted-foreground text-xs hover:text-foreground"
						href="/"
					>
						<ArrowLeft className="h-3.5 w-3.5" />
						Kembali
					</Link>

					<div className="mt-6 flex items-start gap-4">
						<div className="flex h-14 w-14 items-center justify-center rounded-xl bg-secondary">
							<Trophy className="h-7 w-7 text-muted-foreground" />
						</div>
						<div className="flex-1">
							<div className="flex flex-wrap items-center gap-2">
								<span className="rounded bg-secondary px-2 py-0.5 font-medium text-secondary-foreground text-xs">
									{competition.category}
								</span>
							</div>
							<h1 className="mt-2 font-semibold text-foreground text-xl md:text-2xl">
								{competition.title}
							</h1>
							<p className="mt-1 text-muted-foreground text-sm">
								oleh {competition.organizer}
							</p>
						</div>
					</div>

					<div className="mt-6 flex flex-wrap gap-2">
						<Button
							className="gap-1.5 text-xs"
							onClick={handleBookmark}
							size="sm"
							variant={bookmarked ? "default" : "outline"}
						>
							<Bookmark
								className={cn("h-3.5 w-3.5", bookmarked && "fill-current")}
							/>
							{bookmarked ? "Tersimpan" : "Simpan"}
						</Button>
						<Button
							className="gap-1.5 text-xs"
							onClick={handleShare}
							size="sm"
							variant="outline"
						>
							<Share2 className="h-3.5 w-3.5" />
							Bagikan
						</Button>
					</div>
				</div>
			</div>

			<div className="container py-8">
				<div className="grid gap-8 lg:grid-cols-3">
					<div className="lg:col-span-2">
						<section>
							<h2 className="font-medium text-base text-foreground">
								Tentang Kompetisi
							</h2>
							<div className="mt-3 whitespace-pre-line text-muted-foreground text-sm leading-relaxed">
								{competition.description}
							</div>
							<p className="mt-3 text-muted-foreground text-sm leading-relaxed">
								Ikuti kompetisi ini untuk mengasah kemampuan dan bersaing dengan
								peserta terbaik dari seluruh Indonesia. Kesempatan emas untuk
								membangun portofolio.
							</p>
						</section>

						<section className="mt-8">
							<h2 className="font-medium text-base text-foreground">
								Tingkat Peserta
							</h2>
							<div className="mt-3 flex flex-wrap gap-2">
								{competition.level.map((lvl) => (
									<span
										className="rounded-md border border-border bg-card px-3 py-1 text-foreground text-xs"
										key={lvl}
									>
										{levelLabels[lvl]}
									</span>
								))}
							</div>
						</section>
					</div>

					<div className="lg:col-span-1">
						<div className="rounded-lg border border-border bg-card p-5">
							<div className="space-y-4">
								<div>
									<p className="text-muted-foreground text-xs">Hadiah</p>
									<p className="mt-0.5 font-semibold text-foreground text-lg">
										{competition.prize}
									</p>
								</div>

								<div className="space-y-3 border-border border-t pt-4">
									<div className="flex items-center gap-3">
										<Calendar className="h-4 w-4 text-muted-foreground" />
										<div>
											<p className="text-muted-foreground text-xs">Deadline</p>
											<p className="text-foreground text-sm">
												{format(competition.deadline, "d MMMM yyyy", {
													locale: id,
												})}
											</p>
										</div>
									</div>

									<div className="flex items-center gap-3">
										<Globe className="h-4 w-4 text-muted-foreground" />
										<div>
											<p className="text-muted-foreground text-xs">Format</p>
											<p className="text-foreground text-sm capitalize">
												{competition.format}
											</p>
										</div>
									</div>

									{competition.location && (
										<div className="flex items-center gap-3">
											<MapPin className="h-4 w-4 text-muted-foreground" />
											<div>
												<p className="text-muted-foreground text-xs">Lokasi</p>
												<p className="text-foreground text-sm">
													{competition.location}
												</p>
											</div>
										</div>
									)}

									<div className="flex items-center gap-3">
										<Users className="h-4 w-4 text-muted-foreground" />
										<div>
											<p className="text-muted-foreground text-xs">Tipe</p>
											<p className="text-foreground text-sm">
												{competition.participationType === "team"
													? "Tim"
													: "Individual"}
											</p>
										</div>
									</div>
								</div>

								<div className="pt-2">
									<Button
										asChild={competition.status !== "closed"}
										className="w-full gap-1.5"
										disabled={competition.status === "closed"}
										size="sm"
									>
										{competition.status === "closed" ? (
											<span>Pendaftaran Ditutup</span>
										) : (
											<a
												href={competition.registrationUrl}
												rel="noopener noreferrer"
												target="_blank"
											>
												Daftar Sekarang
												<ExternalLink className="h-3.5 w-3.5" />
											</a>
										)}
									</Button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}
