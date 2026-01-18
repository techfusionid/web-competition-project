import { CategorySection } from "@/components/sections/CategorySection";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export const metadata = {
	title: "Categories",
	description: "Explore competitions by categories you're interested in",
};

export default function CategoriesPage() {
	return (
		<div className="min-h-screen flex flex-col bg-background">
			<Header />

			<main className="flex-1 container py-8">
				<div className="mb-8">
					<h1 className="text-3xl font-bold text-foreground mb-2">Categories</h1>
					<p className="text-muted-foreground">
						Explore competitions by categories you're interested in
					</p>
				</div>

				<CategorySection variant="default" className="mb-0" />
			</main>

			<Footer />
		</div>
	);
}
