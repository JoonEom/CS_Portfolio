import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { RouteTransition } from "@/components/route-transition";
import { ScrollProgress } from "@/components/scroll-progress";
import { getSiteInfo } from "@/lib/content";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        {/* Entrance animations are rendered at opacity:0 and revealed by JS.
            Without this, a visitor with scripts blocked sees an empty page. */}
        <noscript>
          <style>{`[style*="opacity:0"]{opacity:1!important;transform:none!important;filter:none!important}`}</style>
        </noscript>
      </head>
      <body className="bg-background text-foreground antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-accent-orange focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>
        <ThemeProvider>
          <ScrollProgress />
          <div className="relative flex min-h-screen flex-col">
            {/* Warm ambient wash behind the whole page */}
            <div
              aria-hidden="true"
              className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-[32rem] bg-[radial-gradient(60rem_28rem_at_50%_-6rem,rgb(var(--accent-orange)/0.10),transparent)]"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none fixed inset-0 -z-10 opacity-[0.03] [background-image:radial-gradient(rgb(var(--foreground))_1px,transparent_1px)] [background-size:22px_22px]"
            />
            <Navbar />
            <main
              id="main"
              className="mx-auto w-full max-w-5xl flex-1 px-4 py-10 sm:px-6 sm:py-14"
            >
              <RouteTransition>{children}</RouteTransition>
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
