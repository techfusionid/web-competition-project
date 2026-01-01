interface HeroProps {
	onTagClick: (tag: string) => void;
}

export function Hero({ onTagClick }: HeroProps) {
	return (
		<section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-secondary/50 to-background py-20 md:py-32">
			<div className="container relative z-10">
				<div className="mx-auto flex max-w-[800px] flex-col items-center text-center">
					<h1 className="text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
						Temukan Kompetisi Terbaik untuk Mahasiswa & Pelajar Indonesia
					</h1>
					<p className="mt-6 text-balance text-lg text-muted-foreground md:text-xl">
						Lebih dari 500+ kompetisi dari berbagai kategori. Bangun portofolio,
						asah skill, dan raih prestasi bersama LombaHub.
					</p>

					<div className="mt-8 flex flex-wrap items-center justify-center gap-2 text-sm">
						<span className="text-muted-foreground">Populer:</span>
						{["Hackathon", "Business Case", "UI/UX", "Data Science"].map(
							(tag) => (
								<button
									className="rounded-md border border-border bg-card px-3 py-1 text-foreground transition-colors hover:bg-secondary"
									key={tag}
									onClick={() => onTagClick(tag)}
								>
									{tag}
								</button>
							)
						)}
					</div>
				</div>
			</div>
		</section>
	);
}
