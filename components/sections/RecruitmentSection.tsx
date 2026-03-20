"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

const PAGE_1_IMAGE = "/images/recruitment/page-1.jpg";
const PAGE_2_IMAGE = "/images/recruitment/page-2.jpg";

export function RecruitmentSection() {
  const { locale } = useLanguage();

  return (
    <section className="py-8 lg:py-12 bg-background tracking-tighter">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="py-2 text-center">
          <h1 className="text-3xl lg:text-4xl font-semibold text-foreground uppercase">
            THÔNG TIN TUYỂN DỤNG
          </h1>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          <div className="border border-border bg-card overflow-hidden">
            <div className="px-4 py-2 border-b border-border text-sm font-semibold text-foreground">
              {locale === "vi" ? "Trang 1" : "Page 1"}
            </div>
            <div className="p-3">
              <Image
                src={PAGE_1_IMAGE}
                alt={locale === "vi" ? "Tuyển dụng - Trang 1" : "Recruitment - Page 1"}
                width={1400}
                height={2000}
                className="w-full h-auto object-contain"
                priority
              />
            </div>
          </div>

          <div className="border border-border bg-card overflow-hidden">
            <div className="px-4 py-2 border-b border-border text-sm font-semibold text-foreground">
              {locale === "vi" ? "Trang 2" : "Page 2"}
            </div>
            <div className="p-3">
              <Image
                src={PAGE_2_IMAGE}
                alt={locale === "vi" ? "Tuyển dụng - Trang 2" : "Recruitment - Page 2"}
                width={1400}
                height={2000}
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
