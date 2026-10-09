import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";

import { ThemeProvider } from "@/components/layout/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { brand, profile, seo, ui } from "@/content/data";
import { SITE_URL, THEME_COLOR_DARK } from "@/lib/constants";

import "./globals.css";

/* Fonte servida pelo próprio site (o Next baixa e hospeda no build). */
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: seo.title, template: `%s | ${brand.name}` },
  description: seo.description,
  applicationName: brand.name,
  authors: [{ name: profile.name, url: SITE_URL }],
  creator: profile.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    locale: "pt_BR",
    url: "/",
    siteName: brand.name,
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
    <html lang="pt-BR" className={jakarta.variable} suppressHydrationWarning>
      <body>
        <a
          href="#conteudo"
          className="absolute -top-25 left-4 z-100 rounded-md bg-primary px-4 py-2.5 font-medium text-primary-foreground focus:top-4"
        >
          {ui.skip}
        </a>
        <ThemeProvider>
          {children}
          <Toaster position="bottom-center" />
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
