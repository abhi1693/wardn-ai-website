import type { Metadata, Viewport } from "next";
import { DM_Mono, Manrope } from "next/font/google";
import type { ReactNode } from "react";

import { DeferredGoogleAnalytics } from "@/components/analytics/deferred-google-analytics";

import "./globals.css";

const defaultGoogleAnalyticsId = "G-TB10XGBRDT";

function googleAnalyticsId() {
  if (process.env.NODE_ENV !== "production") return "";
  return process.env.GOOGLE_ANALYTICS_ID?.trim() || defaultGoogleAnalyticsId;
}

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://wardnai.dev"),
  title: "Wardn AI — Governed tools for AI agents",
  description:
    "Wardn AI is the self-hosted control plane for governed AI tool access. Curate MCP servers, run agents, enforce approvals, and trace every action.",
  applicationName: "Wardn AI",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Wardn AI — Governed tools for AI agents",
    description: "Give AI agents tools. Keep control.",
    url: "/",
    siteName: "Wardn AI",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Wardn AI — Governed tools for AI agents",
    description: "Give AI agents tools. Keep control.",
  },
};

export const viewport: Viewport = {
  themeColor: "#071310",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  const gaId = googleAnalyticsId();

  return (
    <html lang="en" className={`${manrope.variable} ${dmMono.variable}`}>
      <body>
        {children}
        {gaId ? <DeferredGoogleAnalytics gaId={gaId} /> : null}
      </body>
    </html>
  );
}
