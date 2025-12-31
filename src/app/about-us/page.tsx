import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Building2, Shield, Briefcase, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function About() {
	return (
		<div className="min-h-screen flex flex-col bg-background">
			<Header />

			<main className="flex-1 container py-8 max-w-4xl">
				{/* Hero Section */}
				<div className="mb-12">
					<h1 className="text-4xl font-bold text-foreground mb-4">About Us</h1>
					<p className="text-lg text-muted-foreground">
						EuroAlternative is a community driven list of European alternatives
						to big tech software companies.
					</p>
				</div>

				{/* What is EuroAlternative */}
				<section className="mb-12">
					<h2 className="text-2xl font-bold text-foreground mb-4">
						What is EuroAlternative?
					</h2>
					<div className="space-y-4 text-muted-foreground">
						<p>
							EuroAlternative is my passion project to showcase European-made
							alternatives to big tech services. I created this directory
							because I believe in a digital landscape where European innovation
							thrives alongside global tech giants. This site aims to be your
							go-to resource when looking for digital services that support our
							European economy.
						</p>
						<p>
							This directory grows stronger with community involvement. Share
							your discoveries, experiences, and suggestions as we build a more
							diverse European digital ecosystem together. Let&apos;s show that
							European tech can thrive when we support each other!
						</p>
					</div>
				</section>

				{/* Why did I start this project */}
				<section className="mb-12">
					<h2 className="text-2xl font-bold text-foreground mb-4">
						Why did I start this project?
					</h2>
					<div className="space-y-4 text-muted-foreground">
						<p>
							The idea came to me when I was struggling to find European cloud
							services for my own business. I realized how difficult it was to
							discover these alternatives despite the amazing tech talent we
							have in Europe. So I decided to build the resource I wished
							existed.
						</p>
						<p>
							I&apos;ve always been passionate about digital sovereignty and
							supporting local businesses. Creating this directory felt like the
							perfect way to connect European developers with users who want
							alternatives that align with European values and regulations.
						</p>
					</div>
				</section>

				{/* What makes European alternatives special */}
				<section className="mb-12">
					<h2 className="text-2xl font-bold text-foreground mb-6">
						What makes European alternatives special?
					</h2>
					<div className="grid gap-4 md:grid-cols-3">
						<Card>
							<CardContent className="p-6">
								<div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-4">
									<Building2 className="h-6 w-6 text-primary" />
								</div>
								<h3 className="font-semibold text-foreground mb-2">
									They keep money in our economy
								</h3>
								<p className="text-sm text-muted-foreground">
									When we choose European services, we support local jobs and
									innovation. Our spending circulates in Europe rather than
									flowing overseas.
								</p>
							</CardContent>
						</Card>

						<Card>
							<CardContent className="p-6">
								<div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-4">
									<Shield className="h-6 w-6 text-primary" />
								</div>
								<h3 className="font-semibold text-foreground mb-2">
									They respect our privacy values
								</h3>
								<p className="text-sm text-muted-foreground">
									European companies typically take GDPR seriously, keeping our
									data under stronger protection frameworks that reflect
									European privacy values.
								</p>
							</CardContent>
						</Card>

						<Card>
							<CardContent className="p-6">
								<div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-4">
									<Briefcase className="h-6 w-6 text-primary" />
								</div>
								<h3 className="font-semibold text-foreground mb-2">
									They simplify business for European companies
								</h3>
								<p className="text-sm text-muted-foreground">
									From VAT refunds to familiar payment methods and consistent
									regulations, working with other European businesses just makes
									sense.
								</p>
							</CardContent>
						</Card>
					</div>
					<p className="mt-6 text-muted-foreground text-center">
						Join me in supporting European alternatives and help us build a
						stronger European digital ecosystem! Let&apos;s make Europe great
						again!
					</p>
				</section>

				{/* Conditions for listing */}
				<section className="mb-12">
					<h2 className="text-2xl font-bold text-foreground mb-4">
						Conditions for listing
					</h2>
					<p className="text-muted-foreground mb-4">
						For a product or service to be featured on European Alternatives, it
						must meet these criteria:
					</p>
					<ul className="space-y-3 text-muted-foreground">
						<li className="flex gap-3">
							<span className="font-semibold text-foreground">
								European Headquarters
							</span>
							<span>
								— The company must be based in an EU, EEA, EFTA, or DCFTA member
								country.
							</span>
						</li>
						<li className="flex gap-3">
							<span className="font-semibold text-foreground">
								European Ownership
							</span>
							<span>
								— Any parent or holding company must also be based in an EU,
								EEA, EFTA, or DCFTA member state.
							</span>
						</li>
						<li className="flex gap-3">
							<span className="font-semibold text-foreground">
								True European Hosting
							</span>
							<span>
								— For hosting providers, we don&apos;t list services that are
								simply resellers or sub-hosting providers of non-European
								companies (for example, those just configuring AWS servers).
							</span>
						</li>
					</ul>
					<p className="mt-4 text-muted-foreground">
						If you notice any listing that doesn&apos;t meet these criteria,
						please let me know!
					</p>
				</section>

				{/* About the Author */}
				<section className="mb-12">
					<h2 className="text-2xl font-bold text-foreground mb-4">
						About the Author
					</h2>
					<div className="space-y-4 text-muted-foreground">
						<p>
							I&apos;m a software developer and entrepreneur. I&apos;ve been
							building web applications for over 15 years. I&apos;m passionate
							about software development and I love to contribute to the
							community in any way I can.
						</p>
						<p className="font-semibold text-foreground">
							Some of my other projects:
						</p>
						<ul className="space-y-2">
							<li className="flex items-center gap-2">
								<ExternalLink className="h-4 w-4 text-primary" />
								<span className="font-medium text-foreground">
									OpenAlternative
								</span>
								<span>
									– Discover open source alternatives to popular software
								</span>
							</li>
							<li className="flex items-center gap-2">
								<ExternalLink className="h-4 w-4 text-primary" />
								<span className="font-medium text-foreground">DevSuite</span>
								<span>
									– Find the perfect developer tools for your next project
								</span>
							</li>
							<li className="flex items-center gap-2">
								<ExternalLink className="h-4 w-4 text-primary" />
								<span className="font-medium text-foreground">OpenAds</span>
								<span>
									– Automate ad spot management and increase website revenue
								</span>
							</li>
							<li className="flex items-center gap-2">
								<ExternalLink className="h-4 w-4 text-primary" />
								<span className="font-medium text-foreground">Dirstarter</span>
								<span>– Next.js directory website boilerplate</span>
							</li>
						</ul>
						<p>
							I&apos;m always looking for new projects to work on and new people
							to collaborate with. Feel free to reach out to me if you have any
							questions or suggestions.
						</p>
						<p className="font-semibold text-foreground">– Piotr Kulpinski</p>
					</div>
				</section>
			</main>

			<Footer />
		</div>
	);
}
