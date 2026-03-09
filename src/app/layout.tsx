// Path: src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AntdRegistry from "@/lib/AntdRegistry";

const inter = Inter({ subsets: ["latin"] });

// 🔹 Powerful SEO Metadata Setup 🔹
export const metadata: Metadata = {
  title: "MSA DIU | Manikganj Student Association",
  description:
    "The official platform for Manikganj Student Association (MSA) at Daffodil International University. Stay connected, explore events, and unite with our campus community.",
  keywords: [
    "MSA DIU",
    "Manikganj Student Association",
    "DIU",
    "Daffodil International University",
    "Manikganj students in DIU",
    "MSA Campus",
    "Manikganj Association",
  ],
  authors: [{ name: "MSA DIU Executive Committee" }],
  creator: "MSA DIU",
  publisher: "Manikganj Student Association",

  // Facebook, LinkedIn, WhatsApp Link Preview (Open Graph)
  openGraph: {
    title: "MSA DIU | Manikganj Student Association",
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

  // Twitter / X Link Preview
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
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <AntdRegistry>
          {/* এখানে আর কোনো Navbar থাকবে না, শুধু children থাকবে */}
          {children}
        </AntdRegistry>
      </body>
    </html>
  );
}
