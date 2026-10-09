import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";

import { ThemeProvider } from "@/components/layout/theme-provider";
import { profile, seo, ui } from "@/content/data";
import { SITE_URL, THEME_COLOR_DARK } from "@/lib/constants";

import "./globals.css";

/* Fontes auto-hospedadas (SIL Open Font License). */
const familjen = localFont({
  src: [
    { path: "./fonts/familjen-grotesk-latin.woff2", weight: "400 700", style: "normal" },
    { path: "./fonts/familjen-grotesk-latin-ext.woff2", weight: "400 700", style: "normal" },
  ],
  variable: "--font-familjen",
  display: "swap",
});

const martian = localFont({
  src: [
    { path: "./fonts/martian-mono-latin.woff2", weight: "400 500", style: "normal" },
    { path: "./fonts/martian-mono-latin-ext.woff2", weight: "400 500", style: "normal" },
  ],
  variable: "--font-martian",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: seo.title, template: `%s | ${profile.name}` },
  description: seo.description,
  applicationName: profile.name,
  authors: [{ name: profile.name, url: SITE_URL }],
  creator: profile.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    locale: "pt_BR",
    url: "/",
    siteName: profile.name,
    title: seo.title,
    description: seo.shareDescription,
    firstName: profile.givenName,
    lastName: profile.familyName,
  },
  twitter: {
    card: "summary_large_image",
    title: seo.title,
    description: seo.shareDescription,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: THEME_COLOR_DARK,
  colorScheme: "dark light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${familjen.variable} ${martian.variable}`}
      suppressHydrationWarning
    >
      <body>
        <a
          href="#conteudo"
          className="absolute -top-25 left-(--pad) z-100 rounded-sm bg-primary px-4 py-[0.7rem] font-semibold text-primary-foreground no-underline focus:top-3"
        >
          {ui.skip}
        </a>
        <ThemeProvider>{children}</ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
