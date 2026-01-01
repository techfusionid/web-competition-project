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
import { toast } from "sonner"; // Changed from use-toast as sonner seems to be the preferred toast in this project
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { competitions } from "@/data/competitions";
import { useBookmarks } from "@/hooks/useBookmarks";
import { cn } from "@/lib/utils";

export default function CompetitionDetailPage() {
	const params = useParams();
	const competitionId = params.id as string;
	const { isBookmarked, toggleBookmark } = useBookmarks();

	const competition = competitions.find((c) => c.id === competitionId);

	if (!competition) {
		return (
			<div className="flex min-h-screen flex-col bg-background">
				<Header />
				<main className="container flex flex-1 flex-col items-center justify-center py-16">
					<h1 className="text-xl font-medium text-foreground">
						Kompetisi tidak ditemukan
					</h1>
					<Link className="mt-4 text-sm text-primary hover:underline" href="/">
						Kembali ke beranda
					</Link>
				</main>
				<Footer />
			</div>
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
		<div className="flex min-h-screen flex-col bg-background">
			<Header />
			<main className="flex-1">
				<div className="border-b border-border bg-card">
					<div className="container py-6">
						<Link
							className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
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
									<span className="rounded bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground">
										{competition.category}
									</span>
									<StatusBadge status={competition.status} />
								</div>
								<h1 className="mt-2 text-xl font-semibold text-foreground md:text-2xl">
									{competition.title}
								</h1>
								<p className="mt-1 text-sm text-muted-foreground">
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
								<h2 className="text-base font-medium text-foreground">
									Tentang Kompetisi
								</h2>
								<p className="mt-3 text-sm leading-relaxed text-muted-foreground">
									{competition.description}
								</p>
								<p className="mt-3 text-sm leading-relaxed text-muted-foreground">
									Ikuti kompetisi ini untuk mengasah kemampuan dan bersaing
									dengan peserta terbaik dari seluruh Indonesia. Kesempatan emas
									untuk membangun portofolio.
								</p>
							</section>

							<section className="mt-8">
								<h2 className="text-base font-medium text-foreground">
									Tingkat Peserta
								</h2>
								<div className="mt-3 flex flex-wrap gap-2">
									{competition.level.map((lvl) => (
										<span
											className="rounded-md border border-border bg-card px-3 py-1 text-xs text-foreground"
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
										<p className="text-xs text-muted-foreground">Hadiah</p>
										<p className="mt-0.5 text-lg font-semibold text-foreground">
											{competition.prize}
										</p>
									</div>

									<div className="space-y-3 border-t border-border pt-4">
										<div className="flex items-center gap-3">
											<Calendar className="h-4 w-4 text-muted-foreground" />
											<div>
												<p className="text-xs text-muted-foreground">
													Deadline
												</p>
												<p className="text-sm text-foreground">
													{format(competition.deadline, "d MMMM yyyy", {
														locale: id,
													})}
												</p>
											</div>
										</div>

										<div className="flex items-center gap-3">
											<Globe className="h-4 w-4 text-muted-foreground" />
											<div>
												<p className="text-xs text-muted-foreground">Format</p>
												<p className="text-sm capitalize text-foreground">
													{competition.format}
												</p>
											</div>
										</div>

										{competition.location && (
											<div className="flex items-center gap-3">
												<MapPin className="h-4 w-4 text-muted-foreground" />
												<div>
													<p className="text-xs text-muted-foreground">
														Lokasi
													</p>
													<p className="text-sm text-foreground">
														{competition.location}
													</p>
												</div>
											</div>
										)}

										<div className="flex items-center gap-3">
											<Users className="h-4 w-4 text-muted-foreground" />
											<div>
												<p className="text-xs text-muted-foreground">Tipe</p>
												<p className="text-sm text-foreground">
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
			<Footer />
		</div>
	);
}
