import SiteHeader from '@/components/SiteHeader';
import HeroSection from '@/components/HeroSection';
import AdventureShowcase from '@/components/AdventureShowcase';
import SiteFooter from '@/components/SiteFooter';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-[#0B1F2A]">
      <SiteHeader />
      <main id="main-content" className="flex-1">
        <HeroSection />
        <AdventureShowcase />
      </main>
      <SiteFooter />
    </div>
  );
}
