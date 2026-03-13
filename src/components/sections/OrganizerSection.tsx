"use client";

import { Building2, Trophy } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchAllOrganizers } from "@/app/actions/competitions";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
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

export function OrganizerSection({
	title = "Organizers",
	description = "Explore competitions by organizer institutions",
	variant = "default",
	limit,
	className,
}: OrganizerSectionProps) {
	const [institutions, setInstitutions] = useState<Institution[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		async function loadOrganizers() {
			setIsLoading(true);
			try {
				const data = await fetchAllOrganizers();
				setInstitutions(data.slice(0, limit ?? data.length));
			} catch (error) {
				console.error("Failed to fetch organizers:", error);
				setInstitutions([]);
			} finally {
				setIsLoading(false);
			}
		}
		loadOrganizers();
	}, [limit]);

	if (variant === "compact") {
		return (
			<section className={cn("space-y-4", className)}>
				{(title || description) && (
					<div className="flex items-center justify-between">
						<div>
							{title && <h2 className="font-semibold text-lg">{title}</h2>}
							{description && (
								<p className="text-muted-foreground text-sm">{description}</p>
							)}
						</div>
						<Link
							className="text-primary text-sm hover:underline"
							href="/organizer"
						>
							View all
						</Link>
					</div>
				)}
				{isLoading ? (
					<div className="py-8 text-center">
						<p className="text-muted-foreground text-sm">
							Loading organizers...
						</p>
					</div>
				) : (
					<div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
						{institutions.map((institution) => (
							<Link
								className="group"
								href={`/organizer/${encodeURIComponent(institution.name)}`}
								key={institution.name}
							>
								<div className="rounded-lg border border-border bg-card/50 p-4 transition-all hover:border-primary/50 hover:bg-card">
									<div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
										<Building2 className="h-5 w-5 text-primary" />
									</div>
									<h3 className="truncate text-center font-medium text-foreground text-sm transition-colors group-hover:text-primary">
										{institution.name}
									</h3>
									<p className="mt-1 text-center text-muted-foreground text-xs">
										{institution.competitionCount} competition
										{institution.competitionCount !== 1 ? "s" : ""}
									</p>
								</div>
							</Link>
						))}
					</div>
				)}
			</section>
		);
	}

	if (variant === "grid") {
		return (
			<section className={cn("space-y-4", className)}>
				{(title || description) && (
					<div className="flex items-center justify-between">
						<div>
							{title && <h2 className="font-semibold text-lg">{title}</h2>}
							{description && (
								<p className="text-muted-foreground text-sm">{description}</p>
							)}
						</div>
						<Link
							className="text-primary text-sm hover:underline"
							href="/organizer"
						>
							View all
						</Link>
					</div>
				)}
				<div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
					{institutions.map((institution) => (
						<Link
							className="group"
							href={`/organizer/${encodeURIComponent(institution.name)}`}
							key={institution.name}
						>
							<Card className="h-full overflow-hidden transition-all hover:border-primary/50 hover:shadow-lg">
								<CardContent className="p-6">
									<div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
										<Building2 className="h-7 w-7 text-primary" />
									</div>
									<h3 className="mb-2 truncate text-center font-semibold text-foreground transition-colors group-hover:text-primary">
										{institution.name}
									</h3>
									<div className="mb-3 flex items-center justify-center gap-1.5 text-muted-foreground text-sm">
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
													className="text-xs"
													key={cat}
													variant="secondary"
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
						{title && <h2 className="font-semibold text-lg">{title}</h2>}
						{description && (
							<p className="text-muted-foreground text-sm">{description}</p>
						)}
					</div>
					<Link
						className="text-primary text-sm hover:underline"
						href="/organizer"
					>
						View all
					</Link>
				</div>
			)}
			{isLoading ? (
				<div className="py-12 text-center">
					<p className="text-muted-foreground text-sm">Loading organizers...</p>
				</div>
			) : (
				<>
					<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
						{institutions.map((institution) => (
							<Link
								href={`/organizer/${encodeURIComponent(institution.name)}`}
								key={institution.name}
							>
								<Card className="h-full transition-all hover:border-primary/50 hover:shadow-md">
									<CardContent className="p-5">
										<div className="flex items-start gap-4">
											<div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
												<Building2 className="h-6 w-6 text-primary" />
											</div>
											<div className="min-w-0 flex-1">
												<h3 className="truncate font-semibold text-foreground">
													{institution.name}
												</h3>
												<div className="mt-1 flex items-center gap-1.5 text-muted-foreground text-sm">
													<Trophy className="h-3.5 w-3.5" />
													<span>
														{institution.competitionCount} competition
														{institution.competitionCount !== 1 ? "s" : ""}
													</span>
												</div>
												<div className="mt-2 flex flex-wrap gap-1">
													{Array.from(institution.categories)
														.slice(0, 3)
														.map((cat) => (
															<Badge
																className="text-xs"
																key={cat}
																variant="secondary"
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

					{institutions.length === 0 && !isLoading && (
						<div className="py-12 text-center">
							<Building2 className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
							<p className="text-muted-foreground">No organizers found</p>
						</div>
					)}
				</>
			)}
		</section>
	);
}
