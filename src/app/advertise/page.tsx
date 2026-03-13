import {
	Building,
	Eye,
	Mail,
	Megaphone,
	Star,
	Trophy,
	Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const advertisers = [
	{
		name: "ITB",
		logo: "https://upload.wikimedia.org/wikipedia/id/9/95/Logo_Institut_Teknologi_Bandung.png",
	},
	{
		name: "UI",
		logo: "https://upload.wikimedia.org/wikipedia/id/thumb/0/0f/Makara_of_Universitas_Indonesia.svg/250px-Makara_of_Universitas_Indonesia.svg.png",
	},
	{
		name: "Google",
		logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQN1HgAOQZBf48TI55AvzbnfV0IFrCCrX6ldg&s",
	},
	{ name: "UGM", logo: "https://innopa.org/wp-content/uploads/logo-ugm.png" },
];

const audienceBreakdown = [
	{ role: "University Students", percentage: 60 },
	{ role: "High School Students", percentage: 25 },
	{ role: "Young Professionals", percentage: 15 },
];

export default function AdvertisePage() {
	return (
		<main className="container py-16 md:py-24">
			{/* Hero */}
			<div className="mx-auto mb-16 max-w-3xl text-center">
				<h1 className="mb-6 font-bold text-4xl text-foreground tracking-tight md:text-5xl">
					Advertise
				</h1>
				<h2 className="mb-8 text-muted-foreground text-xl md:text-2xl">
					Promote your competition on TechFusion and reach a wide audience of
					students and competition enthusiasts across Indonesia.
				</h2>
				<p className="text-muted-foreground">
					Reach an engaged community of over{" "}
					<strong className="text-foreground">10,000 monthly visitors</strong>{" "}
					who trust TechFusion as their go-to resource for discovering
					competitions. Our platform connects you with passionate students,
					young professionals, and institutions who are constantly looking for
					opportunities to showcase their talents and skills.
				</p>
			</div>

			{/* Stats */}
			<div className="mb-16 grid grid-cols-2 gap-6 md:grid-cols-4">
				<Card>
					<CardContent className="pt-6 text-center">
						<Eye className="mx-auto mb-2 h-6 w-6 text-primary" />
						<div className="font-bold text-2xl text-foreground md:text-3xl">
							10K+
						</div>
						<p className="text-muted-foreground text-sm">Monthly Visitors</p>
					</CardContent>
				</Card>
				<Card>
					<CardContent className="pt-6 text-center">
						<Trophy className="mx-auto mb-2 h-6 w-6 text-primary" />
						<div className="font-bold text-2xl text-foreground md:text-3xl">
							500+
						</div>
						<p className="text-muted-foreground text-sm">Competitions Listed</p>
					</CardContent>
				</Card>
				<Card>
					<CardContent className="pt-6 text-center">
						<Mail className="mx-auto mb-2 h-6 w-6 text-primary" />
						<div className="font-bold text-2xl text-foreground md:text-3xl">
							1.5K+
						</div>
						<p className="text-muted-foreground text-sm">
							Newsletter Subscribers
						</p>
					</CardContent>
				</Card>
				<Card>
					<CardContent className="pt-6 text-center">
						<Building className="mx-auto mb-2 h-6 w-6 text-primary" />
						<div className="font-bold text-2xl text-foreground md:text-3xl">
							100+
						</div>
						<p className="text-muted-foreground text-sm">
							Partner Institutions
						</p>
					</CardContent>
				</Card>
			</div>

			<div className="mb-16 grid grid-cols-1 gap-12 lg:grid-cols-2">
				{/* Why Advertise */}
				<div>
					<h3 className="mb-4 font-semibold text-foreground text-lg">
						Why Advertise With Us
					</h3>
					<p className="mb-6 text-muted-foreground">
						Our audience is deeply invested in academic and professional
						development, from hackathons and case competitions to olympiads and
						innovation challenges. Whether you&apos;re promoting a university
						competition, corporate challenge, or any talent search, you&apos;ll
						find an engaged community ready to participate and compete.
					</p>

					<h3 className="mb-4 font-semibold text-foreground text-lg">
						Our Audience
					</h3>
					<ul className="space-y-2 text-muted-foreground">
						<li>University Students (60%)</li>
						<li>High School Students (25%)</li>
						<li>Young Professionals (15%)</li>
					</ul>
					<p className="mt-4 text-muted-foreground">
						Our community spans across top universities, schools, and companies
						across Indonesia. What brings them together is a shared passion for
						learning, competing, and building their portfolios through
						meaningful competitions.
					</p>
				</div>

				{/* Audience Chart */}
				<Card>
					<CardContent className="pt-6">
						<h3 className="mb-6 font-semibold text-foreground text-lg">
							Audience Breakdown
						</h3>
						<div className="space-y-4">
							{audienceBreakdown.map((item) => (
								<div key={item.role}>
									<div className="mb-1 flex justify-between text-sm">
										<span className="text-foreground">{item.role}</span>
										<span className="font-medium text-foreground">
											{item.percentage}%
										</span>
									</div>
									<div className="h-2 w-full overflow-hidden rounded-full bg-muted">
										<div
											className="h-full rounded-full bg-primary"
											style={{ width: `${item.percentage}%` }}
										/>
									</div>
								</div>
							))}
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Testimonial */}
			<Card className="mb-16 bg-muted/30">
				<CardContent className="pt-8 pb-8">
					<p className="mb-6 text-muted-foreground">
						<span className="font-semibold text-foreground">
							TechFusion has been instrumental
						</span>{" "}
						in helping us reach thousands of students across Indonesia for our
						annual competition. The platform delivered great results, giving us
						a noticeable{" "}
						<strong className="text-foreground">
							30–40% increase in registrations
						</strong>{" "}
						compared to previous years. Highly recommended for any institution
						looking to promote their competitions!
					</p>
					<div className="flex items-center gap-3">
						<div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
							<Users className="h-5 w-5 text-primary" />
						</div>
						<div>
							<p className="font-semibold text-foreground">
								Competition Committee
							</p>
							<p className="text-muted-foreground text-sm">
								Top University in Indonesia
							</p>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Ad Options */}
			<div className="mb-16">
				<h3 className="mb-4 font-semibold text-foreground text-lg">
					Advertising Options
				</h3>
				<p className="mb-6 text-muted-foreground">
					We offer various advertising opportunities including:
				</p>
				<ul className="mb-6 space-y-2 text-muted-foreground">
					<li className="flex items-center gap-2">
						<Star className="h-4 w-4 shrink-0 text-primary" />
						Featured listings on our homepage
					</li>
					<li className="flex items-center gap-2">
						<Star className="h-4 w-4 shrink-0 text-primary" />
						Sponsoring and banner ads
					</li>
					<li className="flex items-center gap-2">
						<Star className="h-4 w-4 shrink-0 text-primary" />
						Newsletter sponsorships
					</li>
					<li className="flex items-center gap-2">
						<Star className="h-4 w-4 shrink-0 text-primary" />
						Custom partnership opportunities
					</li>
				</ul>
			</div>

			{/* Past Advertisers */}
			<div className="mb-16">
				<p className="mb-6 text-center text-muted-foreground text-sm">
					Join these institutions in advertising on TechFusion
				</p>
				<div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
					{advertisers.map((advertiser) => (
						<div
							className="flex items-center gap-2 opacity-60 transition-opacity hover:opacity-100"
							key={advertiser.name}
						>
							<img
								alt={advertiser.name}
								className="h-8 w-auto object-contain"
								src={advertiser.logo}
							/>
						</div>
					))}
				</div>
			</div>

			{/* CTA */}
			<Card className="border-primary/20 bg-primary/5">
				<CardContent className="pt-8 pb-8 text-center">
					<Megaphone className="mx-auto mb-4 h-10 w-10 text-primary" />
					<h3 className="mb-2 font-semibold text-foreground text-xl">
						Ready to Get Started?
					</h3>
					<p className="mx-auto mb-6 max-w-md text-muted-foreground">
						Tell us more about your competition and we&apos;ll get back to you
						as soon as possible.
					</p>
					<Button asChild size="lg">
						<a href="mailto:advertise@techfusion.id">
							Contact us to learn more
						</a>
					</Button>
					<p className="mt-4 text-muted-foreground text-sm">
						Or email us directly at{" "}
						<a
							className="text-primary hover:underline"
							href="mailto:advertise@techfusion.id"
						>
							advertise@techfusion.id
						</a>
					</p>
				</CardContent>
			</Card>
		</main>
	);
}
