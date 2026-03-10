import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | MSA DIU - Get in Touch",
  description:
    "Reach out to the Manikganj Student Association at DIU. Find our contact info, location, and connect with the MSA executive committee.",
  alternates: {
    canonical: "https://msa-diu-website.vercel.app/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
