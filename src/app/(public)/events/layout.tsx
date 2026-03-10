import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Upcoming Events & Programs | MSA DIU",
  description:
    "Stay updated with the latest events, get-togethers, and official programs of the Manikganj Student Association at DIU.",
  alternates: {
    canonical: "https://msa-diu-website.vercel.app/events",
  },
};

export default function EventsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
