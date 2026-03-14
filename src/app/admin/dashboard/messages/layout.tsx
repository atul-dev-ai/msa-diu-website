import { Metadata } from "next";

export const metadata: Metadata = {
 
  title: "Inbox & Contact Messages | MSA DIU Admin",

  description:
    "Review and respond to student inquiries, feedback, and contact form submissions sent to the Manikganj Student Association securely.",
};

export default function ManageMessagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
