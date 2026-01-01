import Link from "next/link";

export function Footer() {
	return (
		<footer className="border-t border-border bg-background">
			<div className="container py-6">
				<div className="flex flex-col items-center justify-between gap-6 md:flex-row md:gap-0">
					{/* Logo */}
					<Link className="flex items-center gap-2" href="/">
						<div className="flex h-8 w-8 items-center justify-center rounded-md bg-foreground">
							<span className="text-xs font-bold text-background">LH</span>
						</div>
						<span className="text-base font-semibold text-foreground">
							LombaHub
						</span>
					</Link>
					...
					{/* Nav Links */}
					<nav className="flex flex-wrap items-center justify-center gap-6">
						<Link
							className="text-sm text-muted-foreground hover:text-foreground transition-colors"
							href="/"
						>
							Beranda
						</Link>
						<Link
							className="text-sm text-muted-foreground hover:text-foreground transition-colors"
							href="/category"
						>
							Kategori
						</Link>
						<Link
							className="text-sm text-muted-foreground hover:text-foreground transition-colors"
							href="/submit"
						>
							Submit Lomba
						</Link>
					</nav>
					<p className="text-xs text-muted-foreground">
						© 2024 LombaHub. All rights reserved.
					</p>
				</div>
			</div>
		</footer>
	);
}
