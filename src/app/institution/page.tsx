import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { competitions } from "@/data/competitions";
import { Building2, Trophy } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

// Extract unique institutions from competitions
function getInstitutions() {
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
		(a, b) => b.competitionCount - a.competitionCount,
	);
}

export default function InstitutionsPage() {
	const institutions = getInstitutions();

	return (
		<div className="min-h-screen flex flex-col bg-background">
			<Header />

			<main className="flex-1 container py-8">
				<div className="mb-8">
					<h1 className="text-3xl font-bold text-foreground mb-2">Institusi</h1>
					<p className="text-muted-foreground">
						Jelajahi kompetisi berdasarkan institusi penyelenggara
					</p>
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
					{institutions.map((institution) => (
						<Link
							key={institution.name}
							href={`/institution/${encodeURIComponent(institution.name)}`}
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
												<span>{institution.competitionCount} kompetisi</span>
											</div>
											<div className="flex flex-wrap gap-1 mt-2">
												{Array.from(institution.categories)
													.slice(0, 3)
													.map((cat) => (
														<span
															key={cat}
															className="inline-flex items-center rounded-full bg-secondary px-2 py-0.5 text-xs text-secondary-foreground"
														>
															{cat}
														</span>
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
						<p className="text-muted-foreground">
							Belum ada institusi terdaftar
						</p>
					</div>
				)}
			</main>

			<Footer />
		</div>
	);
}
