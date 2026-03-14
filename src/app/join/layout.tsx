import { Metadata } from "next";

export const metadata: Metadata = {

  title: "Become a Member of MSA DIU | Manikganj Student Association",

  description:
    "Join the Manikganj Student Association at DIU. Connect with peers, participate in exclusive campus events, and grow our community.",
};

export default function JoinLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
