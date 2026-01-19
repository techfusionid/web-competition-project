import { OrganizerCard } from "@/components/OrganizerCard";

const organizers = [
	{
		title: "ITB",
		image: "https://upload.wikimedia.org/wikipedia/id/9/95/Logo_Institut_Teknologi_Bandung.png",
		description: "Institut Teknologi Bandung - Innovation and technology competitions",
		href: "/organizer/itb",
	},
	{
		title: "UI",
		image: "https://upload.wikimedia.org/wikipedia/id/thumb/0/0f/Makara_of_Universitas_Indonesia.svg/250px-Makara_of_Universitas_Indonesia.svg.png",
		description: "Universitas Indonesia - Leading academic and research competitions",
		href: "/organizer/ui",
	},
	{
		title: "Google",
		image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQN1HgAOQZBf48TI55AvzbnfV0IFrCCrX6ldg&s",
		description: "Google developer challenges and tech competitions",
		href: "/organizer/google",
	},
	{
		title: "UGM",
		image: "https://innopa.org/wp-content/uploads/logo-ugm.png",
		description: "Universitas Gadjah Mada - Prestigious national competitions",
		href: "/organizer/ugm",
	},
];

export const metadata = {
	title: "Organizers",
	description: "Explore competitions by organizer institutions",
};

export default function OrganizersPage() {
	return (
		<>
			<main className="container py-8">
				<div className="mb-8">
					<h1 className="text-3xl font-bold text-foreground mb-2">Organizers</h1>
					<p className="text-muted-foreground">
						Explore competitions by organizer institutions
					</p>
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
			</main>
		</>
	);
}
