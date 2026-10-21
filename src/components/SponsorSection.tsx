"use client";

import { ArrowRight, ExternalLink, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
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

// ──────── Sub-components ────────

interface SponsorLogoCellProps {
	sponsor: Sponsor;
	showName?: boolean;
	showExternalIcon?: boolean;
	logoContainerClass?: string;
	logoClass?: string;
	nameClass?: string;
	externalIconClass?: string;
}

/** Repeated logo cell with image/emoji rendering, name, external link icon. */
function SponsorLogoCell({
	sponsor,
	showName = false,
	showExternalIcon = false,
	logoContainerClass = "",
	logoClass = "",
	nameClass = "",
	externalIconClass = "",
}: SponsorLogoCellProps) {
	return (
		<>
			{/* Logo */}
			<div
				className={cn(
					"flex w-full items-center justify-center",
					logoContainerClass
				)}
			>
				{sponsor.logo.startsWith("http") ||
				sponsor.logo.startsWith("data:") ||
				sponsor.logo.startsWith("/") ? (
					<img
						alt={sponsor.name}
						className={cn(
							"cursor-pointer object-contain grayscale transition-transform duration-200 group-hover:scale-105",
							logoClass
						)}
						src={sponsor.logo}
					/>
				) : (
					<span className="text-2xl">{sponsor.logo}</span>
				)}
			</div>

			{/* Sponsor Name */}
			{showName && (
				<p
					className={cn(
						"text-center font-medium text-foreground transition-colors group-hover:text-primary",
						nameClass
					)}
				>
					{sponsor.name}
				</p>
			)}

			{/* External link indicator */}
			{showExternalIcon && sponsor.website && (
				<ExternalLink
					className={cn(
						"text-muted-foreground opacity-0 transition-opacity duration-200 group-hover:opacity-100",
						externalIconClass
					)}
				/>
			)}
		</>
	);
}

interface VariantContentProps {
	sponsors: Sponsor[];
	title: string;
	description: string;
	sponsorCtaLink?: string;
	sponsorCtaText: string;
	toggleVisibility: () => void;
	dismissible: boolean;
	maxLogosPerRow: number;
}

/** Minimal variant – 4×2 grid, 8 slots, no names/external icons/dismiss. */
function MinimalSponsorContent({
	sponsors,
	title,
	description,
	sponsorCtaLink,
	sponsorCtaText,
}: Pick<
	VariantContentProps,
	"sponsors" | "title" | "description" | "sponsorCtaLink" | "sponsorCtaText"
>) {
	return (
		<section className="border-border border-t py-8">
			<div className="container">
				<div className="mx-auto mb-6 max-w-3xl text-center">
					<h2 className="mb-3 font-semibold text-foreground text-xl md:text-2xl">
						{title}
					</h2>
					{description && (
						<p className="mb-5 text-muted-foreground text-sm">{description}</p>
					)}
					{sponsorCtaLink && (
						<Button asChild variant="outline">
							<Link href={sponsorCtaLink}>
								{sponsorCtaText}
								<ArrowRight className="ml-2 h-4 w-4" />
							</Link>
						</Button>
					)}
				</div>

				{/* Table-like grid layout - 4 columns x 2 rows */}
				<div className="mx-auto max-w-4xl overflow-visible rounded-lg border border-border bg-card">
					<div className="grid grid-cols-4 grid-rows-2 divide-x divide-y divide-border">
						{/* Render sponsors */}
						{sponsors.slice(0, 8).map((sponsor) => (
							<Tooltip key={sponsor.id}>
								<TooltipTrigger asChild>
									<a
										className="group flex cursor-pointer flex-col items-center justify-center p-4 transition-colors duration-200 hover:bg-muted/50"
										href={sponsor.website || "#"}
										rel={sponsor.website ? "noopener noreferrer" : undefined}
										target={sponsor.website ? "_blank" : undefined}
									>
										<SponsorLogoCell
											logoClass="h-8 w-auto max-w-[60px]"
											logoContainerClass="h-10"
											sponsor={sponsor}
										/>
									</a>
								</TooltipTrigger>
								<SponsorTooltip sponsor={sponsor} />
							</Tooltip>
						))}
						{/* Empty slots to fill 8 total */}
						{Array.from({ length: Math.max(0, 8 - sponsors.length) }).map(
							(_, i) => (
								<div
									className="flex items-center justify-center p-4"
									key={`empty-${i}`}
								/>
							)
						)}
					</div>
				</div>
			</div>
		</section>
	);
}

/** Compact variant – responsive grid with names always visible. */
function CompactSponsorContent({
	sponsors,
	title,
	description,
	sponsorCtaLink,
	sponsorCtaText,
	dismissible,
	toggleVisibility,
}: VariantContentProps) {
	return (
		<section className="border-border border-t py-8">
			<div className="container">
				<div className="mb-6 flex items-center justify-between">
					<div className="flex-1">
						<h2 className="font-semibold text-foreground text-lg">{title}</h2>
						{description && (
							<p className="text-muted-foreground text-sm">{description}</p>
						)}
					</div>
					<div className="flex items-center gap-2">
						{sponsorCtaLink && (
							<Button asChild variant="outline">
								<Link href={sponsorCtaLink}>
									{sponsorCtaText}
									<ArrowRight className="ml-2 h-4 w-4" />
								</Link>
							</Button>
						)}
						{dismissible && (
							<Button
								aria-label="Dismiss sponsor"
								className="h-8 w-8 text-muted-foreground hover:text-destructive"
								onClick={toggleVisibility}
								size="icon"
								variant="ghost"
							>
								<X className="h-4 w-4" />
							</Button>
						)}
					</div>
				</div>

				{/* Table-like grid layout */}
				<div className="rounded-lg border border-border bg-card">
					<div className="grid grid-cols-3 divide-x divide-y divide-border sm:grid-cols-4 md:grid-cols-6">
						{sponsors.map((sponsor) => (
							<Tooltip key={sponsor.id}>
								<TooltipTrigger asChild>
									<a
										className="group flex cursor-pointer flex-col items-center justify-center p-4 transition-colors duration-200 hover:bg-muted/50"
										href={sponsor.website || "#"}
										rel={sponsor.website ? "noopener noreferrer" : undefined}
										target={sponsor.website ? "_blank" : undefined}
									>
										<SponsorLogoCell
											logoClass="h-8 w-auto max-w-[80px]"
											logoContainerClass="mb-2 h-10"
											nameClass="line-clamp-1 text-xs"
											showName
											sponsor={sponsor}
										/>
									</a>
								</TooltipTrigger>
								{sponsor.description && <SponsorTooltip sponsor={sponsor} />}
							</Tooltip>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}

/** Default variant – tier-grouped with badges, names, external link indicators. */
function DefaultSponsorContent({
	sponsors,
	title,
	description,
	sponsorCtaLink,
	sponsorCtaText,
	dismissible,
	toggleVisibility,
	maxLogosPerRow,
}: VariantContentProps) {
	return (
		<section className="border-border border-t py-16">
			<div className="container">
				<div className="mb-10 flex flex-col items-center">
					<div className="text-center">
						<h2 className="font-bold text-2xl text-foreground">{title}</h2>
						{description && (
							<p className="mt-2 text-muted-foreground">{description}</p>
						)}
					</div>
					<div className="mt-4 flex items-center gap-3">
						{sponsorCtaLink && (
							<Button asChild variant="outline">
								<Link href={sponsorCtaLink}>
									{sponsorCtaText}
									<ArrowRight className="ml-2 h-4 w-4" />
								</Link>
							</Button>
						)}
						{dismissible && (
							<Button
								aria-label="Dismiss sponsor"
								className="h-8 w-8 text-muted-foreground hover:text-destructive"
								onClick={toggleVisibility}
								size="icon"
								variant="ghost"
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
							<div className="mb-10 last:mb-0" key={tier}>
								<div className="mb-6 flex items-center justify-center gap-3">
									<div
										className={cn(
											"h-px w-16 bg-gradient-to-r",
											config.gradient
										)}
									/>
									<span className="font-bold text-foreground text-sm uppercase tracking-wider">
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
								<div className="rounded-lg border border-border bg-card">
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
														className="group flex cursor-pointer flex-col items-center justify-center p-6 transition-colors duration-200 hover:bg-muted/50 md:p-8"
														href={sponsor.website || "#"}
														rel={
															sponsor.website
																? "noopener noreferrer"
																: undefined
														}
														target={sponsor.website ? "_blank" : undefined}
													>
														<SponsorLogoCell
															externalIconClass="mt-1 h-3.5 w-3.5"
															logoClass="h-14 w-auto max-w-[120px] rounded-xl md:h-18"
															logoContainerClass="mb-3 h-20 md:h-24"
															nameClass="text-sm md:text-base"
															showExternalIcon
															showName
															sponsor={sponsor}
														/>
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
}

// Hoisted outside component to avoid recreation on each render
function SponsorTooltip({ sponsor }: { sponsor: Sponsor }) {
	return (
		<TooltipContent
			arrowClassName="bg-slate-900 dark:bg-slate-50 fill-slate-900 dark:fill-slate-50 border-r border-b border-slate-700 dark:border-slate-200"
			className="fade-in-0 zoom-in-95 animate-in rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-white shadow-xl backdrop-blur-sm dark:border-slate-200 dark:bg-slate-50 dark:text-slate-900"
			side="bottom"
			sideOffset={8}
		>
			{sponsor.description && (
				<p className="text-center text-slate-300 text-xs dark:text-slate-600">
					{sponsor.description}
				</p>
			)}
		</TooltipContent>
	);
}

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
		if (!dismissible) {
			return;
		}

		const stored = localStorage.getItem(fullStorageKey);
		if (stored !== null) {
			setIsVisible(stored === "true");
		}
	}, [dismissible, fullStorageKey]);

	// Save visibility state to localStorage (only when dismissible)
	const toggleVisibility = () => {
		if (!dismissible) {
			return;
		}

		const newValue = !isVisible;
		setIsVisible(newValue);
		localStorage.setItem(fullStorageKey, String(newValue));
	};

	if (dismissible && !isVisible) {
		return (
			<div className="container py-8">
				<div className="flex items-center justify-center">
					<Button
						className="text-muted-foreground hover:text-foreground"
						onClick={toggleVisibility}
						size="sm"
						variant="outline"
					>
						Show Sponsors
					</Button>
				</div>
			</div>
		);
	}

	let content;

	if (variant === "minimal") {
		content = (
			<MinimalSponsorContent
				description={description}
				sponsorCtaLink={sponsorCtaLink}
				sponsorCtaText={sponsorCtaText}
				sponsors={sponsors}
				title={title}
			/>
		);
	} else if (variant === "compact") {
		content = (
			<CompactSponsorContent
				description={description}
				dismissible={dismissible}
				maxLogosPerRow={maxLogosPerRow}
				sponsorCtaLink={sponsorCtaLink}
				sponsorCtaText={sponsorCtaText}
				sponsors={sponsors}
				title={title}
				toggleVisibility={toggleVisibility}
			/>
		);
	} else {
		content = (
			<DefaultSponsorContent
				description={description}
				dismissible={dismissible}
				maxLogosPerRow={maxLogosPerRow}
				sponsorCtaLink={sponsorCtaLink}
				sponsorCtaText={sponsorCtaText}
				sponsors={sponsors}
				title={title}
				toggleVisibility={toggleVisibility}
			/>
		);
	}

	return <TooltipProvider delayDuration={200}>{content}</TooltipProvider>;
}
