import type { Metadata } from "next";
import { Archivo, Spline_Sans } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
  variable: "--font-archivo",
  display: "swap",
});

const splineSans = Spline_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-spline",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://horde-m.agency.ng"),
  title: {
    default: "Horde-M — software, email and engineering for small businesses",
    template: "%s — Horde-M",
  },
  description:
    "Horde-M is an agency and collective for small businesses and independent operators: software builds, custom business email, and contract engineering from one place instead of four vendors.",
  openGraph: {
    title: "Horde-M",
    description:
      "Software builds, business email and contract engineering for the operators who were never going to hire four vendors.",
    type: "website",
    locale: "en_NG",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${archivo.variable} ${splineSans.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-plate focus:bg-brass focus:px-4 focus:py-2 focus:font-semibold focus:text-gunmetal"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
