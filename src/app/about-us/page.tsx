import {
	Filter,
	Globe,
	ExternalLink,
	Target,
	Mail,
	Github,
	Linkedin,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const WA_CHANNEL_LINK = "https://wa.me/6281234567890";

export default function About() {
	return (
		<>
			<main className="container py-8 max-w-4xl">
				{/* Hero Section */}
				<div className="mb-12">
					<h1 className="text-4xl font-bold text-foreground mb-4">
						Tentang TechFusion
					</h1>
					<p className="text-lg text-muted-foreground">
						TechFusion adalah direktori lomba yang membantu mahasiswa dan pemuda
						menemukan kompetisi sesuai minat—dari Indonesia hingga internasional—dalam
						satu tempat yang mudah diakses.
					</p>
				</div>

				{/* Kenapa platform ini dibuat */}
				<section className="mb-12">
					<h2 className="text-2xl font-bold text-foreground mb-4">
						Kenapa platform ini dibuat?
					</h2>
					<div className="space-y-4 text-muted-foreground">
						<p>
							Informasi lomba sering tersebar di banyak platform: grup WhatsApp,
							media sosial, dan situs kampus. Sulit bagi mahasiswa untuk punya
							satu sumber terpercaya yang terpusat. Kami membangun TechFusion
							agar semua info lomba bisa diakses dari satu tempat.
						</p>
						<p>
							Selain itu, filter berdasarkan kategori, status aktif, dan
							penyelenggara sering tidak tersedia—sehingga mencari lomba yang
							masih buka pendaftaran dan sesuai minat jadi memakan waktu. Info
							yang kadaluarsa juga kerap tidak ter-update. Di sisi lain, akses
							ke lomba internasional masih terbatas. TechFusion hadir untuk
							mengatasi masalah-masalah itu.
						</p>
					</div>
				</section>

				{/* Misi */}
				<section className="mb-12">
					<h2 className="text-2xl font-bold text-foreground mb-4">Misi kami</h2>
					<div className="space-y-4 text-muted-foreground">
						<p>
							Kami ingin memudahkan mahasiswa dan pemuda menemukan lomba yang
							tepat: satu platform terpusat, filter yang jelas (kategori,
							status aktif, institusi), dan informasi yang ter-update. Dengan
							itu, kamu bisa fokus mengembangkan diri lewat kompetisi—lokal
							maupun global—tanpa harus mengumpulkan info dari banyak sumber.
						</p>
					</div>
				</section>

				{/* Nilai / Keunggulan */}
				<section className="mb-12">
					<h2 className="text-2xl font-bold text-foreground mb-6">
						Apa yang kami tawarkan
					</h2>
					<div className="grid gap-4 md:grid-cols-3">
						<Card>
							<CardContent className="p-6">
								<div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-4">
									<Target className="h-6 w-6 text-primary" />
								</div>
								<h3 className="font-semibold text-foreground mb-2">
									Satu tempat terpusat
								</h3>
								<p className="text-sm text-muted-foreground">
									Semua info lomba dalam satu platform. Tidak perlu lagi
									berburu dari grup ke grup atau situs ke situs—akses daftar
									lomba dengan cepat dan rapi.
								</p>
							</CardContent>
						</Card>

						<Card>
							<CardContent className="p-6">
								<div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-4">
									<Filter className="h-6 w-6 text-primary" />
								</div>
								<h3 className="font-semibold text-foreground mb-2">
									Filter yang jelas
								</h3>
								<p className="text-sm text-muted-foreground">
									Filter berdasarkan kategori, status aktif, dan
									penyelenggara/institusi. Temukan lomba yang masih buka
									pendaftaran dan sesuai minat kamu dengan lebih mudah.
								</p>
							</CardContent>
						</Card>

						<Card>
							<CardContent className="p-6">
								<div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-4">
									<Globe className="h-6 w-6 text-primary" />
								</div>
								<h3 className="font-semibold text-foreground mb-2">
									Lokal & global
								</h3>
								<p className="text-sm text-muted-foreground">
									Lomba dari Indonesia maupun internasional. Satu direktori
									untuk mengakses peluang kompetisi di dalam dan luar negeri.
								</p>
							</CardContent>
						</Card>
					</div>
				</section>

				{/* Tech stack */}
				<section className="mb-12">
					<h2 className="text-2xl font-bold text-foreground mb-4">
						Built with
					</h2>
					<p className="text-muted-foreground mb-2">
						TechFusion dibangun dengan teknologi modern agar cepat dan nyaman
						digunakan:
					</p>
					<ul className="space-y-1 text-muted-foreground list-disc list-inside">
						<li>Next.js — framework React full-stack</li>
						<li>Tailwind CSS — styling yang konsisten dan responsif</li>
						<li>shadcn/ui — komponen UI yang dapat diandalkan</li>
						<li>Drizzle & PostgreSQL — data lomba dan kategori</li>
						<li>TypeScript — keamanan tipe dan pengalaman develop yang lebih baik</li>
					</ul>
				</section>

				{/* Contact */}
				<section className="mb-12">
					<h2 className="text-2xl font-bold text-foreground mb-4">Hubungi kami</h2>
					<p className="text-muted-foreground mb-4">
						Punya pertanyaan, saran, atau ingin kerja sama? Silakan hubungi kami
						lewat channel berikut:
					</p>
					<ul className="space-y-3">
						<li className="flex items-center gap-2">
							<Github className="h-5 w-5 text-primary" />
							<a
								href="https://github.com"
								target="_blank"
								rel="noopener noreferrer"
								className="font-medium text-foreground hover:underline inline-flex items-center gap-1"
							>
								GitHub <ExternalLink className="h-4 w-4" />
							</a>
						</li>
						<li className="flex items-center gap-2">
							<Linkedin className="h-5 w-5 text-primary" />
							<a
								href="https://linkedin.com"
								target="_blank"
								rel="noopener noreferrer"
								className="font-medium text-foreground hover:underline inline-flex items-center gap-1"
							>
								LinkedIn <ExternalLink className="h-4 w-4" />
							</a>
						</li>
						<li className="flex items-center gap-2">
							<Mail className="h-5 w-5 text-primary" />
							<a
								href="mailto:hello@techfusion.id"
								className="font-medium text-foreground hover:underline inline-flex items-center gap-1"
							>
								Email <ExternalLink className="h-4 w-4" />
							</a>
						</li>
					</ul>
				</section>

				{/* CTA Join WA Channel */}
				<section className="mb-12">
					<Card className="border-primary/20 bg-primary/5">
						<CardContent className="p-6">
							<h2 className="text-xl font-bold text-foreground mb-2">
								Ikuti update lomba lewat WhatsApp
							</h2>
							<p className="text-muted-foreground mb-4">
								Gabung ke channel WhatsApp kami untuk info lomba terbaru, tips,
								dan diskusi seputar kompetisi. Gratis dan tanpa spam.
							</p>
							<a
								href={WA_CHANNEL_LINK}
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
							>
								Join WA Channel <ExternalLink className="h-4 w-4" />
							</a>
						</CardContent>
					</Card>
				</section>
			</main>
		</>
	);
}
