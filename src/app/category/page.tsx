import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { competitions } from "@/data/competitions";
import {
	Monitor,
	Briefcase,
	Microscope,
	Palette,
	PenTool,
	MessageSquare,
	Trophy as TrophyIcon,
	Music,
	Heart,
	LucideIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { CATEGORIES } from "@/types/competition";

// Map categories to icons and colors
const categoryConfig: Record<string, { icon: LucideIcon; color: string }> = {
	Teknologi: { icon: Monitor, color: "text-blue-500" },
	Bisnis: { icon: Briefcase, color: "text-emerald-500" },
	Sains: { icon: Microscope, color: "text-purple-500" },
	Desain: { icon: Palette, color: "text-pink-500" },
	Penulisan: { icon: PenTool, color: "text-orange-500" },
	Debat: { icon: MessageSquare, color: "text-yellow-500" },
	Olahraga: { icon: TrophyIcon, color: "text-red-500" },
	Seni: { icon: Music, color: "text-indigo-500" },
	Sosial: { icon: Heart, color: "text-rose-500" },
};

function getCategoryStats() {
	const categoryMap = new Map<string, number>();

	CATEGORIES.forEach((cat) => {
		categoryMap.set(cat, 0);
	});

	competitions.forEach((competition) => {
		const count = categoryMap.get(competition.category) || 0;
		categoryMap.set(competition.category, count + 1);
	});

	return CATEGORIES.map((cat) => ({
		name: cat,
		count: categoryMap.get(cat) || 0,
		config: categoryConfig[cat] || { icon: Monitor, color: "text-primary" },
	}));
}

export default function CategoriesPage() {
	const categories = getCategoryStats();

	return (
		<div className="min-h-screen flex flex-col bg-background">
			<Header />

			<main className="flex-1 container py-8">
				<div className="mb-8">
					<h1 className="text-3xl font-bold text-foreground mb-2">Kategori</h1>
					<p className="text-muted-foreground">
						Jelajahi kompetisi berdasarkan kategori yang kamu minati
					</p>
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
					{categories.map((category) => {
						const IconComponent = category.config.icon;
						return (
							<Link
								key={category.name}
								href={`/category/${encodeURIComponent(category.name)}`}
							>
								<Card className="h-full transition-all hover:shadow-md hover:border-primary/50">
									<CardContent className="p-5">
										<div className="flex items-center gap-4">
											<div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-secondary">
												<IconComponent
													className={`h-6 w-6 ${category.config.color}`}
												/>
											</div>
											<div className="flex-1 min-w-0">
												<h3 className="font-semibold text-foreground">
													{category.name}
												</h3>
												<p className="text-sm text-muted-foreground">
													{category.count} kompetisi
												</p>
											</div>
										</div>
									</CardContent>
								</Card>
							</Link>
						);
					})}
				</div>
			</main>

			<Footer />
		</div>
	);
}
