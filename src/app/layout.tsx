import { Agentation } from "agentation";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import { Amplitude } from "@/amplitude";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { PostHogProvider } from "@/components/posthog-provider";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

const greedStandard = localFont({
	src: "../fonts/GreedStandard-TRIAL-Regular.otf",
	variable: "--font-greed-standard",
	weight: "400",
	display: "swap",
});

const geistMono = Geist_Mono({
	subsets: ["latin"],
	variable: "--font-geist-mono",
});

export const metadata: Metadata = {
	title: {
		default: "Competitions - Discover & Join Exciting Competitions",
		template: "%s | Competitions",
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
	authors: [{ name: "Competitions" }],
	manifest: "/manifest.json",
	appleWebApp: {
		capable: true,
		statusBarStyle: "black-translucent",
		title: "Web Competition",
	},
	openGraph: {
		type: "website",
		locale: "en_US",
		url: "https://competitions.com",
		siteName: "Competitions",
		title: "Competitions - Discover & Join Exciting Competitions",
		description:
			"Discover and join competitions across various categories including Technology, Business, Science, Design, Arts, and more.",
	},
	twitter: {
		card: "summary_large_image",
		title: "Competitions - Discover & Join Exciting Competitions",
		description:
			"Discover and join competitions across various categories including Technology, Business, Science, Design, Arts, and more.",
	},
	robots: {
		index: true,
		follow: true,
	},
};

export const viewport: Viewport = {
	themeColor: "#3b82f6",
};

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<link href="/favicon.svg" rel="icon" type="image/svg+xml"></link>
				<link href="/manifest.json" rel="manifest"></link>
				<link href="/apple-touch-icon.png" rel="apple-touch-icon"></link>
			</head>
			<body
				className={`${greedStandard.variable} ${geistMono.variable} font-sans antialiased`}
			>
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
				{process.env.NODE_ENV === "development" && <Agentation />}
			</body>
		</html>
	);
}
