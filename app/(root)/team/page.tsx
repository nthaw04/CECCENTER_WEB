import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { TeamSection } from "@/components/sections/TeamSection";

export default function TeamPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1 pt-20">
        <TeamSection />
      </main>
      <Footer />
    </div>
  );
}
