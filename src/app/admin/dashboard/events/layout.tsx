import { Metadata } from "next";

export const metadata: Metadata = {

  title: "Event Management System | MSA DIU Admin",

  description:
    "Organize upcoming campus activities, upload event galleries, and manage event schedules for the Manikganj Student Association.",
};

export default function ManageEventsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
