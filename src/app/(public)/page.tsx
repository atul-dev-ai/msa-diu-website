import HeroSection from "@/components/home/HeroSection";
import NoticeBoard from "@/components/home/NoticeBoard";
import CommitteeSection from "@/components/home/CommitteeSection";
import EventsSection from "@/components/home/EventsSection";
import AboutSection from "@/components/home/AboutSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50">

      <h1 className="sr-only">
        Manikganj Student Association - MSA DIU Official Website
      </h1>

      <HeroSection />

      <NoticeBoard />

      <CommitteeSection />

      <EventsSection />

      <AboutSection />
    </main>
  );
}
