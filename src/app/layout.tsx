import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AntdRegistry from "@/lib/AntdRegistry";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {

  title: "MSA DIU | Official Manikganj Student Association Platform",

  description:
    "Official platform for Manikganj Student Association at DIU. Stay connected, explore events, and join our campus community.",

  verification: {
    google: "vBOhE-VuhIiXVbQ0jiPyPPH6Cou-K6rHEa0-1a0np0w",
  },

  alternates: {
    canonical: "https://msa-diu-website.vercel.app",
  },

  keywords: [
    "MSA DIU",
    "Manikganj Student Association",
    "DIU Student Association",
    "Student Association",
    "DIU",
    "Daffodil International University",
    "Manikganj students in DIU",
    "MSA Campus",
    "Manikganj Association",
  ],
  authors: [{ name: "MSA DIU Executive Committee" }],
  creator: "MSA DIU",
  publisher: "Manikganj Student Association",

  openGraph: {
    title: "MSA DIU | Official Manikganj Student Association Platform",
    description:
      "Official community platform for Manikganj students at DIU. Join us for events, notices, and networking.",
    url: "https://msa-diu-website.vercel.app",
    siteName: "MSA DIU",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 600,
        alt: "MSA DIU Official Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "MSA DIU | Manikganj Student Association",
    description: "Official community platform for Manikganj students at DIU.",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Manikganj Student Association (MSA) - DIU",
    url: "https://msa-diu-website.vercel.app",
    logo: "https://msa-diu-website.vercel.app/logo.png",
    description:
      "The official platform for Manikganj Student Association at Daffodil International University.",
  };

  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <AntdRegistry>
          {children}
        </AntdRegistry>
      </body>
    </html>
  );
}
