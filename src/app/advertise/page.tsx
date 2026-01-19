import {
	Megaphone,
	Users,
	Eye,
	Mail,
	Star,
	Building,
	Trophy,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const advertisers = [
	{ name: "ITB", logo: "https://upload.wikimedia.org/wikipedia/id/9/95/Logo_Institut_Teknologi_Bandung.png" },
	{ name: "UI", logo: "https://upload.wikimedia.org/wikipedia/id/thumb/0/0f/Makara_of_Universitas_Indonesia.svg/250px-Makara_of_Universitas_Indonesia.svg.png" },
	{ name: "Google", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQN1HgAOQZBf48TI55AvzbnfV0IFrCCrX6ldg&s" },
	{ name: "UGM", logo: "https://innopa.org/wp-content/uploads/logo-ugm.png" },
];

const audienceBreakdown = [
	{ role: "University Students", percentage: 60 },
	{ role: "High School Students", percentage: 25 },
	{ role: "Young Professionals", percentage: 15 },
];

export default function AdvertisePage() {
	return (
		<>
			<main className="container py-16 md:py-24">
					{/* Hero */}
					<div className="mx-auto max-w-3xl text-center mb-16">
						<h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6">
							Advertise
						</h1>
						<h2 className="text-xl md:text-2xl text-muted-foreground mb-8">
							Promote your competition on TechFusion and reach a wide audience of students and competition enthusiasts across Indonesia.
						</h2>
						<p className="text-muted-foreground">
							Reach an engaged community of over{" "}
							<strong className="text-foreground">10,000 monthly visitors</strong>
							{" "}who trust TechFusion as their go-to resource for discovering competitions. Our platform connects you with passionate students, young professionals, and institutions who are constantly looking for opportunities to showcase their talents and skills.
						</p>
					</div>

					{/* Stats */}
					<div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
						<Card>
							<CardContent className="pt-6 text-center">
								<Eye className="h-6 w-6 text-primary mx-auto mb-2" />
								<div className="text-2xl md:text-3xl font-bold text-foreground">10K+</div>
								<p className="text-sm text-muted-foreground">Monthly Visitors</p>
							</CardContent>
						</Card>
						<Card>
							<CardContent className="pt-6 text-center">
								<Trophy className="h-6 w-6 text-primary mx-auto mb-2" />
								<div className="text-2xl md:text-3xl font-bold text-foreground">500+</div>
								<p className="text-sm text-muted-foreground">Competitions Listed</p>
							</CardContent>
						</Card>
						<Card>
							<CardContent className="pt-6 text-center">
								<Mail className="h-6 w-6 text-primary mx-auto mb-2" />
								<div className="text-2xl md:text-3xl font-bold text-foreground">1.5K+</div>
								<p className="text-sm text-muted-foreground">Newsletter Subscribers</p>
							</CardContent>
						</Card>
						<Card>
							<CardContent className="pt-6 text-center">
								<Building className="h-6 w-6 text-primary mx-auto mb-2" />
								<div className="text-2xl md:text-3xl font-bold text-foreground">100+</div>
								<p className="text-sm text-muted-foreground">Partner Institutions</p>
							</CardContent>
						</Card>
					</div>

					<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
						{/* Why Advertise */}
						<div>
							<h3 className="text-lg font-semibold text-foreground mb-4">
								Why Advertise With Us
							</h3>
							<p className="text-muted-foreground mb-6">
								Our audience is deeply invested in academic and professional development, from hackathons and case competitions to olympiads and innovation challenges. Whether you&apos;re promoting a university competition, corporate challenge, or any talent search, you&apos;ll find an engaged community ready to participate and compete.
							</p>

							<h3 className="text-lg font-semibold text-foreground mb-4">
								Our Audience
							</h3>
							<ul className="space-y-2 text-muted-foreground">
								<li>University Students (60%)</li>
								<li>High School Students (25%)</li>
								<li>Young Professionals (15%)</li>
							</ul>
							<p className="text-muted-foreground mt-4">
								Our community spans across top universities, schools, and companies across Indonesia. What brings them together is a shared passion for learning, competing, and building their portfolios through meaningful competitions.
							</p>
						</div>

						{/* Audience Chart */}
						<Card>
							<CardContent className="pt-6">
								<h3 className="text-lg font-semibold text-foreground mb-6">
									Audience Breakdown
								</h3>
								<div className="space-y-4">
									{audienceBreakdown.map((item) => (
										<div key={item.role}>
											<div className="flex justify-between text-sm mb-1">
												<span className="text-foreground">{item.role}</span>
												<span className="font-medium text-foreground">{item.percentage}%</span>
											</div>
											<div className="h-2 w-full rounded-full bg-muted overflow-hidden">
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
							<p className="text-muted-foreground mb-6">
								<span className="text-foreground font-semibold">TechFusion has been instrumental</span> in helping us reach thousands of students across Indonesia for our annual competition. The platform delivered great results, giving us a noticeable{" "}
								<strong className="text-foreground">30–40% increase in registrations</strong> compared to previous years. Highly recommended for any institution looking to promote their competitions!
							</p>
							<div className="flex items-center gap-3">
								<div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
									<Users className="h-5 w-5 text-primary" />
								</div>
								<div>
									<p className="font-semibold text-foreground">Competition Committee</p>
									<p className="text-sm text-muted-foreground">Top University in Indonesia</p>
								</div>
							</div>
						</CardContent>
					</Card>

					{/* Ad Options */}
					<div className="mb-16">
						<h3 className="text-lg font-semibold text-foreground mb-4">
							Advertising Options
						</h3>
						<p className="text-muted-foreground mb-6">
							We offer various advertising opportunities including:
						</p>
						<ul className="space-y-2 text-muted-foreground mb-6">
							<li className="flex items-center gap-2">
								<Star className="h-4 w-4 text-primary shrink-0" />
								Featured listings on our homepage
							</li>
							<li className="flex items-center gap-2">
								<Star className="h-4 w-4 text-primary shrink-0" />
								Sponsoring and banner ads
							</li>
							<li className="flex items-center gap-2">
								<Star className="h-4 w-4 text-primary shrink-0" />
								Newsletter sponsorships
							</li>
							<li className="flex items-center gap-2">
								<Star className="h-4 w-4 text-primary shrink-0" />
								Custom partnership opportunities
							</li>
						</ul>
					</div>

					{/* Past Advertisers */}
					<div className="mb-16">
						<p className="text-sm text-muted-foreground mb-6 text-center">
							Join these institutions in advertising on TechFusion
						</p>
						<div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
							{advertisers.map((advertiser) => (
								<div key={advertiser.name} className="flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity">
									<img
										src={advertiser.logo}
										alt={advertiser.name}
										className="h-8 w-auto object-contain"
									/>
								</div>
							))}
						</div>
					</div>

					{/* CTA */}
					<Card className="bg-primary/5 border-primary/20">
						<CardContent className="pt-8 pb-8 text-center">
							<Megaphone className="h-10 w-10 text-primary mx-auto mb-4" />
							<h3 className="text-xl font-semibold text-foreground mb-2">
								Ready to Get Started?
							</h3>
							<p className="text-muted-foreground mb-6 max-w-md mx-auto">
								Tell us more about your competition and we&apos;ll get back to you as soon as possible.
							</p>
							<Button asChild size="lg">
								<a href="mailto:advertise@techfusion.id">
									Contact us to learn more
								</a>
							</Button>
							<p className="text-sm text-muted-foreground mt-4">
								Or email us directly at{" "}
								<a href="mailto:advertise@techfusion.id" className="text-primary hover:underline">
									advertise@techfusion.id
								</a>
							</p>
						</CardContent>
					</Card>
			</main>
		</>
	);
}
