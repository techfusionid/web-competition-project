import localFont from "next/font/local";
import { Geist, Geist_Mono } from "next/font/google";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
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
   description: "Discover and join competitions across various categories including Technology, Business, Science, Design, Arts, and more. Find your next competition and showcase your skills.",
   keywords: ["competitions", "contests", "awards", "challenges", "technology competitions", "business competitions", "design competitions"],
   authors: [{ name: "Competitions" }],
   openGraph: {
      type: "website",
      locale: "en_US",
      url: "https://competitions.com",
      siteName: "Competitions",
      title: "Competitions - Discover & Join Exciting Competitions",
      description: "Discover and join competitions across various categories including Technology, Business, Science, Design, Arts, and more.",
   },
   twitter: {
      card: "summary_large_image",
      title: "Competitions - Discover & Join Exciting Competitions",
      description: "Discover and join competitions across various categories including Technology, Business, Science, Design, Arts, and more.",
   },
   robots: {
      index: true,
      follow: true,
   },
};

export default function RootLayout({
   children,
}: Readonly<{children: React.ReactNode;}>) {
   return (
      <html lang="en" suppressHydrationWarning>
         <head>
            <link href="/favicon.svg" rel="icon" type="image/svg+xml"></link>
         </head>
         <body className={`${greedStandard.variable} ${geistMono.variable} font-sans antialiased`}>
            <ThemeProvider attribute="class" defaultTheme="system" disableTransitionOnChange enableSystem>
               <Header />
               <main className="min-h-[calc(100vh-140px)]">
                  {children}
               </main>
               <Footer />
            </ThemeProvider>
         </body>
      </html>
   );
}
