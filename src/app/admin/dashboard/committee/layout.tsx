import { Metadata } from "next";

export const metadata: Metadata = {
 
  title: "Committee Member Directory | MSA DIU Admin",

  description:
    "Update executive committee profiles, manage leadership roles, and organize the core team of Manikganj Student Association at DIU.",
};

export default function ManageCommitteeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
