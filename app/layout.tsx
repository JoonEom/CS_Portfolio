import type { Metadata } from "next";
import { Archivo, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { RouteTransition } from "@/components/route-transition";
import { getSiteInfo } from "@/lib/content";

// One family does both jobs: the width axis gives a tall, narrow display
// voice (jersey lettering) and a normal-width reading voice.
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
});

// Reserved for measurements: dates, counts, distances.
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://minjooneom.us";
const siteInfo = getSiteInfo();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteInfo.name} — ${siteInfo.tagline}`,
    template: `%s — ${siteInfo.name}`,
  },
  description: siteInfo.description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${siteInfo.name} — ${siteInfo.tagline}`,
    description: siteInfo.description,
    url: siteUrl,
    siteName: `${siteInfo.name} Portfolio`,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteInfo.name} — ${siteInfo.tagline}`,
    description: siteInfo.description,
  },
  authors: [{ name: siteInfo.name, url: siteUrl }],
  creator: siteInfo.name,
  robots: {
    index: true,
    follow: true,
  },
};

// Applies the stored theme before first paint so the page never flashes the
// wrong palette. Mirrors the defaults in components/theme-provider.tsx.
const themeScript = `(function(){try{var t=localStorage.getItem("portfolio-theme");if(t!=="light"&&t!=="dark"){t="dark"}document.documentElement.classList.add(t);document.documentElement.dataset.theme=t}catch(e){document.documentElement.classList.add("dark")}})()`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="bg-background text-foreground antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-sm focus:bg-court focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-ink"
        >
          Skip to content
        </a>
        <ThemeProvider>
          <div className="relative flex min-h-screen flex-col">
            <Navbar />
            <main id="main" className="flex-1">
              <RouteTransition>{children}</RouteTransition>
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
