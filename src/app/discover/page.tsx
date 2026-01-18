import {
	Code2,
	Trophy,
	Lightbulb,
	Palette,
	Music,
	Video,
} from "lucide-react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { CategoryCard } from "@/components/CategoryCard";
import { OrganizerCard } from "@/components/OrganizerCard";

const categories = [
	{ title: "Technology", icon: Code2, color: "text-orange-500", count: "150+ Events", href: "/category/technology" },
	{ title: "Sports", icon: Trophy, color: "text-blue-500", count: "80+ Events", href: "/category/sports" },
	{ title: "Art & Design", icon: Palette, color: "text-green-400", count: "120+ Events", href: "/category/art-design" },
	{ title: "Entrepreneurship", icon: Lightbulb, color: "text-yellow-500", count: "60+ Events", href: "/category/entrepreneurship" },
	{ title: "Music & Film", icon: Music, color: "text-red-500", count: "45+ Events", href: "/category/music-film" },
	{ title: "Debate & Speaking", icon: Video, color: "text-sky-400", count: "30+ Events", href: "/category/debate-speaking" },
];

const organizers = [
	{
		title: "ITB",
		image: "https://upload.wikimedia.org/wikipedia/id/9/95/Logo_Institut_Teknologi_Bandung.png",
		description: "Institut Teknologi Bandung - Innovation and technology competitions",
		href: "/institution?itb"
	},
	{
		title: "UI",
		image: "https://upload.wikimedia.org/wikipedia/id/thumb/0/0f/Makara_of_Universitas_Indonesia.svg/250px-Makara_of_Universitas_Indonesia.svg.png",
		description: "Universitas Indonesia - Leading academic and research competitions",
		href: "/institution?ui"
	},
	{
		title: "Google",
		image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQN1HgAOQZBf48TI55AvzbnfV0IFrCCrX6ldg&s",
		description: "Google developer challenges and tech competitions",
		href: "/institution?google"
	},
	{
		title: "UGM",
		image: "https://innopa.org/wp-content/uploads/logo-ugm.png",
		description: "Universitas Gadjah Mada - Prestigious national competitions",
		href: "/institution?ugm"
	},
];

export default function DiscoverPage() {
	return (
		<div className="min-h-screen flex flex-col bg-background">
			<Header />

			<main className="flex-1">
				{/* Header Section */}
				<section className="border-b border-border py-12 md:py-20">
					<div className="container">
						<div className="mx-auto max-w-2xl">
							<h1 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
								Discover Competitions
							</h1>
							<p className="mt-4 text-balance text-base text-muted-foreground md:text-lg">
								Explore the best competitions across Indonesia and browse by category.
							</p>
						</div>
					</div>
				</section>

				{/* Browse by Category Section */}
				<section className="py-12 md:py-16">
					<div className="container">
						<h2 className="text-xl font-semibold text-foreground mb-6">Browse by Category</h2>
						<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
							{categories.map((category) => (
								<CategoryCard
									key={category.title}
									title={category.title}
									icon={category.icon}
									color={category.color}
									count={category.count}
									href={category.href}
								/>
							))}
						</div>
					</div>
				</section>

				{/* Browse by Organizer Section */}
				<section className="border-t border-border py-12 md:py-16">
					<div className="container">
						<h2 className="text-xl font-semibold text-foreground mb-6">Browse by Organizer</h2>
						<div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4">
							{organizers.map((organizer) => (
								<OrganizerCard
									key={organizer.title}
									title={organizer.title}
									image={organizer.image}
									description={organizer.description}
									href={organizer.href}
								/>
							))}
						</div>
					</div>
				</section>
			</main>

			<Footer />
		</div>
	);
}
