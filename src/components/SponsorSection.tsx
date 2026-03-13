"use client";

import Link from "next/link";
import { ArrowRight, ExternalLink, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
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
		gradient:
			"from-gray-200 via-gray-100 to-white dark:from-gray-600 dark:via-gray-500 dark:to-gray-400",
		badge: "Platinum",
	},
	gold: {
		gradient:
			"from-yellow-200 via-yellow-100 to-amber-100 dark:from-yellow-600 dark:via-yellow-500 dark:to-amber-500",
		badge: "Gold",
	},
	silver: {
		gradient:
			"from-gray-300 via-gray-200 to-gray-100 dark:from-gray-500 dark:via-gray-400 dark:to-gray-300",
		badge: "Silver",
	},
	bronze: {
		gradient:
			"from-orange-200 via-orange-100 to-amber-100 dark:from-orange-700 dark:via-orange-600 dark:to-amber-600",
		badge: "Bronze",
	},
	partner: {
		gradient:
			"from-blue-100 via-blue-50 to-cyan-50 dark:from-blue-900 dark:via-blue-800 dark:to-cyan-900",
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
	/**
	 * When false, the section is always visible and cannot be dismissed.
	 * (No localStorage persistence, no close button, no "Show Sponsors" state.)
	 */
	dismissible?: boolean;
	sponsorCtaLink?: string;
	sponsorCtaText?: string;
}

const STORAGE_KEY_PREFIX = "sponsor-section-visible";

