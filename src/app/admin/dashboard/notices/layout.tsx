import { Metadata } from "next";

export const metadata: Metadata = {
 
  title: "Manage Campus Notices | MSA DIU Admin",

  description:
    "Create, edit, and publish official notices for the Manikganj Student Association at Daffodil International University efficiently.",
};

export default function ManageNoticesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
