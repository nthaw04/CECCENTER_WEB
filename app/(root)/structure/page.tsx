import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StructureSection } from "@/components/sections/StructureSection";

export default function StructurePage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1 pt-20">
        <StructureSection />
      </main>
      <Footer />
    </div>
  );
}
