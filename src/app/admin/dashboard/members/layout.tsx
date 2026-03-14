import { Metadata } from "next";

export const metadata: Metadata = {
 
  title: "Student & Member Management | MSA DIU Admin Portal",

  description:
    "Manage student applications, approve new members, and oversee the Manikganj Student Association community directory at DIU securely.",
};

export default function ManageMembersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
