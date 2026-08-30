import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://aryans-web.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Aryan Goswami — Illustrator / Animator Portfolio",
    template: "%s — Aryan Goswami",
  },
  description:
    "Aryan Goswami is an illustrator and animator working across graphic novels, texturing, and character-driven visual storytelling. This is a sketchbook turned digital exhibition.",
  openGraph: {
    title: "Aryan Goswami — Illustrator / Animator Portfolio",
    description:
      "Aryan Goswami is an illustrator and animator working across graphic novels, texturing, and character-driven visual storytelling.",
    url: siteUrl,
    siteName: "Aryan Goswami",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aryan Goswami — Illustrator / Animator Portfolio",
    description:
      "Aryan Goswami is an illustrator and animator working across graphic novels, texturing, and character-driven visual storytelling.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${bricolage.variable} ${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased grain">
        <CustomCursor />
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
