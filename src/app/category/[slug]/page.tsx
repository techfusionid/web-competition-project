"use client";

import {
   Briefcase,
   Heart,
   LayoutGrid,
   List,
   type LucideIcon,
   MessageSquare,
   Microscope,
   Monitor,
   Music,
   Palette,
   PenTool,
   Rss,
   Trophy,
   X,
} from "lucide-react";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { fetchCompetitionsByCategory } from "@/app/actions/competitions";
import { CompetitionCard } from "@/components/CompetitionCardGrid";
import { CompetitionCardPoster } from "@/components/CompetitionCardPoster";
import { CompetitionDialog } from "@/components/CompetitionCenterDialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import type { Competition } from "@/types/competition";
import { CATEGORY_MAPPING } from "@/types/competition";

type ViewMode = "poster" | "cardList";

const categoryConfig: Record<
   string,
   { icon: LucideIcon; gradient: string; color: string; image: string }
> = {
   Technology: {
      icon: Monitor,
      gradient: "from-blue-600/20 via-cyan-500/10 to-transparent",
      color: "text-blue-500",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&h=300&fit=crop",
   },
   Business: {
      icon: Briefcase,
      gradient: "from-emerald-600/20 via-green-500/10 to-transparent",
      color: "text-emerald-500",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=300&fit=crop",
   },
   Science: {
      icon: Microscope,
      gradient: "from-purple-600/20 via-violet-500/10 to-transparent",
      color: "text-purple-500",
      image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=1200&h=300&fit=crop",
   },
   Design: {
      icon: Palette,
      gradient: "from-pink-600/20 via-rose-500/10 to-transparent",
      color: "text-pink-500",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&h=300&fit=crop",
   },
   Writing: {
      icon: PenTool,
      gradient: "from-orange-600/20 via-amber-500/10 to-transparent",
      color: "text-orange-500",
      image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1200&h=300&fit=crop",
   },
   Debate: {
      icon: MessageSquare,
      gradient: "from-yellow-600/20 via-amber-500/10 to-transparent",
      color: "text-yellow-500",
      image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1200&h=300&fit=crop",
   },
   Sports: {
      icon: Trophy,
      gradient: "from-red-600/20 via-orange-500/10 to-transparent",
      color: "text-red-500",
      image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1200&h=300&fit=crop",
   },
   Art: {
      icon: Music,
      gradient: "from-indigo-600/20 via-purple-500/10 to-transparent",
      color: "text-indigo-500",
      image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=1200&h=300&fit=crop",
   },
   Social: {
      icon: Heart,
      gradient: "from-rose-600/20 via-pink-500/10 to-transparent",
      color: "text-rose-500",
      image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1200&h=300&fit=crop",
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

export default function CategoryDetailPage() {
   const params = useParams();
   const slug = params.slug as string;
   const categoryName = decodeURIComponent(slug || "");
   const [viewMode, setViewMode] = useState<ViewMode>("cardList");
   const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
   const [selectedType, setSelectedType] = useState<string | null>(null);
   const [allCategoryCompetitions, setAllCategoryCompetitions] = useState<
      Competition[]
   >([]);
   const [isLoading, setIsLoading] = useState(true);
   const [displayLimit, setDisplayLimit] = useState(6);

   const config = categoryConfig[categoryName] || {
      icon: Monitor,
      gradient: "from-primary/20 via-primary/10 to-transparent",
      color: "text-primary",
   };
   const CategoryIcon = config.icon;

   // Fetch competitions from database on mount
   useEffect(() => {
      async function loadCategoryCompetitions() {
         setIsLoading(true);
         try {
            const dbCategory = CATEGORY_MAPPING[categoryName] || categoryName;
            const data = await fetchCompetitionsByCategory(dbCategory);

            // Sort by deadline
            const sorted = data.sort(
               (a, b) =>
                  new Date(a.deadline).getTime() -
                  new Date(b.deadline).getTime(),
            );
            setAllCategoryCompetitions(sorted);
         } catch (error) {
            console.error("Failed to fetch category competitions:", error);
            setAllCategoryCompetitions([]);
         } finally {
            setIsLoading(false);
         }
      }
      loadCategoryCompetitions();
   }, [categoryName]);

   // Get unique tags from competitions in this category
   const categoryTags = useMemo(() => {
      const tagsSet = new Set<string>();
      allCategoryCompetitions.forEach((comp) => {
         comp.tags?.forEach((tag) => tagsSet.add(tag));
      });
      return Array.from(tagsSet).sort();
   }, [allCategoryCompetitions]);

   const categoryCompetitions = useMemo(() => {
      if (!selectedType) {
         return allCategoryCompetitions;
      }
      return allCategoryCompetitions.filter((comp) =>
         comp.tags?.includes(selectedType),
      );
   }, [allCategoryCompetitions, selectedType]);

   const displayedCompetitions = useMemo(
      () => categoryCompetitions.slice(0, displayLimit),
      [categoryCompetitions, displayLimit],
   );

   const hasMore = categoryCompetitions.length > displayLimit;

   const loadMore = useCallback(() => {
      setDisplayLimit((prev) => prev + 6);
   }, []);

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
         prev !== null && prev < categoryCompetitions.length - 1
            ? prev + 1
            : prev,
      );
   }, [categoryCompetitions.length]);

   const selectedCompetition =
      selectedIndex !== null ? categoryCompetitions[selectedIndex] : null;

   return (
      <>
         {/* Hero Section with Image */}
         <div className="relative w-full">
            {/* Hero Banner with Image */}
            <div className="w-full pt-8 pb-8">
               <div className="container">
                  <div className="relative h-48 overflow-hidden rounded-2xl md:h-64">
                     <img
                        alt={categoryName}
                        className="absolute inset-0 h-full w-full object-cover"
                        src={
                           config.image ||
                           "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&h=300&fit=crop"
                        }
                     />
                  </div>
               </div>
            </div>

            {/* Category Info Below Banner */}
            <div className="w-full pb-8">
               <div className="container">
                  <div className="flex flex-col items-start">
                     {/* Category Icon Badge */}
                     <div className="relative z-10 -mt-14 mb-3 flex h-20 w-20 items-center justify-center rounded-2xl border-4 border-background bg-card shadow-xl">
                        <CategoryIcon className={`h-10 w-10 ${config.color}`} />
                     </div>

                     <h1 className="mb-2 font-bold text-3xl text-foreground md:text-4xl">
                        {categoryName}
                     </h1>
                     <p className="max-w-2xl text-base text-muted-foreground">
                        {categoryDescriptions[categoryName] ||
                           "Explore competitions in this category."}
                     </p>
                  </div>
               </div>
            </div>
         </div>

         <main className="container flex-1">
            {/* Competition Type Filter */}
            {categoryTags.length > 0 && (
               <div className="mb-6">
                  <p className="mb-3 font-medium text-muted-foreground text-sm">
                     Filter by Tag
                  </p>
                  <div className="flex flex-wrap items-center gap-2">
                     {categoryTags.map((tag) => (
                        <Badge
                           className={cn(
                              "cursor-pointer py-1 text-sm transition-colors hover:bg-primary hover:text-primary-foreground",
                              selectedType === tag &&
                                 "bg-primary text-primary-foreground",
                           )}
                           key={tag}
                           onClick={() => selectType(tag)}
                           variant={
                              selectedType === tag ? "default" : "outline"
                           }
                        >
                           {tag}
                        </Badge>
                     ))}
                     {selectedType && (
                        <Badge
                           className="cursor-pointer gap-1"
                           onClick={clearType}
                           variant="secondary"
                        >
                           <X className="h-3 w-3" />
                           Clear
                        </Badge>
                     )}
                  </div>
               </div>
            )}

            <div className="grid grid-cols-1 gap-6 pb-8 lg:grid-cols-[1fr_280px]">
               {/* Main Content */}
               <div>
                  {/* Header with View Toggle */}
                  <div className="mb-6 flex items-center justify-between">
                     <h2 className="font-bold text-foreground text-xl">
                        Competitions (
                        {isLoading ? "..." : categoryCompetitions.length})
                     </h2>
                     <div className="flex items-center gap-2">
                        <Button
                           className="h-8 w-8 shrink-0"
                           size="icon"
                           variant="outline"
                        >
                           <Rss className="h-4 w-4" />
                        </Button>
                        <div className="flex items-center gap-1 rounded-lg border border-border bg-card p-1">
                           <Button
                              className="h-8 w-8"
                              onClick={() => setViewMode("poster")}
                              size="icon"
                              variant={
                                 viewMode === "poster" ? "secondary" : "ghost"
                              }
                           >
                              <LayoutGrid className="h-4 w-4" />
                           </Button>
                           <Button
                              className="h-8 w-8"
                              onClick={() => setViewMode("cardList")}
                              size="icon"
                              variant={
                                 viewMode === "cardList" ? "secondary" : "ghost"
                              }
                           >
                              <List className="h-4 w-4" />
                           </Button>
                        </div>
                     </div>
                  </div>

                  {/* Competition Grid */}
                  {isLoading ? (
                     <div className="py-12 text-center">
                        <p className="text-muted-foreground">
                           Loading competitions...
                        </p>
                     </div>
                  ) : categoryCompetitions.length > 0 ? (
                     viewMode === "poster" ? (
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                           {displayedCompetitions.map((competition, index) => (
                              <CompetitionCardPoster
                                 competition={competition}
                                 key={competition.id}
                                 onClick={() => handleItemClick(index)}
                              />
                           ))}
                        </div>
                     ) : (
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                           {displayedCompetitions.map((competition, index) => (
                              <CompetitionCard
                                 competition={competition}
                                 key={competition.id}
                                 onClick={() => handleItemClick(index)}
                              />
                           ))}
                        </div>
                     )
                  ) : (
                     <div className="py-12 text-center">
                        <Trophy className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                        <p className="text-muted-foreground">
                           No competitions in this category yet
                        </p>
                     </div>
                  )}

                  {hasMore && (
                     <div className="mt-6 flex justify-center">
                        <Button onClick={loadMore} variant="outline">
                           Load More (
                           {categoryCompetitions.length - displayLimit} more)
                        </Button>
                     </div>
                  )}
               </div>

               {/* Sidebar with Calendar */}
               <div className="hidden lg:block">
                  <div className="sticky top-20 rounded-xl p-2">
                     <Calendar
                        className="pointer-events-auto [&_button]:rounded-lg bg-card/75 d p-4 rounded-lg"
                        mode="multiple"
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
                        selected={competitionDates}
                     />
                  </div>
               </div>
            </div>
         </main>

         {/* Competition Dialog */}
         <CompetitionDialog
            competition={selectedCompetition}
            hasNext={
               selectedIndex !== null &&
               selectedIndex < categoryCompetitions.length - 1
            }
            hasPrevious={selectedIndex !== null && selectedIndex > 0}
            isOpen={selectedIndex !== null}
            onClose={handleCloseDialog}
            onNext={handleNext}
            onPrevious={handlePrevious}
         />
      </>
   );
}
