"use client";

import { useState, useMemo, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { competitions } from "@/data/competitions";
import { CompetitionCardPoster } from "@/components/CompetitionCardPoster";
import { CompetitionCard } from "@/components/CompetitionCard";
import { CompetitionDialog } from "@/components/CompetitionDialog";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import {
	Trophy,
	Plus,
	Rss,
	Monitor,
	Briefcase,
	Microscope,
	Palette,
	PenTool,
	MessageSquare,
	Music,
	Heart,
	LucideIcon,
	LayoutGrid,
	List,
	X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBookmarks } from "@/hooks/useBookmarks";
import { cn } from "@/lib/utils";

type ViewMode = "card" | "list";

const COMPETITION_TYPES = [
	"UI/UX Design",
	"Hackathon",
	"Competitive Programming",
	"CTF",
	"Data Science",
	"Mobile Development",
	"Web Development",
	"IoT",
	"Game Development",
	"AI/ML",
	"Business Case",
	"Startup Pitch",
	"Essay",
	"Poster",
	"Video",
	"Research",
];

const categoryConfig: Record<
	string,
	{ icon: LucideIcon; gradient: string; color: string }
> = {
	Teknologi: {
		icon: Monitor,
		gradient: "from-blue-600/20 via-cyan-500/10 to-transparent",
		color: "text-blue-500",
	},
	Bisnis: {
		icon: Briefcase,
		gradient: "from-emerald-600/20 via-green-500/10 to-transparent",
		color: "text-emerald-500",
	},
	Sains: {
		icon: Microscope,
		gradient: "from-purple-600/20 via-violet-500/10 to-transparent",
		color: "text-purple-500",
	},
	Desain: {
		icon: Palette,
		gradient: "from-pink-600/20 via-rose-500/10 to-transparent",
		color: "text-pink-500",
	},
	Penulisan: {
		icon: PenTool,
		gradient: "from-orange-600/20 via-amber-500/10 to-transparent",
		color: "text-orange-500",
	},
	Debat: {
		icon: MessageSquare,
		gradient: "from-yellow-600/20 via-amber-500/10 to-transparent",
		color: "text-yellow-500",
	},
	Olahraga: {
		icon: Trophy,
		gradient: "from-red-600/20 via-orange-500/10 to-transparent",
		color: "text-red-500",
	},
	Seni: {
		icon: Music,
		gradient: "from-indigo-600/20 via-purple-500/10 to-transparent",
		color: "text-indigo-500",
	},
	Sosial: {
		icon: Heart,
		gradient: "from-rose-600/20 via-pink-500/10 to-transparent",
		color: "text-rose-500",
	},
};

const categoryDescriptions: Record<string, string> = {
	Teknologi:
		"Kompetisi teknologi, programming, dan inovasi digital untuk mengasah kemampuan teknis kamu.",
	Bisnis:
		"Kompetisi bisnis, entrepreneurship, dan case competition untuk calon pengusaha muda.",
	Sains:
		"Kompetisi sains, riset, dan olimpiade untuk pecinta ilmu pengetahuan.",
	Desain: "Kompetisi desain grafis, UI/UX, dan kreativitas visual.",
	Penulisan: "Kompetisi menulis, esai, dan karya tulis ilmiah.",
	Debat: "Kompetisi debat, public speaking, dan argumentasi.",
	Olahraga: "Kompetisi olahraga dan e-sports.",
	Seni: "Kompetisi seni musik, tari, dan pertunjukan.",
	Sosial: "Kompetisi sosial, volunteer, dan pengabdian masyarakat.",
};

export default function CategoryDetailPage() {
	const params = useParams();
	const slug = params.slug as string;
	const categoryName = decodeURIComponent(slug || "");
	const { isBookmarked, toggleBookmark, bookmarks } = useBookmarks();
	const [viewMode, setViewMode] = useState<ViewMode>("card");
	const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
	const [selectedType, setSelectedType] = useState<string | null>(null);

	const config = categoryConfig[categoryName] || {
		icon: Monitor,
		gradient: "from-primary/20 via-primary/10 to-transparent",
		color: "text-primary",
	};
	const CategoryIcon = config.icon;

	const allCategoryCompetitions = useMemo(() => {
		return competitions
			.filter(
				(comp) => comp.category.toLowerCase() === categoryName.toLowerCase(),
			)
			.sort(
				(a, b) =>
					new Date(a.deadline).getTime() - new Date(b.deadline).getTime(),
			);
	}, [categoryName]);

	const categoryCompetitions = useMemo(() => {
		// Note: selectedType is for UI only since competitions don't have 'type' field yet
		return allCategoryCompetitions;
	}, [allCategoryCompetitions]);

	const selectType = useCallback((type: string) => {
		setSelectedType((prev) => (prev === type ? null : type));
	}, []);

	const clearType = useCallback(() => {
		setSelectedType(null);
	}, []);

	const competitionDates = useMemo(() => {
		return categoryCompetitions.map((comp) => new Date(comp.deadline));
	}, [categoryCompetitions]);

	const handleItemClick = useCallback((index: number) => {
		setSelectedIndex(index);
	}, []);

	const handleCloseDialog = useCallback(() => {
		setSelectedIndex(null);
	}, []);

	const handlePrevious = useCallback(() => {
		setSelectedIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : prev));
	}, []);

	const handleNext = useCallback(() => {
		setSelectedIndex((prev) =>
			prev !== null && prev < categoryCompetitions.length - 1 ? prev + 1 : prev,
		);
	}, [categoryCompetitions.length]);

	const selectedCompetition =
		selectedIndex !== null ? categoryCompetitions[selectedIndex] : null;

	return (
		<div className="min-h-screen flex flex-col bg-background">
			<Header />

			{/* Hero Banner */}
			<div
				className={`relative h-48 md:h-64 bg-gradient-to-r ${config.gradient} bg-secondary overflow-hidden`}
			>
				<div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
				<div className="absolute inset-0 flex items-center justify-center opacity-10">
					<CategoryIcon className="h-64 w-64" />
				</div>
			</div>

			<main className="flex-1 container relative">
				{/* Category Info Section */}
				<div className="relative -mt-16 mb-8">
					<div className="flex flex-col md:flex-row md:items-end gap-4">
						{/* Category Icon Badge */}
						<div className="flex h-24 w-24 items-center justify-center rounded-xl bg-card border-4 border-background shadow-lg">
							<CategoryIcon className={`h-12 w-12 ${config.color}`} />
						</div>

						<div className="flex-1">
							<h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
								{categoryName}
							</h1>
							<p className="text-muted-foreground max-w-2xl">
								{categoryDescriptions[categoryName] ||
									"Jelajahi kompetisi dalam kategori ini."}
							</p>
						</div>

						<Link href="/submit" className="hidden md:block">
							<Button className="gap-2">
								<Plus className="h-4 w-4" />
								Submit Kompetisi
							</Button>
						</Link>
					</div>
				</div>

				{/* Competition Type Filter */}
				<div className="mb-6">
					<p className="text-sm font-medium text-muted-foreground mb-3">
						Jenis Kompetisi
					</p>
					<div className="flex flex-wrap items-center gap-2">
						{COMPETITION_TYPES.map((type) => (
							<Badge
								key={type}
								variant={selectedType === type ? "default" : "outline"}
								className={cn(
									"cursor-pointer transition-colors hover:bg-primary hover:text-primary-foreground",
									selectedType === type && "bg-primary text-primary-foreground",
								)}
								onClick={() => selectType(type)}
							>
								{type}
							</Badge>
						))}
						{selectedType && (
							<Badge
								variant="secondary"
								className="cursor-pointer gap-1"
								onClick={clearType}
							>
								<X className="h-3 w-3" />
								Clear
							</Badge>
						)}
					</div>
				</div>

				<div className="pb-8 grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6">
					{/* Main Content */}
					<div>
						{/* Header with View Toggle */}
						<div className="flex items-center justify-between mb-6">
							<h2 className="text-xl font-bold text-foreground">
								Kompetisi ({categoryCompetitions.length})
							</h2>
							<div className="flex items-center gap-2">
								<Link href="/submit" className="lg:hidden">
									<Button size="sm" className="gap-2">
										<Plus className="h-4 w-4" />
										Submit
									</Button>
								</Link>
								<Button
									variant="outline"
									size="icon"
									className="shrink-0 h-8 w-8"
								>
									<Rss className="h-4 w-4" />
								</Button>
								<div className="flex items-center gap-1 rounded-lg border border-border bg-card p-1">
									<Button
										variant={viewMode === "card" ? "secondary" : "ghost"}
										size="icon"
										className="h-8 w-8"
										onClick={() => setViewMode("card")}
									>
										<LayoutGrid className="h-4 w-4" />
									</Button>
									<Button
										variant={viewMode === "list" ? "secondary" : "ghost"}
										size="icon"
										className="h-8 w-8"
										onClick={() => setViewMode("list")}
									>
										<List className="h-4 w-4" />
									</Button>
								</div>
							</div>
						</div>

						{/* Competition Grid */}
						{categoryCompetitions.length > 0 ? (
							viewMode === "card" ? (
								<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
									{categoryCompetitions.map((competition, index) => (
										<CompetitionCardPoster
											key={competition.id}
											competition={competition}
											isBookmarked={isBookmarked(competition.id)}
											onToggleBookmark={toggleBookmark}
											onClick={() => handleItemClick(index)}
										/>
									))}
								</div>
							) : (
								<div className="grid grid-cols-1 gap-3">
									{categoryCompetitions.map((competition, index) => (
										<CompetitionCard
											key={competition.id}
											competition={competition}
											isBookmarked={bookmarks.includes(competition.id)}
											onToggleBookmark={toggleBookmark}
											onClick={() => handleItemClick(index)}
										/>
									))}
								</div>
							)
						) : (
							<div className="text-center py-12">
								<Trophy className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
								<p className="text-muted-foreground">
									Belum ada kompetisi dalam kategori ini
								</p>
							</div>
						)}
					</div>

					{/* Sidebar with Calendar */}
					<div className="hidden lg:block">
						<div className="sticky top-20 rounded-lg border border-border bg-card p-4">
							<h3 className="text-sm font-semibold text-foreground mb-3">
								Kalender Deadline
							</h3>
							<Calendar
								mode="multiple"
								selected={competitionDates}
								className="pointer-events-auto"
								modifiers={{
									deadline: competitionDates,
								}}
								modifiersStyles={{
									deadline: {
										backgroundColor: "hsl(var(--primary))",
										color: "hsl(var(--primary-foreground))",
										borderRadius: "50%",
									},
								}}
							/>
							<p className="text-xs text-muted-foreground mt-3">
								Tanggal yang ditandai menunjukkan deadline kompetisi
							</p>
						</div>
					</div>
				</div>
			</main>

			{/* Competition Dialog */}
			<CompetitionDialog
				competition={selectedCompetition}
				isOpen={selectedIndex !== null}
				onClose={handleCloseDialog}
				onPrevious={handlePrevious}
				onNext={handleNext}
				hasPrevious={selectedIndex !== null && selectedIndex > 0}
				hasNext={
					selectedIndex !== null &&
					selectedIndex < categoryCompetitions.length - 1
				}
			/>

			<Footer />
		</div>
	);
}
