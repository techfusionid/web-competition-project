import { OrganizerSection } from "@/components/sections/OrganizerSection";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export const metadata = {
	title: "Organizers",
	description: "Explore competitions by organizer institutions",
};

export default function OrganizersPage() {
	return (
		<div className="min-h-screen flex flex-col bg-background">
			<Header />

			<main className="flex-1 container py-8">
				<div className="mb-8">
					<h1 className="text-3xl font-bold text-foreground mb-2">Organizers</h1>
					<p className="text-muted-foreground">
						Explore competitions by organizer institutions
					</p>
				</div>

				<OrganizerSection variant="default" className="mb-0" />
			</main>

			<Footer />
		</div>
	);
}
