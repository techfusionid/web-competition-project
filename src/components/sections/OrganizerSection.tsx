import { Building2, Trophy } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { competitions } from "@/data/competitions";
import { cn } from "@/lib/utils";

interface Institution {
	name: string;
	competitionCount: number;
	categories: Set<string>;
}

interface OrganizerSectionProps {
	title?: string;
	description?: string;
	variant?: "default" | "compact" | "grid";
	limit?: number;
	className?: string;
}

function getInstitutions(): Institution[] {
	const institutionMap = new Map<
		string,
		{ name: string; competitionCount: number; categories: Set<string> }
	>();

	competitions.forEach((competition) => {
		if (competition.institutions) {
			competition.institutions.forEach((institution) => {
				if (institutionMap.has(institution)) {
					const existing = institutionMap.get(institution)!;
					existing.competitionCount += 1;
					existing.categories.add(competition.category);
				} else {
					institutionMap.set(institution, {
						name: institution,
						competitionCount: 1,
						categories: new Set([competition.category]),
					});
				}
			});
		}
	});

	return Array.from(institutionMap.values()).sort(
		(a, b) => b.competitionCount - a.competitionCount
	);
}

export function OrganizerSection({
	title = "Organizers",
	description = "Explore competitions by organizer institutions",
	variant = "default",
	limit,
	className,
}: OrganizerSectionProps) {
	const institutions = getInstitutions().slice(0, limit);

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
							href="/organizer"
							className="text-sm text-primary hover:underline"
						>
							View all
						</Link>
					</div>
				)}
				<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
					{institutions.map((institution) => (
						<Link
							href={`/organizer/${encodeURIComponent(institution.name)}`}
							key={institution.name}
							className="group"
						>
							<div className="p-4 rounded-lg border border-border bg-card/50 hover:bg-card transition-all hover:border-primary/50">
								<div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 mb-3 mx-auto">
									<Building2 className="h-5 w-5 text-primary" />
								</div>
								<h3 className="text-sm font-medium text-foreground text-center truncate group-hover:text-primary transition-colors">
									{institution.name}
								</h3>
								<p className="text-xs text-muted-foreground text-center mt-1">
									{institution.competitionCount} competition
									{institution.competitionCount !== 1 ? "s" : ""}
								</p>
							</div>
						</Link>
					))}
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
							href="/organizer"
							className="text-sm text-primary hover:underline"
						>
							View all
						</Link>
					</div>
				)}
				<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
					{institutions.map((institution) => (
						<Link
							href={`/organizer/${encodeURIComponent(institution.name)}`}
							key={institution.name}
							className="group"
						>
							<Card className="h-full transition-all hover:shadow-lg hover:border-primary/50 overflow-hidden">
								<CardContent className="p-6">
									<div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 mb-4 mx-auto">
										<Building2 className="h-7 w-7 text-primary" />
									</div>
									<h3 className="font-semibold text-foreground text-center mb-2 truncate group-hover:text-primary transition-colors">
										{institution.name}
									</h3>
									<div className="flex items-center justify-center gap-1.5 text-sm text-muted-foreground mb-3">
										<Trophy className="h-3.5 w-3.5" />
										<span>
											{institution.competitionCount} competition
											{institution.competitionCount !== 1 ? "s" : ""}
										</span>
									</div>
									<div className="flex flex-wrap justify-center gap-1">
										{Array.from(institution.categories)
											.slice(0, 3)
											.map((cat) => (
												<Badge
													variant="secondary"
													className="text-xs"
													key={cat}
												>
													{cat}
												</Badge>
											))}
									</div>
								</CardContent>
							</Card>
						</Link>
					))}
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
					<Link href="/organizer" className="text-sm text-primary hover:underline">
						View all
					</Link>
				</div>
			)}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
				{institutions.map((institution) => (
					<Link
						href={`/organizer/${encodeURIComponent(institution.name)}`}
						key={institution.name}
					>
						<Card className="h-full transition-all hover:shadow-md hover:border-primary/50">
							<CardContent className="p-5">
								<div className="flex items-start gap-4">
									<div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
										<Building2 className="h-6 w-6 text-primary" />
									</div>
									<div className="flex-1 min-w-0">
										<h3 className="font-semibold text-foreground truncate">
											{institution.name}
										</h3>
										<div className="flex items-center gap-1.5 mt-1 text-sm text-muted-foreground">
											<Trophy className="h-3.5 w-3.5" />
											<span>
												{institution.competitionCount} competition
												{institution.competitionCount !== 1 ? "s" : ""}
											</span>
										</div>
										<div className="flex flex-wrap gap-1 mt-2">
											{Array.from(institution.categories)
												.slice(0, 3)
												.map((cat) => (
													<Badge
														variant="secondary"
														className="text-xs"
														key={cat}
													>
														{cat}
													</Badge>
												))}
										</div>
									</div>
								</div>
							</CardContent>
						</Card>
					</Link>
				))}
			</div>

			{institutions.length === 0 && (
				<div className="text-center py-12">
					<Building2 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
					<p className="text-muted-foreground">No organizers found</p>
				</div>
			)}
		</section>
	);
}
