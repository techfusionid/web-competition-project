import {
	Briefcase,
	Heart,
	type LucideIcon,
	MessageSquare,
	Microscope,
	Monitor,
	Music,
	Palette,
	PenTool,
	Trophy as TrophyIcon,
} from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { competitions } from "@/data/competitions";
import { CATEGORIES } from "@/types/competition";
import { cn } from "@/lib/utils";

// Map categories to icons and colors
const categoryConfig: Record<
	string,
	{ icon: LucideIcon; gradient: string; color: string; image: string }
> = {
	Technology: {
		icon: Monitor,
		gradient: "from-blue-600/20 via-cyan-500/10 to-transparent",
		color: "text-blue-500",
		image:
			"https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&h=300&fit=crop",
	},
	Business: {
		icon: Briefcase,
		gradient: "from-emerald-600/20 via-green-500/10 to-transparent",
		color: "text-emerald-500",
		image:
			"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=300&fit=crop",
	},
	Science: {
		icon: Microscope,
		gradient: "from-purple-600/20 via-violet-500/10 to-transparent",
		color: "text-purple-500",
		image:
			"https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=1200&h=300&fit=crop",
	},
	Design: {
		icon: Palette,
		gradient: "from-pink-600/20 via-rose-500/10 to-transparent",
		color: "text-pink-500",
		image:
			"https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&h=300&fit=crop",
	},
	Writing: {
		icon: PenTool,
		gradient: "from-orange-600/20 via-amber-500/10 to-transparent",
		color: "text-orange-500",
		image:
			"https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1200&h=300&fit=crop",
	},
	Debate: {
		icon: MessageSquare,
		gradient: "from-yellow-600/20 via-amber-500/10 to-transparent",
		color: "text-yellow-500",
		image:
			"https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1200&h=300&fit=crop",
	},
	Sports: {
		icon: TrophyIcon,
		gradient: "from-red-600/20 via-orange-500/10 to-transparent",
		color: "text-red-500",
		image:
			"https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1200&h=300&fit=crop",
	},
	Art: {
		icon: Music,
		gradient: "from-indigo-600/20 via-purple-500/10 to-transparent",
		color: "text-indigo-500",
		image:
			"https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=1200&h=300&fit=crop",
	},
	Social: {
		icon: Heart,
		gradient: "from-rose-600/20 via-pink-500/10 to-transparent",
		color: "text-rose-500",
		image:
			"https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1200&h=300&fit=crop",
	},
};

const categoryDescriptions: Record<string, string> = {
	Technology:
		"Technology competitions, programming, and digital innovation to sharpen your technical skills.",
	Business:
		"Business competitions, entrepreneurship, and case competitions for young entrepreneurs.",
	Science:
		"Science competitions, research, and olympiads for knowledge lovers.",
	Design: "Graphic design, UI/UX, and visual creativity competitions.",
	Writing: "Writing, essay, and academic writing competitions.",
	Debate: "Debate, public speaking, and argumentation competitions.",
	Sports: "Sports and e-sports competitions.",
	Art: "Music, dance, and performance art competitions.",
	Social: "Social, volunteer, and community service competitions.",
};

interface CategorySectionProps {
	title?: string;
	description?: string;
	variant?: "default" | "compact" | "grid" | "list";
	showCount?: boolean;
	limit?: number;
	className?: string;
}

