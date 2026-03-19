"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CaretRight, ArrowRight } from "@phosphor-icons/react";
import { useLanguage } from "@/context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    image: "/images/du_an/du_an_tieu_bieu.jpg",
    name_vi: "Nhà NV.B4-2 (Trường Đại học Khoa học Xã hội và Nhân văn)",
    name_en: "NV.B4-2 Building (University of Social Sciences and Humanities)",
    year: "2023",
  },
];

export function ProjectsPreview() {
  const { locale } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll(".gsap-item"),
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.5, ease: "power3.out", stagger: 0.08,
          scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none" },
        }
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="border border-border bg-card h-full flex flex-col">
      {/* Header bar */}
      <div className="px-5 py-3 flex items-center justify-between shrink-0" style={{ backgroundColor: "#FE9D6F" }}>
        <span className="text-sm font-bold tracking-[0.18em] uppercase text-white">
          {locale === "vi" ? "Các Dự Án Tiêu Biểu" : "Featured Projects"}
        </span>
        <CaretRight size={16} color="white" weight="bold" />
      </div>

      {/* Project list */}
      <div className="flex-1 divide-y divide-border overflow-auto">
        {PROJECTS.map((project, i) => (
          <div key={i} className="gsap-item group cursor-default">
            {/* Project image */}
            <div className="relative w-full aspect-[16/9] overflow-hidden">
              <Image
                src={project.image}
                alt={locale === "vi" ? project.name_vi : project.name_en}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            {/* Project info */}
            <div className="px-4 py-3 space-y-1">
              <p className="text-xs font-bold uppercase tracking-wider" style={{ color: "#FE9D6F" }}>
                {project.year}
              </p>
              <p className="text-sm font-semibold text-foreground leading-snug tracking-tight">
                {locale === "vi" ? project.name_vi : project.name_en}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* View all */}
      <div className="px-5 py-3 border-t border-border shrink-0">
        <Link
          href="/structure"
          className="text-xs font-semibold tracking-wider uppercase flex items-center gap-1.5 hover:gap-3 transition-all w-fit"
          style={{ color: "#FE9D6F" }}
        >
          {locale === "vi" ? "Xem tất cả dự án" : "View all projects"}
          <ArrowRight size={12} />
        </Link>
      </div>
    </div>
  );
}
