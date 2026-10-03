import type { Metadata, Viewport } from "next";
import RevealObserver from "@/components/RevealObserver";
import "./globals.css";
import "../tokens.css";
import "./portfolio.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#0b0b0a",
};

const description = "Software engineer in Toronto. I build mobile products, document tools, and the services behind them.";

export const metadata: Metadata = {
  // Absolute base for the share image; set NEXT_PUBLIC_SITE_URL if the site lives elsewhere.
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://aradhya.dev"),
  title: "Aradhya Singh — Software Engineer",
  description,
  openGraph: {
    title: "Aradhya Singh — Software Engineer",
    description,
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 627, alt: "Aradhya Singh, software engineer in Toronto, with the Hushfield app" }],
  },
  twitter: { card: "summary_large_image", images: ["/og.png"] },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600&family=Instrument+Serif&family=Geist:wght@300&family=Geist+Mono:wght@400;500&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased">
        {children}
        <RevealObserver />
      </body>
    </html>
  );
}