export function CategorySection({
	title = "Categories",
	description = "Explore competitions by categories you're interested in",
	variant = "default",
	showCount = true,
	limit,
	className,
}: CategorySectionProps) {
	const categoryMap = new Map<string, number>();

	CATEGORIES.forEach((cat) => {
		categoryMap.set(cat, 0);
	});

	competitions.forEach((competition) => {
		const count = categoryMap.get(competition.category) || 0;
		categoryMap.set(competition.category, count + 1);
	});

	const categories = CATEGORIES.map((cat) => ({
		name: cat,
		count: categoryMap.get(cat) || 0,
		config: categoryConfig[cat] || {
			icon: Monitor,
			color: "text-primary",
			gradient: "from-primary/20 via-primary/10 to-transparent",
			image: "",
		},
	}))
		.filter((cat) => limit === undefined || cat.count > 0)
		.slice(0, limit)
		.sort((a, b) => b.count - a.count);

	const CategoryIcon = (name: string) => {
		const config = categoryConfig[name];
		return config?.icon || Monitor;
	};

	if (variant === "compact") {
		return (
			<section className={cn("space-y-4", className)}>
				{(title || description) && (
					<div className="flex items-center justify-between">
						<div>
							{title && <h2 className="text-lg font-semibold">{title}</h2>}
							{description && (
								<p className="text-sm text-muted-foreground">{description}</p>
							)}
						</div>
						<Link
							href="/category"
							className="text-sm text-primary hover:underline"
						>
							View all
						</Link>
					</div>
				)}
				<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
					{categories.map((category) => {
						const Icon = CategoryIcon(category.name);
						return (
							<Link
								href={`/category/${encodeURIComponent(category.name)}`}
								key={category.name}
								className="group"
							>
								<div className="flex flex-col items-center gap-2 p-4 rounded-lg border border-border bg-card/50 hover:bg-card transition-all hover:border-primary/50">
									<div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
										<Icon
											className={cn(
												"h-5 w-5",
												categoryConfig[category.name]?.color ||
													"text-primary"
											)}
										/>
									</div>
									<div className="text-center">
										<h3 className="text-sm font-medium group-hover:text-primary transition-colors">
											{category.name}
										</h3>
										{showCount && (
											<p className="text-xs text-muted-foreground">
												{category.count}
											</p>
										)}
									</div>
								</div>
							</Link>
						);
					})}
				</div>
			</section>
		);
	}

	if (variant === "grid") {
		return (
			<section className={cn("space-y-4", className)}>
				{(title || description) && (
					<div className="flex items-center justify-between">
						<div>
							{title && <h2 className="text-lg font-semibold">{title}</h2>}
							{description && (
								<p className="text-sm text-muted-foreground">{description}</p>
							)}
						</div>
						<Link
							href="/category"
							className="text-sm text-primary hover:underline"
						>
							View all
						</Link>
					</div>
				)}
				<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
					{categories.map((category) => {
						const Icon = CategoryIcon(category.name);
						return (
							<Link
								href={`/category/${encodeURIComponent(category.name)}`}
								key={category.name}
								className="group"
							>
								<div className="relative overflow-hidden rounded-xl border border-border bg-card transition-all hover:shadow-lg hover:border-primary/50">
									<div
										className={cn(
											"absolute inset-0 bg-gradient-to-br",
											category.config.gradient
										)}
									/>
									<div className="relative p-6">
										<div className="flex h-12 w-12 items-center justify-center rounded-xl bg-background/80 backdrop-blur mb-4">
											<Icon
												className={cn(
													"h-6 w-6",
													category.config.color
												)}
											/>
										</div>
										<h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
											{category.name}
										</h3>
										{showCount && (
											<p className="text-sm text-muted-foreground">
												{category.count} competition
												{category.count !== 1 ? "s" : ""}
											</p>
										)}
									</div>
								</div>
							</Link>
						);
					})}
				</div>
			</section>
		);
	}

	// Default variant (list)
	return (
		<section className={cn("space-y-4", className)}>
			{(title || description) && (
				<div className="flex items-center justify-between">
					<div>
						{title && <h2 className="text-lg font-semibold">{title}</h2>}
						{description && (
							<p className="text-sm text-muted-foreground">{description}</p>
						)}
					</div>
					<Link href="/category" className="text-sm text-primary hover:underline">
						View all
					</Link>
				</div>
			)}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
				{categories.map((category) => {
					const Icon = CategoryIcon(category.name);
					return (
						<Link
							href={`/category/${encodeURIComponent(category.name)}`}
							key={category.name}
						>
							<Card className="h-full transition-all hover:shadow-md hover:border-primary/50">
								<CardContent className="p-5">
									<div className="flex items-center gap-4">
										<div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-secondary">
											<Icon
												className={cn(
													"h-6 w-6",
													categoryConfig[category.name]?.color ||
														"text-primary"
												)}
											/>
										</div>
										<div className="flex-1 min-w-0">
											<h3 className="font-semibold text-foreground">
												{category.name}
											</h3>
											{showCount && (
												<p className="text-sm text-muted-foreground">
													{category.count} competition
													{category.count !== 1 ? "s" : ""}
												</p>
											)}
										</div>
									</div>
								</CardContent>
							</Card>
						</Link>
					);
				})}
			</div>
		</section>
	);
}
