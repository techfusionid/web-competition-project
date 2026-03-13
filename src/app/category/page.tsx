import { CategorySection } from "@/components/sections";

export const metadata = {
	title: "Categories",
	description: "Explore competitions by categories you're interested in",
};

export default function CategoriesPage() {
	return (
		<main className="container py-8">
			<div className="mb-8">
				<h1 className="mb-2 font-bold text-3xl text-foreground">Categories</h1>
				<p className="text-muted-foreground">
					Explore competitions by categories you're interested in
				</p>
			</div>

			<CategorySection className="mb-0" variant="default" />
		</main>
	);
}
