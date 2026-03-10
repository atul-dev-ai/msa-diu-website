import Navbar from "@/components/layout/Navbar";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-slate-50 text-slate-900">
        {children}
      </main>
    </>
  );
}
