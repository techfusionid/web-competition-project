import Link from "next/link";
import {
	Instagram,
	Linkedin,
} from "lucide-react";

export function Footer() {
	return (
		<footer className="border-t border-border bg-background">
			<div className="container py-10">
				<div className="flex flex-col md:flex-row md:justify-between gap-8">
					{/* Logo & Description */}
					<div className="md:w-1/3">
						<Link className="flex items-center gap-2" href="/">
							<div className="flex h-8 w-8 items-center justify-center rounded-md bg-foreground">
								<span className="text-xs font-bold text-background">LH</span>
							</div>
							<span className="text-base font-semibold text-foreground">
								LombaHub
							</span>
						</Link>
						<p className="mt-3 text-sm text-muted-foreground max-w-xs">
							One-stop platform to find the best competition and team for you.
						</p>
						{/* Social Media */}
						<div className="mt-4 flex gap-3">
							<a
								className="flex h-8 w-8 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
								href="https://instagram.com"
								rel="noopener noreferrer"
								target="_blank"
							>
								<Instagram className="h-4 w-4" />
							</a>
							<a
								className="flex h-8 w-8 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
								href="https://linkedin.com"
								rel="noopener noreferrer"
								target="_blank"
							>
								<Linkedin className="h-4 w-4" />
							</a>
							<a
								className="flex h-8 w-8 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
								href="https://wa.me/6281234567890"
								rel="noopener noreferrer"
								target="_blank"
							>
								<svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
									<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
								</svg>
							</a>
						</div>
					</div>

					{/* Links Section - Resources, Company, Legal - Aligned Right */}
					<div className="grid grid-cols-3 gap-12 text-right">
						{/* Resources */}
						<div>
							<h3 className="mb-3 text-sm font-semibold text-foreground">Resources</h3>
							<ul className="space-y-2">
								<li>
									<Link className="text-sm text-muted-foreground transition-colors hover:text-foreground" href="/resources">
										Resources
									</Link>
								</li>
								<li>
									<Link className="text-sm text-muted-foreground transition-colors hover:text-foreground" href="/categories">
										Categories
									</Link>
								</li>
								<li>
									<Link className="text-sm text-muted-foreground transition-colors hover:text-foreground" href="/organizer">
										Organizer
									</Link>
								</li>
							</ul>
						</div>

						{/* Company */}
						<div>
							<h3 className="mb-3 text-sm font-semibold text-foreground">Company</h3>
							<ul className="space-y-2">
								<li>
									<Link className="text-sm text-muted-foreground transition-colors hover:text-foreground" href="/about-us">
										About Us
									</Link>
								</li>
								<li>
									<Link className="text-sm text-muted-foreground transition-colors hover:text-foreground" href="/advertise">
										Advertise
									</Link>
								</li>
							</ul>
						</div>

						{/* Legal */}
						<div>
							<h3 className="mb-3 text-sm font-semibold text-foreground">Legal</h3>
							<ul className="space-y-2">
								<li>
									<Link className="text-sm text-muted-foreground transition-colors hover:text-foreground" href="/terms">
										Terms of Service
									</Link>
								</li>
								<li>
									<Link className="text-sm text-muted-foreground transition-colors hover:text-foreground" href="/privacy">
										Privacy Policy
									</Link>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>

			{/* Bottom Bar */}
			<div className="border-t border-border bg-muted/30 py-3">
				<div className="container flex items-center justify-between gap-4 text-xs text-muted-foreground">
					<div className="flex items-center gap-2">
						<span>Built by</span>
						<a
							className="flex items-center gap-1 font-medium text-foreground hover:underline"
							href="https://techfusion.id"
							target="_blank"
							rel="noopener noreferrer"
						>
							<span>Techfusion</span>
						</a>
					</div>
					<div className="text-right">
						<span>Made with ❤️ for competition seekers</span>
					</div>
				</div>
			</div>
		</footer>
	);
}
