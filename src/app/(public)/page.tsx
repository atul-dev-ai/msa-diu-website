import HeroSection from "@/components/home/HeroSection";
import NoticeBoard from "@/components/home/NoticeBoard";
import CommitteeSection from "@/components/home/CommitteeSection";
import EventsSection from "@/components/home/EventsSection";
import AboutSection from "@/components/home/AboutSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50">
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

      {/* ভবিষ্যতে এখানে GallerySection, AboutSection ইত্যাদি বসবে */}
    </main>
  );
}
