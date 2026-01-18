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
   Plus,
   Rss,
   Trophy,
   X,
} from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { CompetitionCard } from "@/components/CompetitionCard";
import { CompetitionCardPoster } from "@/components/CompetitionCardPoster";
import { CompetitionDialog } from "@/components/CompetitionDialog";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { competitions } from "@/data/competitions";
import { useBookmarks } from "@/hooks/useBookmarks";
import { cn } from "@/lib/utils";

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
   const { isBookmarked, toggleBookmark, bookmarks } = useBookmarks();
   const [viewMode, setViewMode] = useState<ViewMode>("cardList");
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
            (comp) =>
               comp.category.toLowerCase() === categoryName.toLowerCase(),
         )
         .sort(
            (a, b) =>
               new Date(a.deadline).getTime() - new Date(b.deadline).getTime(),
         );
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
      if (!selectedType) return allCategoryCompetitions;
      return allCategoryCompetitions.filter((comp) =>
         comp.tags?.includes(selectedType),
      );
   }, [allCategoryCompetitions, selectedType]);

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
      <div className="min-h-screen flex flex-col bg-background">
         <Header sticky={false} />

         {/* Hero Section with Image */}
         <div className="relative w-full">

            {/* Hero Banner with Image */}
            <div className="w-full pt-8 pb-8">
               <div className="container">
                  <div className="relative h-48 md:h-64 overflow-hidden rounded-2xl">
                     <img
                        src={
                           config.image ||
                           "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&h=300&fit=crop"
                        }
                        alt={categoryName}
                        className="absolute inset-0 h-full w-full object-cover"
                     />
                  </div>
               </div>
            </div>

            {/* Category Info Below Banner */}
            <div className="w-full pb-8">
               <div className="container">
                  <div className="flex flex-col items-start">
                     {/* Category Icon Badge */}
                     <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-card border-4 border-background shadow-xl -mt-14 mb-3 relative z-10">
                        <CategoryIcon
                           className={`h-10 w-10 ${config.color}`}
                        />
                     </div>

                     <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                        {categoryName}
                     </h1>
                     <p className="text-base text-muted-foreground max-w-2xl">
                        {categoryDescriptions[categoryName] ||
                           "Explore competitions in this category."}
                     </p>
                  </div>
               </div>
            </div>
         </div>

         <main className="flex-1 container">
            {/* Competition Type Filter */}
            {categoryTags.length > 0 && (
               <div className="mb-6">
                  <p className="text-sm font-medium text-muted-foreground mb-3">
                     Filter by Tag
                  </p>
                  <div className="flex flex-wrap items-center gap-2">
                     {categoryTags.map((tag) => (
                        <Badge
                           className={cn(
                              "cursor-pointer transition-colors hover:bg-primary hover:text-primary-foreground py-1 text-sm",
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

            <div className="pb-8 grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6">
               {/* Main Content */}
               <div>
                  {/* Header with View Toggle */}
                  <div className="flex items-center justify-between mb-6">
                     <h2 className="text-xl font-bold text-foreground">
                        Competitions ({categoryCompetitions.length})
                     </h2>
                     <div className="flex items-center gap-2">
                        <Button
                           className="shrink-0 h-8 w-8"
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
                                 viewMode === "cardList"
                                    ? "secondary"
                                    : "ghost"
                              }
                           >
                              <List className="h-4 w-4" />
                           </Button>
                        </div>
                     </div>
                  </div>

                  {/* Competition Grid */}
                  {categoryCompetitions.length > 0 ? (
                     viewMode === "poster" ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                           {categoryCompetitions.map((competition, index) => (
                              <CompetitionCardPoster
                                 competition={competition}
                                 isBookmarked={isBookmarked(competition.id)}
                                 key={competition.id}
                                 onClick={() => handleItemClick(index)}
                                 onToggleBookmark={toggleBookmark}
                              />
                           ))}
                        </div>
                     ) : (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                           {categoryCompetitions.map((competition, index) => (
                              <CompetitionCard
                                 competition={competition}
                                 key={competition.id}
                                 onClick={() => handleItemClick(index)}
                              />
                           ))}
                        </div>
                     )
                  ) : (
                     <div className="text-center py-12">
                        <Trophy className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                        <p className="text-muted-foreground">
                           No competitions in this category yet
                        </p>
                     </div>
                  )}
               </div>

               {/* Sidebar with Calendar */}
               <div className="hidden lg:block">
                  <div className="sticky top-20 rounded-lg border border-border bg-card p-4">
                     <h3 className="text-sm font-semibold text-foreground mb-3">
                        Deadline Calendar
                     </h3>
                     <Calendar
                        className="pointer-events-auto"
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
                     <p className="text-xs text-muted-foreground mt-3">
                        Marked dates show competition deadlines
                     </p>
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

         <Footer />
      </div>
   );
}
