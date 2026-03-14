import { Metadata } from "next";

export const metadata: Metadata = {
 
  title: "Secure Admin Login | MSA Daffodil International University",

  description:
    "Secure login portal for authorized administrators of the Manikganj Student Association at DIU. Manage events, members, and notices.",
};

export default function AdminLoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
