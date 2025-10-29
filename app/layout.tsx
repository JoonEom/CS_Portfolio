import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { RouteTransition } from "@/components/route-transition";
import { getSiteInfo } from "@/lib/content";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://cs-portfolio.example.com";
const siteInfo = getSiteInfo();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: `${siteInfo.name} — ${siteInfo.tagline}`,
  description: siteInfo.description,
  openGraph: {
    title: `${siteInfo.name} — ${siteInfo.tagline}`,
    description: siteInfo.description,
    url: siteUrl,
    siteName: `${siteInfo.name} Portfolio`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteInfo.name} — ${siteInfo.tagline}`,
    description: siteInfo.description,
  },
  authors: [{ name: siteInfo.name }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`light ${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased bg-background text-foreground">
        <ThemeProvider>
          <div className="flex min-h-screen flex-col bg-orange-50 dark:bg-orange-950">
            <Navbar />
            <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-12">
              <RouteTransition>{children}</RouteTransition>
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
