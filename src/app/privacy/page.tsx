export default function PrivacyPage() {
	return (
		<main className="container max-w-4xl py-8">
			<div className="mb-8">
				<h1 className="mb-2 font-bold text-3xl text-foreground">
					Privacy Policy
				</h1>
				<p className="text-muted-foreground">Last updated: January 2025</p>
			</div>

			<div className="prose prose-neutral dark:prose-invert max-w-none">
				<section className="mb-8">
					<h2 className="mb-3 font-semibold text-foreground text-xl">
						1. Information We Collect
					</h2>
					<p className="mb-3 text-muted-foreground leading-relaxed">
						We collect information you provide directly to us, including:
					</p>
					<ul className="ml-4 list-inside list-disc space-y-1 text-muted-foreground">
						<li>Account information (name, email address, password)</li>
						<li>Profile information (optional details you choose to share)</li>
						<li>Usage data (how you interact with our platform)</li>
						<li>
							Device information (IP address, browser type, operating system)
						</li>
					</ul>
				</section>

				<section className="mb-8">
					<h2 className="mb-3 font-semibold text-foreground text-xl">
						2. How We Use Your Information
					</h2>
					<p className="mb-3 text-muted-foreground leading-relaxed">
						We use the information we collect to:
					</p>
					<ul className="ml-4 list-inside list-disc space-y-1 text-muted-foreground">
						<li>Provide, maintain, and improve our services</li>
						<li>Process transactions and send related information</li>
						<li>Send technical notices and support messages</li>
						<li>
							Respond to comments, questions, and customer service requests
						</li>
						<li>Monitor and analyze trends, usage, and activities</li>
					</ul>
				</section>

				<section className="mb-8">
					<h2 className="mb-3 font-semibold text-foreground text-xl">
						3. Information Sharing
					</h2>
					<p className="mb-3 text-muted-foreground leading-relaxed">
						We do not sell, trade, or rent your personal information to third
						parties. We may share your information only in the following
						circumstances:
					</p>
					<ul className="ml-4 list-inside list-disc space-y-1 text-muted-foreground">
						<li>With service providers who assist in operating our platform</li>
						<li>
							To comply with legal obligations or respond to lawful requests
						</li>
						<li>To protect our rights, privacy, safety, or property</li>
						<li>With your consent for any other purpose</li>
					</ul>
				</section>

				<section className="mb-8">
					<h2 className="mb-3 font-semibold text-foreground text-xl">
						4. Data Security
					</h2>
					<p className="text-muted-foreground leading-relaxed">
						We implement reasonable security measures to protect your personal
						information against unauthorized access, alteration, disclosure, or
						destruction. However, no method of transmission over the internet is
						100% secure.
					</p>
				</section>

				<section className="mb-8">
					<h2 className="mb-3 font-semibold text-foreground text-xl">
						5. Cookies
					</h2>
					<p className="text-muted-foreground leading-relaxed">
						We use cookies and similar tracking technologies to track activity
						on our platform and hold certain information. Cookies are files with
						a small amount of data which may include an anonymous unique
						identifier.
					</p>
				</section>

				<section className="mb-8">
					<h2 className="mb-3 font-semibold text-foreground text-xl">
						6. Your Rights
					</h2>
					<p className="mb-3 text-muted-foreground leading-relaxed">
						You have the right to:
					</p>
					<ul className="ml-4 list-inside list-disc space-y-1 text-muted-foreground">
						<li>Access and receive a copy of your personal data</li>
						<li>Rectify inaccurate or incomplete data</li>
						<li>Request deletion of your personal data</li>
						<li>Object to processing of your personal data</li>
						<li>Withdraw consent at any time</li>
					</ul>
				</section>

				<section className="mb-8">
					<h2 className="mb-3 font-semibold text-foreground text-xl">
						7. Third-Party Links
					</h2>
					<p className="text-muted-foreground leading-relaxed">
						Our platform may contain links to third-party websites. We have no
						control over the content, privacy policies, or practices of these
						sites and are not responsible for them.
					</p>
				</section>

				<section className="mb-8">
					<h2 className="mb-3 font-semibold text-foreground text-xl">
						8. Children's Privacy
					</h2>
					<p className="text-muted-foreground leading-relaxed">
						Our platform is not intended for children under 13 years of age. We
						do not knowingly collect personal information from children under
						13.
					</p>
				</section>

				<section>
					<h2 className="mb-3 font-semibold text-foreground text-xl">
						9. Changes to This Policy
					</h2>
					<p className="text-muted-foreground leading-relaxed">
						We may update our Privacy Policy from time to time. We will notify
						you of any changes by posting the new policy on this page and
						updating the "Last updated" date.
					</p>
				</section>
			</div>
		</main>
	);
}
