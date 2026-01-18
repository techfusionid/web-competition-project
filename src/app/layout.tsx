import localFont from "next/font/local";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
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

type Metadata = {
   title?: string;
   description?: string;
   [key: string]: any;
};

export const metadata: Metadata = {
   title: "Web Competition",
   description: "Web Competition",
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
               {children}
            </ThemeProvider>
         </body>
      </html>
   );
}
