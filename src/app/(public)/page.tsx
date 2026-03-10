import HeroSection from "@/components/home/HeroSection";
import NoticeBoard from "@/components/home/NoticeBoard";
import CommitteeSection from "@/components/home/CommitteeSection";
import EventsSection from "@/components/home/EventsSection";
import AboutSection from "@/components/home/AboutSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* 🔹 SEO H1 Tag: এটি স্ক্রিনে দেখা যাবে না, কিন্তু গুগলের জন্য ১০০% কাজ করবে 🔹 */}
      <h1 className="sr-only">
        Manikganj Student Association - MSA DIU Official Website
      </h1>

      {/* Hero Section */}
      <HeroSection />

      {/* Notice Board Section */}
      <NoticeBoard />

      {/* Committee Section */}
      <CommitteeSection />

      {/* Events Section */}
      <EventsSection />

      {/* About Us Section */}
      <AboutSection />
    </main>
  );
}
