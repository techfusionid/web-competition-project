import {
	Briefcase,
	Code2,
	Microscope,
	Music,
	Palette,
	Trophy,
} from "lucide-react";
import { CategoryCard } from "@/components/CategoryCard";
import { OrganizerCard } from "@/components/OrganizerCard";

const categories = [
	{
		title: "Technology",
		icon: Code2,
		color: "text-orange-500",
		count: "150+ Events",
		href: "/category/Technology",
	},
	{
		title: "Business",
		icon: Briefcase,
		color: "text-emerald-500",
		count: "80+ Events",
		href: "/category/Business",
	},
	{
		title: "Design",
		icon: Palette,
		color: "text-pink-500",
		count: "120+ Events",
		href: "/category/Design",
	},
	{
		title: "Science",
		icon: Microscope,
		color: "text-purple-500",
		count: "60+ Events",
		href: "/category/Science",
	},
	{
		title: "Art",
		icon: Music,
		color: "text-indigo-500",
		count: "45+ Events",
		href: "/category/Art",
	},
	{
		title: "Sports",
		icon: Trophy,
		color: "text-red-500",
		count: "30+ Events",
		href: "/category/Sports",
	},
];

const organizers = [
	{
		title: "ITB",
		image:
			"https://upload.wikimedia.org/wikipedia/id/9/95/Logo_Institut_Teknologi_Bandung.png",
		description:
			"Institut Teknologi Bandung - Innovation and technology competitions",
		href: "/organizer/ITB",
	},
	{
		title: "UI",
		image:
			"https://upload.wikimedia.org/wikipedia/id/thumb/0/0f/Makara_of_Universitas_Indonesia.svg/250px-Makara_of_Universitas_Indonesia.svg.png",
		description:
			"Universitas Indonesia - Leading academic and research competitions",
		href: "/organizer/UI",
	},
	{
		title: "Google",
		image:
			"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQN1HgAOQZBf48TI55AvzbnfV0IFrCCrX6ldg&s",
		description: "Google developer challenges and tech competitions",
		href: "/organizer/Google",
	},
	{
		title: "UGM",
		image: "https://innopa.org/wp-content/uploads/logo-ugm.png",
		description: "Universitas Gadjah Mada - Prestigious national competitions",
		href: "/organizer/UGM",
	},
];

export default function DiscoverPage() {
	return (
		<>
			{/* Header Section - Desktop */}
			<section className="hidden pt-12 md:block">
				<div className="container">
					<div className="max-w-fit">
						<h1 className="text-balance font-bold text-foreground text-xl tracking-tight md:text-2xl lg:text-4xl">
							Discover Competitions
						</h1>
						<p className="mt-4 text-balance text-base text-muted-foreground md:text-lg">
							Explore the best competitions across Indonesia and browse by
							category.
						</p>
					</div>
				</div>
			</section>

			{/* Mobile Content with Sidebar Layout */}
			<div className="container py-8 md:hidden">
				<div className="flex flex-col gap-8">
					{/* Left - Header */}
					<div>
						<h1 className="font-bold text-3xl text-foreground tracking-tight">
							Discover Competitions
						</h1>
						<p className="mt-3 text-base text-muted-foreground">
							Explore the best competitions across Indonesia and browse by
							category or organizer.
						</p>
					</div>

					{/* Right - Cards */}
					<div className="space-y-8">
						{/* Browse by Category Section */}
						<section>
							<h2 className="mb-4 font-semibold text-foreground text-xl">
								Browse by Category
							</h2>
							<div className="scrollbar-hide flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2">
								<div className="flex min-w-max flex-col gap-3">
									<div className="flex gap-3">
										{categories.slice(0, 3).map((category) => (
											<CategoryCard
												color={category.color}
												count={category.count}
												href={category.href}
												icon={category.icon}
												key={category.title}
												title={category.title}
											/>
										))}
									</div>
									<div className="flex gap-3">
										{categories.slice(3, 6).map((category) => (
											<CategoryCard
												color={category.color}
												count={category.count}
												href={category.href}
												icon={category.icon}
												key={category.title}
												title={category.title}
											/>
										))}
									</div>
								</div>
							</div>
						</section>

						{/* Separator Line */}
						<div className="border-border border-t" />

						{/* Browse by Organizer Section */}
						<section>
							<h2 className="mb-4 font-semibold text-foreground text-xl">
								Browse by Organizer
							</h2>
							<div className="grid grid-cols-1 gap-4">
								{organizers.map((organizer) => (
									<OrganizerCard
										description={organizer.description}
										href={organizer.href}
										image={organizer.image}
										key={organizer.title}
										title={organizer.title}
									/>
								))}
							</div>
						</section>
					</div>
				</div>
			</div>

			{/* Desktop Content - Original Layout */}
			<div className="hidden md:block">
				{/* Browse by Category Section */}
				<section className="py-8">
					<div className="container">
						<h2 className="mb-6 font-semibold text-foreground text-xl">
							Browse by Category
						</h2>
						<div className="grid gap-4 md:grid-cols-3 lg:grid-cols-5">
							{categories.map((category) => (
								<CategoryCard
									color={category.color}
									count={category.count}
									href={category.href}
									icon={category.icon}
									key={category.title}
									title={category.title}
								/>
							))}
						</div>
					</div>
				</section>

				{/* Browse by Organizer Section */}
				<section className="py-4">
					<div className="container">
						<h2 className="mb-6 font-semibold text-foreground text-xl">
							Browse by Organizer
						</h2>
						<div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-4">
							{organizers.map((organizer) => (
								<OrganizerCard
									description={organizer.description}
									href={organizer.href}
									image={organizer.image}
									key={organizer.title}
									title={organizer.title}
								/>
							))}
						</div>
					</div>
				</section>
			</div>
		</>
	);
}
