import type { Metadata } from "next";
import { Noto_Sans, Noto_Sans_Devanagari } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const noto = Noto_Sans({ variable: "--font-noto", subsets: ["latin"] });
const deva = Noto_Sans_Devanagari({ variable: "--font-deva", subsets: ["devanagari"] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://sarvjansanatanparty.in"),
  title: { default: "Sarvjan Sanatan Party (SSP)", template: "%s | Sarvjan Sanatan Party" },
  description:
    "Sarvjan Sanatan Party – Modern India rooted in its civilisation. A political alternative built around education, healthcare, livelihood and cultural preservation.",
  icons: { icon: "/images/logo.webp" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${noto.variable} ${deva.variable} antialiased`}>
      <body className="flex min-h-screen flex-col overflow-x-hidden">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
