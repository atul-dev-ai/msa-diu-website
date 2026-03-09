// Path: src/app/(public)/layout.tsx
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/footer";
// import { Footer } from "antd/es/layout/layout";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-slate-50 text-slate-900">{children}</div>
      <Footer />
    </>
  );
}
