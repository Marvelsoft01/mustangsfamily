import { HeroSection } from "@/components/HeroSection";
import { TimelineSection } from "@/components/TimelineSection";
import { SalesShowcase } from "@/components/SalesShowcase";
import { DesignDNA } from "@/components/DesignDNA";
import { TributeSection } from "@/components/TributeSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <TimelineSection />
      <SalesShowcase />
      <DesignDNA />
      <TributeSection />
      <Footer />
    </main>
  );
};

export default Index;
