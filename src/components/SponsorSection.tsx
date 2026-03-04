"use client";

import { Building2, ExternalLink, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface Sponsor {
	id: string;
	name: string;
	logo: string; // URL or emoji/icon
	description: string;
	website?: string;
	tier?: "platinum" | "gold" | "silver" | "bronze" | "partner";
}

const tierConfig: Record<
	Exclude<Sponsor["tier"], undefined>,
	{ gradient: string; badge: string }
> = {
	platinum: {
		gradient: "from-gray-200 via-gray-100 to-white dark:from-gray-600 dark:via-gray-500 dark:to-gray-400",
		badge: "Platinum",
	},
	gold: {
		gradient: "from-yellow-200 via-yellow-100 to-amber-100 dark:from-yellow-600 dark:via-yellow-500 dark:to-amber-500",
		badge: "Gold",
	},
	silver: {
		gradient: "from-gray-300 via-gray-200 to-gray-100 dark:from-gray-500 dark:via-gray-400 dark:to-gray-300",
		badge: "Silver",
	},
	bronze: {
		gradient: "from-orange-200 via-orange-100 to-amber-100 dark:from-orange-700 dark:via-orange-600 dark:to-amber-600",
		badge: "Bronze",
	},
	partner: {
		gradient: "from-blue-100 via-blue-50 to-cyan-50 dark:from-blue-900 dark:via-blue-800 dark:to-cyan-900",
		badge: "Partner",
	},
};

interface SponsorSectionProps {
	sponsors: Sponsor[];
	title?: string;
	description?: string;
	variant?: "default" | "compact" | "minimal";
	maxLogosPerRow?: number;
	storageKey?: string;
}

const STORAGE_KEY_PREFIX = "sponsor-section-visible";

export function SponsorSection({
	sponsors,
	title = "Our Sponsors",
	description = "Supported by leading organizations",
	variant = "default",
	maxLogosPerRow = 6,
	storageKey = "default",
}: SponsorSectionProps) {
	const [isVisible, setIsVisible] = useState(true);
	const [hoveredSponsor, setHoveredSponsor] = useState<string | null>(null);

	const fullStorageKey = `${STORAGE_KEY_PREFIX}-${storageKey}`;

	// Load visibility state from localStorage
	useEffect(() => {
		const stored = localStorage.getItem(fullStorageKey);
		if (stored !== null) {
			setIsVisible(stored === "true");
		}
	}, [fullStorageKey]);

	// Save visibility state to localStorage
	const toggleVisibility = () => {
		const newValue = !isVisible;
		setIsVisible(newValue);
		localStorage.setItem(fullStorageKey, String(newValue));
	};

	if (!isVisible) {
		return (
			<div className="container py-8">
				<div className="flex items-center justify-center">
					<Button
						onClick={toggleVisibility}
						variant="outline"
						size="sm"
						className="text-muted-foreground hover:text-foreground"
					>
						Show Sponsors
					</Button>
				</div>
			</div>
		);
	}

	if (variant === "minimal") {
		return (
		<section className="py-12 border-t border-border bg-muted/20">
			<div className="container">
				<div className="flex items-center justify-between mb-8">
					<h2 className="text-lg font-semibold text-foreground">{title}</h2>
					<div className="flex items-center gap-2">
						<Button
							onClick={toggleVisibility}
							variant="ghost"
							size="icon"
							className="h-8 w-8 text-muted-foreground hover:text-destructive"
						>
							<X className="h-4 w-4" />
						</Button>
					</div>
				</div>
				<div className="flex flex-wrap justify-center gap-8 md:gap-12">
					{sponsors.map((sponsor) => (
						<div
							key={sponsor.id}
							className="group relative flex flex-col items-center"
							onMouseEnter={() => setHoveredSponsor(sponsor.id)}
							onMouseLeave={() => setHoveredSponsor(null)}
						>
							{/* Logo/Icon */}
							<div className="h-10 w-10 md:h-12 md:w-12 flex items-center justify-center rounded bg-background border border-border shadow-sm group-hover:shadow-md group-hover:scale-110 transition-all duration-300">
								{sponsor.logo.startsWith("http") ? (
									<img
										src={sponsor.logo}
										alt={sponsor.name}
										className="h-6 w-6 md:h-8 md:w-8 object-contain"
									/>
								) : (
									<span className="text-2xl">{sponsor.logo}</span>
								)}
							</div>

							{/* Tooltip */}
							{hoveredSponsor === sponsor.id && (
								<div className="absolute -top-16 left-1/2 -translate-x-1/2 z-50 w-48 md:w-64 p-3 rounded-lg bg-popover text-popover-foreground shadow-lg border border-border text-center">
									<p className="text-sm font-medium">{sponsor.name}</p>
									<p className="text-xs text-muted-foreground mt-1 line-clamp-2">
										{sponsor.description}
									</p>
									{sponsor.website && (
										<a
											href={sponsor.website}
											target="_blank"
											rel="noopener noreferrer"
											className="text-xs text-primary hover:underline mt-1 inline-flex items-center gap-1"
										>
											Visit <ExternalLink className="h-3 w-3" />
										</a>
									)}
								</div>
							)}
						</div>
					))}
				</div>
			</div>
		</section>
	);
	}

	if (variant === "compact") {
		return (
		<section className="py-8 border-t border-border bg-muted/20">
			<div className="container">
				<div className="flex items-center justify-between mb-6">
					<div>
						<h2 className="text-lg font-semibold text-foreground">{title}</h2>
						{description && (
							<p className="text-sm text-muted-foreground">{description}</p>
						)}
					</div>
					<Button
						onClick={toggleVisibility}
						variant="ghost"
						size="icon"
						className="h-8 w-8 text-muted-foreground hover:text-destructive"
					>
						<X className="h-4 w-4" />
					</Button>
				</div>
				<div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
					{sponsors.map((sponsor) => (
						<div
							key={sponsor.id}
							className="group relative"
							onMouseEnter={() => setHoveredSponsor(sponsor.id)}
							onMouseLeave={() => setHoveredSponsor(null)}
						>
							<Card className="h-20 flex items-center justify-center border-border bg-card/50 hover:bg-card hover:shadow-md transition-all duration-300">
								<CardContent className="p-3 flex items-center justify-center">
									{sponsor.logo.startsWith("http") ? (
										<img
											src={sponsor.logo}
											alt={sponsor.name}
											className="h-8 w-8 object-contain"
										/>
									) : (
										<span className="text-2xl">{sponsor.logo}</span>
									)}
								</CardContent>
							</Card>

							{/* Hover Description */}
							{hoveredSponsor === sponsor.id && (
								<div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 w-48 p-3 rounded-lg bg-popover text-popover-foreground shadow-lg border border-border text-center">
									<p className="text-sm font-medium">{sponsor.name}</p>
									<p className="text-xs text-muted-foreground mt-1 line-clamp-3">
										{sponsor.description}
									</p>
								</div>
							)}
						</div>
					))}
				</div>
			</div>
		</section>
	);
	}

	// Default variant - detailed with tier badges
	return (
		<section className="py-16 border-t border-border bg-muted/20">
			<div className="container">
				<div className="flex items-center justify-between mb-8">
					<div className="text-center flex-1">
						<h2 className="text-2xl font-bold text-foreground">{title}</h2>
						{description && (
							<p className="text-muted-foreground mt-2">{description}</p>
						)}
					</div>
					<Button
						onClick={toggleVisibility}
						variant="ghost"
						size="icon"
						className="h-8 w-8 text-muted-foreground hover:text-destructive"
					>
						<X className="h-4 w-4" />
					</Button>
				</div>

				{/* Group sponsors by tier */}
				{(["platinum", "gold", "silver", "bronze", "partner"] as Array<"platinum" | "gold" | "silver" | "bronze" | "partner">)
					.filter((tier) => sponsors.some((s) => s.tier === tier))
					.map((tier) => {
						const tierSponsors = sponsors.filter((s) => s.tier === tier);
						const config = tierConfig[tier];

						return (
							<div key={tier} className="mb-8 last:mb-0">
								<div className="flex items-center justify-center gap-2 mb-4">
									<div className={cn(
										"h-px w-12 bg-gradient-to-r",
										config.gradient
									)} />
									<span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
										{config.badge} Sponsors
									</span>
									<div className={cn(
										"h-px w-12 bg-gradient-to-l",
										config.gradient
									)} />
								</div>

								<div
									className="grid gap-4 justify-center"
									style={{
										gridTemplateColumns: `repeat(${Math.min(tierSponsors.length, maxLogosPerRow)}, minmax(0, 1fr))`,
									}}
								>
									{tierSponsors.map((sponsor) => (
										<div
											key={sponsor.id}
											className="group relative"
											onMouseEnter={() => setHoveredSponsor(sponsor.id)}
											onMouseLeave={() => setHoveredSponsor(null)}
										>
											<Card className="overflow-hidden border-border bg-card/50 hover:shadow-xl transition-all duration-300">
												<div className="p-6">
													{/* Logo */}
													<div className="h-16 flex items-center justify-center mb-4">
														{sponsor.logo.startsWith("http") ? (
															<img
																src={sponsor.logo}
																alt={sponsor.name}
																className="h-12 w-12 object-contain group-hover:scale-110 transition-transform duration-300"
															/>
														) : (
															<span className="text-4xl">{sponsor.logo}</span>
														)}
													</div>

													{/* Description on hover */}
													<div className="text-center">
														<p className="font-semibold text-foreground group-hover:text-primary transition-colors">
															{sponsor.name}
														</p>
														<p className="text-sm text-muted-foreground mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 line-clamp-2">
															{sponsor.description}
														</p>
														{sponsor.website && (
															<a
																href={sponsor.website}
																target="_blank"
																rel="noopener noreferrer"
																className="inline-flex items-center gap-1 text-xs text-primary hover:underline mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
															>
																Website <ExternalLink className="h-3 w-3" />
															</a>
														)}
													</div>
												</div>
											</Card>

											{/* Floating tooltip for very long descriptions */}
											{hoveredSponsor === sponsor.id && sponsor.description.length > 50 && (
												<div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 w-64 p-3 rounded-lg bg-popover text-popover-foreground shadow-xl border border-border">
													<p className="text-sm font-medium">{sponsor.name}</p>
													<p className="text-xs text-muted-foreground mt-1">{sponsor.description}</p>
												</div>
											)}
										</div>
									))}
								</div>
							</div>
						);
					})}
			</div>
		</section>
	);
}
