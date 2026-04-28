import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Amplitude } from "@/amplitude";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { PostHogProvider } from "@/components/posthog-provider";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";
import { cn } from "@/lib/utils";

const greedStandard = localFont({
	src: "../fonts/GreedStandard-TRIAL-Regular.otf",
	variable: "--font-greed-standard",
	style: "normal",
	weight: "400",
	display: "swap",
});

const BASE_URL = "https://competition.techfusion.id";

export const metadata: Metadata = {
	title: {
		default:
			"Competition.TechFusion.id - Discover & Join Exciting Competitions",
		template: "%s | Competition.TechFusion.id",
	} as const,
	description:
		"Discover and join competitions across various categories including Technology, Business, Science, Design, Arts, and more. Find your next competition and showcase your skills.",
	keywords: [
		"competitions",
		"contests",
		"awards",
		"challenges",
		"technology competitions",
		"business competitions",
		"design competitions",
	],
	authors: [{ name: "TechFusion.id" }],
	manifest: "/manifest.json",
	appleWebApp: {
		capable: true,
		statusBarStyle: "black-translucent",
		title: "Competition.TechFusion.id",
	},
	openGraph: {
		type: "website",
		locale: "en_US",
		url: BASE_URL,
		siteName: "Competition.TechFusion.id",
		title: "Competition.TechFusion.id - Discover & Join Exciting Competitions",
		description:
			"Discover and join competitions across various categories including Technology, Business, Science, Design, Arts, and more.",
		images: [
			{
				url: `${BASE_URL}/og-image.jpg`,
				width: 1200,
				height: 630,
				alt: "Competition.TechFusion.id",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "Competition.TechFusion.id - Discover & Join Exciting Competitions",
		description:
			"Discover and join competitions across various categories including Technology, Business, Science, Design, Arts, and more.",
		images: [`${BASE_URL}/og-image.jpg`],
	},
	robots: {
		index: true,
		follow: true,
	},
	alternates: {
		canonical: BASE_URL,
	},
};

export const viewport: Viewport = {
	themeColor: "#3b82f6",
};

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html
			className={cn("font-sans", greedStandard.variable)}
			lang="en"
			suppressHydrationWarning
		>
			<head>
				<link href="/favicon.ico" rel="icon" sizes="32x32" />
				<link href="/icon.svg" rel="icon" type="image/svg+xml" />
				<link href="/apple-icon.png" rel="apple-touch-icon" sizes="180x180" />
				<link href="/manifest.json" rel="manifest" />
				<script
					dangerouslySetInnerHTML={{
						__html: JSON.stringify({
							"@context": "https://schema.org",
							"@type": "WebSite",
							name: "Competition.TechFusion.id",
							description:
								"Discover and join competitions across various categories including Technology, Business, Science, Design, Arts, and more.",
							url: BASE_URL,
							publisher: {
								"@type": "Organization",
								name: "TechFusion.id",
								url: BASE_URL,
							},
							potentialAction: {
								"@type": "SearchAction",
								target: {
									"@type": "EntryPoint",
									urlTemplate: `${BASE_URL}/discover?q={search_term_string}`,
								},
								"query-input": "required name=search_term_string",
							},
						}),
					}}
					type="application/ld+json"
				/>
			</head>
			<body className="font-sans antialiased">
				<Amplitude />
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					disableTransitionOnChange
					enableSystem
				>
					<TooltipProvider>
						<PostHogProvider>
							<Header />
							<main className="min-h-[calc(100vh-140px)]">{children}</main>
							<Footer />
						</PostHogProvider>
					</TooltipProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
