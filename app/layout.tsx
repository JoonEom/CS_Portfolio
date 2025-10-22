import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { RouteTransition } from "@/components/route-transition";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://cs-portfolio.example.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Minjoon Eom — Full stack developer and AI researcher",
  description:
    "The evolving portfolio of Minjoon Eom, spotlighting full stack work, AI research, and selected projects.",
  openGraph: {
    title: "Minjoon Eom — Full stack developer and AI researcher",
    description:
      "Explore Minjoon Eom's full stack builds, AI research notes, and experiments.",
    url: siteUrl,
    siteName: "Minjoon Eom Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Minjoon Eom — Full stack developer and AI researcher",
    description:
      "Showcasing engineering stories, AI explorations, and projects by Minjoon Eom.",
  },
  authors: [{ name: "Minjoon Eom" }],
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
          <div className="flex min-h-screen flex-col bg-[#f8f9ff] dark:bg-slate-950">
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