export function SponsorSection({
	sponsors,
	title = "Our Sponsors",
	description = "Supported by leading organizations",
	variant = "default",
	maxLogosPerRow = 6,
	storageKey = "default",
	dismissible = true,
	sponsorCtaLink,
	sponsorCtaText = "Become a sponsor",
}: SponsorSectionProps) {
	const [isVisible, setIsVisible] = useState(true);

	const fullStorageKey = `${STORAGE_KEY_PREFIX}-${storageKey}`;

	// Load visibility state from localStorage (only when dismissible)
	useEffect(() => {
		if (!dismissible) return;

		const stored = localStorage.getItem(fullStorageKey);
		if (stored !== null) {
			setIsVisible(stored === "true");
		}
	}, [dismissible, fullStorageKey]);

	// Save visibility state to localStorage (only when dismissible)
	const toggleVisibility = () => {
		if (!dismissible) return;

		const newValue = !isVisible;
		setIsVisible(newValue);
		localStorage.setItem(fullStorageKey, String(newValue));
	};

	if (dismissible && !isVisible) {
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

	// Common tooltip content component
	const SponsorTooltip = ({ sponsor }: { sponsor: Sponsor }) => (
		<TooltipContent
			side="bottom"
			sideOffset={8}
			className="bg-slate-900 dark:bg-slate-50 backdrop-blur-sm text-white dark:text-slate-900 border border-slate-700 dark:border-slate-200 shadow-xl rounded-lg px-3 py-2 max-w-48 animate-in fade-in-0 zoom-in-95"
			arrowClassName="bg-slate-900 dark:bg-slate-50 fill-slate-900 dark:fill-slate-50 border-r border-b border-slate-700 dark:border-slate-200"
		>
			<p className="text-sm font-medium text-center">{sponsor.name}</p>
			{sponsor.description && (
				<p className="text-xs text-slate-300 dark:text-slate-600 mt-1 line-clamp-2 text-center">
					{sponsor.description}
				</p>
			)}
			{sponsor.website && (
				<span className="text-xs text-sky-400 dark:text-sky-600 inline-flex items-center gap-1 justify-center mt-1.5 w-full">
					Visit <ExternalLink className="h-3 w-3" />
				</span>
			)}
		</TooltipContent>
	);

	const content = (() => {
		if (variant === "minimal") {
			return (
				<section className="py-8 border-t border-border">
					<div className="container">
						<div className="max-w-3xl mx-auto text-center mb-6">
							<h2 className="text-xl md:text-2xl font-semibold text-foreground mb-3">
								{title}
							</h2>
							{description && (
								<p className="text-sm text-muted-foreground mb-5">
									{description}
								</p>
							)}
							{sponsorCtaLink && (
								<Button variant="outline" asChild>
									<Link href={sponsorCtaLink}>
										{sponsorCtaText}
										<ArrowRight className="ml-2 h-4 w-4" />
									</Link>
								</Button>
							)}
						</div>

						{/* Table-like grid layout - 4 columns x 2 rows */}
						<div className="border border-border rounded-lg bg-card max-w-4xl mx-auto overflow-visible">
							<div className="grid grid-cols-4 grid-rows-2 divide-x divide-y divide-border">
								{/* Render sponsors */}
								{sponsors.slice(0, 8).map((sponsor) => (
									<Tooltip key={sponsor.id}>
										<TooltipTrigger asChild>
											<a
												href={sponsor.website || "#"}
												target={sponsor.website ? "_blank" : undefined}
												rel={
													sponsor.website ? "noopener noreferrer" : undefined
												}
												className="group flex flex-col items-center justify-center p-4 hover:bg-muted/50 transition-colors duration-200"
											>
												{/* Logo */}
												<div className="h-10 w-full flex items-center justify-center">
													{sponsor.logo.startsWith("http") ||
													sponsor.logo.startsWith("data:") ? (
														<img
															src={sponsor.logo}
															alt={sponsor.name}
															className="h-8 w-auto max-w-[60px] object-contain group-hover:scale-105 transition-transform duration-200"
														/>
													) : (
														<span className="text-2xl">{sponsor.logo}</span>
													)}
												</div>
											</a>
										</TooltipTrigger>
										<SponsorTooltip sponsor={sponsor} />
									</Tooltip>
								))}
								{/* Empty slots to fill 8 total */}
								{Array.from({ length: Math.max(0, 8 - sponsors.length) }).map(
									(_, i) => (
										<div
											key={`empty-${i}`}
											className="flex items-center justify-center p-4"
										/>
									)
								)}
							</div>
						</div>
					</div>
				</section>
			);
		}

		if (variant === "compact") {
			return (
				<section className="py-8 border-t border-border">
					<div className="container">
						<div className="flex items-center justify-between mb-6">
							<div className="flex-1">
								<h2 className="text-lg font-semibold text-foreground">
									{title}
								</h2>
								{description && (
									<p className="text-sm text-muted-foreground">{description}</p>
								)}
							</div>
							<div className="flex items-center gap-2">
								{sponsorCtaLink && (
									<Button variant="outline" asChild>
										<Link href={sponsorCtaLink}>
											{sponsorCtaText}
											<ArrowRight className="ml-2 h-4 w-4" />
										</Link>
									</Button>
								)}
								{dismissible && (
									<Button
										onClick={toggleVisibility}
										variant="ghost"
										size="icon"
										className="h-8 w-8 text-muted-foreground hover:text-destructive"
									>
										<X className="h-4 w-4" />
									</Button>
								)}
							</div>
						</div>

						{/* Table-like grid layout */}
						<div className="border border-border rounded-lg bg-card">
							<div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 divide-x divide-y divide-border">
								{sponsors.map((sponsor) => (
									<Tooltip key={sponsor.id}>
										<TooltipTrigger asChild>
											<a
												href={sponsor.website || "#"}
												target={sponsor.website ? "_blank" : undefined}
												rel={
													sponsor.website ? "noopener noreferrer" : undefined
												}
												className="group flex flex-col items-center justify-center p-4 hover:bg-muted/50 transition-colors duration-200"
											>
												{/* Logo */}
												<div className="h-10 w-full flex items-center justify-center mb-2">
													{sponsor.logo.startsWith("http") ||
													sponsor.logo.startsWith("data:") ? (
														<img
															src={sponsor.logo}
															alt={sponsor.name}
															className="h-8 w-auto max-w-[80px] object-contain group-hover:scale-105 transition-transform duration-200"
														/>
													) : (
														<span className="text-2xl">{sponsor.logo}</span>
													)}
												</div>

												{/* Sponsor Name - always visible */}
												<p className="text-xs font-medium text-foreground text-center line-clamp-1 group-hover:text-primary transition-colors">
													{sponsor.name}
												</p>
											</a>
										</TooltipTrigger>
										{sponsor.description && (
											<SponsorTooltip sponsor={sponsor} />
										)}
									</Tooltip>
								))}
							</div>
						</div>
					</div>
				</section>
			);
		}

		// Default variant - detailed with tier badges
		return (
			<section className="py-16 border-t border-border">
				<div className="container">
					<div className="flex flex-col items-center mb-10">
						<div className="text-center">
							<h2 className="text-2xl font-bold text-foreground">{title}</h2>
							{description && (
								<p className="text-muted-foreground mt-2">{description}</p>
							)}
						</div>
						<div className="flex items-center gap-3 mt-4">
							{sponsorCtaLink && (
								<Button variant="outline" asChild>
									<Link href={sponsorCtaLink}>
										{sponsorCtaText}
										<ArrowRight className="ml-2 h-4 w-4" />
									</Link>
								</Button>
							)}
							{dismissible && (
								<Button
									onClick={toggleVisibility}
									variant="ghost"
									size="icon"
									className="h-8 w-8 text-muted-foreground hover:text-destructive"
								>
									<X className="h-4 w-4" />
								</Button>
							)}
						</div>
					</div>

					{/* Group sponsors by tier */}
					{(
						["platinum", "gold", "silver", "bronze", "partner"] as Array<
							"platinum" | "gold" | "silver" | "bronze" | "partner"
						>
					)
						.filter((tier) => sponsors.some((s) => s.tier === tier))
						.map((tier) => {
							const tierSponsors = sponsors.filter((s) => s.tier === tier);
							const config = tierConfig[tier];

							return (
								<div key={tier} className="mb-10 last:mb-0">
									<div className="flex items-center justify-center gap-3 mb-6">
										<div
											className={cn(
												"h-px w-16 bg-gradient-to-r",
												config.gradient
											)}
										/>
										<span className="text-sm font-bold uppercase tracking-wider text-foreground">
											{config.badge}
										</span>
										<div
											className={cn(
												"h-px w-16 bg-gradient-to-l",
												config.gradient
											)}
										/>
									</div>

									{/* Table-like grid layout */}
									<div className="border border-border rounded-lg bg-card">
										<div
											className="grid divide-x divide-y divide-border bg-card"
											style={{
												gridTemplateColumns: `repeat(${Math.min(tierSponsors.length, maxLogosPerRow)}, minmax(0, 1fr))`,
											}}
										>
											{tierSponsors.map((sponsor) => (
												<Tooltip key={sponsor.id}>
													<TooltipTrigger asChild>
														<a
															href={sponsor.website || "#"}
															target={sponsor.website ? "_blank" : undefined}
															rel={
																sponsor.website
																	? "noopener noreferrer"
																	: undefined
															}
															className="group flex flex-col items-center justify-center p-6 md:p-8 hover:bg-muted/50 transition-colors duration-200"
														>
															{/* Logo */}
															<div className="h-16 md:h-20 w-full flex items-center justify-center mb-3">
																{sponsor.logo.startsWith("http") ||
																sponsor.logo.startsWith("data:") ? (
																	<img
																		src={sponsor.logo}
																		alt={sponsor.name}
																		className="h-12 md:h-16 w-auto max-w-[120px] object-contain group-hover:scale-105 transition-transform duration-200"
																	/>
																) : (
																	<span className="text-4xl md:text-5xl">
																		{sponsor.logo}
																	</span>
																)}
															</div>

															{/* Sponsor Name - always visible */}
															<p className="text-sm md:text-base font-semibold text-foreground text-center group-hover:text-primary transition-colors">
																{sponsor.name}
															</p>

															{/* External link indicator */}
															{sponsor.website && (
																<ExternalLink className="h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-200 mt-1" />
															)}
														</a>
													</TooltipTrigger>
													{sponsor.description && (
														<SponsorTooltip sponsor={sponsor} />
													)}
												</Tooltip>
											))}
										</div>
									</div>
								</div>
							);
						})}
				</div>
			</section>
		);
	})();

	return <TooltipProvider delayDuration={200}>{content}</TooltipProvider>;
}
