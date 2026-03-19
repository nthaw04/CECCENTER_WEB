import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ProjectsPreview } from "@/components/sections/ProjectsPreview";
import { PartnersPreview } from "@/components/sections/PartnersPreview";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <HeroSection />
        {/* Two-column content grid */}
        <div className="bg-muted/20 py-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
              <div className="lg:col-span-3">
                <AboutSection />
              </div>
              <div className="lg:col-span-2">
                <ProjectsPreview />
              </div>
            </div>
          </div>
        </div>

        {/* Partners section */}
        <div className="bg-muted/20 pb-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <PartnersPreview />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

