import { Metadata } from "next";
import ClientLayout from "./ClientLayout";

export const metadata: Metadata = {
  title: "Admin Dashboard Overview | MSA DIU Portal",
  description:
    "Central control panel for MSA DIU. Monitor live database statistics, quick actions, and manage overall student community operations.",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ClientLayout>{children}</ClientLayout>;
}
