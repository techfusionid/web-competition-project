export default function TermsPage() {
	return (
		<main className="container max-w-4xl py-8">
			<div className="mb-8">
				<h1 className="mb-2 font-bold text-3xl text-foreground">
					Terms of Service
				</h1>
				<p className="text-muted-foreground">Last updated: January 2025</p>
			</div>

			<div className="prose prose-neutral dark:prose-invert max-w-none">
				<section className="mb-8">
					<h2 className="mb-3 font-semibold text-foreground text-xl">
						1. Introduction
					</h2>
					<p className="text-muted-foreground leading-relaxed">
						Welcome to Competitions. By accessing or using our platform, you
						agree to be bound by these Terms of Service. Please read them
						carefully.
					</p>
				</section>

				<section className="mb-8">
					<h2 className="mb-3 font-semibold text-foreground text-xl">
						2. Use of Platform
					</h2>
					<p className="mb-3 text-muted-foreground leading-relaxed">
						You agree to use Competitions only for lawful purposes and in
						accordance with these Terms. You agree not to:
					</p>
					<ul className="ml-4 list-inside list-disc space-y-1 text-muted-foreground">
						<li>Submit false or misleading information about competitions</li>
						<li>
							Post content that is harmful, offensive, or violates any laws
						</li>
						<li>Attempt to gain unauthorized access to our systems</li>
						<li>
							Use the platform for any commercial purposes without permission
						</li>
					</ul>
				</section>

				<section className="mb-8">
					<h2 className="mb-3 font-semibold text-foreground text-xl">
						3. Competition Listings
					</h2>
					<p className="text-muted-foreground leading-relaxed">
						Competitions serves as a platform to discover competitions. We do
						not organize, endorse, or guarantee the accuracy of competition
						listings. Users are encouraged to verify competition details
						directly with organizers.
					</p>
				</section>

				<section className="mb-8">
					<h2 className="mb-3 font-semibold text-foreground text-xl">
						4. User Accounts
					</h2>
					<p className="text-muted-foreground leading-relaxed">
						You are responsible for maintaining the confidentiality of your
						account credentials. You agree to notify us immediately of any
						unauthorized use of your account.
					</p>
				</section>

				<section className="mb-8">
					<h2 className="mb-3 font-semibold text-foreground text-xl">
						5. Intellectual Property
					</h2>
					<p className="text-muted-foreground leading-relaxed">
						All content on Competitions, including text, graphics, logos, and
						software, is owned by Competitions or its licensors and is protected
						by intellectual property laws.
					</p>
				</section>

				<section className="mb-8">
					<h2 className="mb-3 font-semibold text-foreground text-xl">
						6. Limitation of Liability
					</h2>
					<p className="text-muted-foreground leading-relaxed">
						Competitions shall not be liable for any indirect, incidental,
						special, or consequential damages resulting from the use or
						inability to use our platform.
					</p>
				</section>

				<section className="mb-8">
					<h2 className="mb-3 font-semibold text-foreground text-xl">
						7. Changes to Terms
					</h2>
					<p className="text-muted-foreground leading-relaxed">
						We reserve the right to modify these terms at any time. Continued
						use of the platform after changes constitutes acceptance of the new
						terms.
					</p>
				</section>

				<section>
					<h2 className="mb-3 font-semibold text-foreground text-xl">
						8. Contact Us
					</h2>
					<p className="text-muted-foreground leading-relaxed">
						If you have questions about these Terms, please contact us at{" "}
						<a
							className="text-primary hover:underline"
							href="mailto:support@competitions.id"
						>
							support@competitions.id
						</a>
					</p>
				</section>
			</div>
		</main>
	);
}
