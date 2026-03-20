import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { RecruitmentSection } from "@/components/sections/RecruitmentSection";

export default function RecruitmentPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1 pb-10">
        <RecruitmentSection />
      </main>
      <Footer />
    </div>
  );
}
