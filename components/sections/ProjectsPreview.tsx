"use client";

import { useMemo, useRef, useEffect, useState } from "react";
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
    year: "2025-2026",
  },
  {
    image: "/images/du_an/vanh-dai-3.jpg",
    name_vi: "Xây dựng đường vành đai 3 đoạn qua huyện Củ Chi (Km52+580 – Km58+647)",
    name_en: "Ring Road 3 construction through Cu Chi District (Km52+580 – Km58+647)",
    year: "2023",
  },
  {
    image: "/images/du_an/An_phu.jpg",
    name_vi: "Xây dựng nút giao thông An Phú (HC1-02)",
    name_en: "An Phu Interchange Construction (HC1-02)",
    year: "2023",
  },
  {
    image: "/images/du_an/Benh_vien.jpg",
    name_vi: "Đầu tư xây dựng Hầm để xe - Bệnh viện Quân y 175/BQP",
    name_en: "Parking Basement Investment - Military Hospital 175/MOD",
    year: "2022",
  },
  {
    image: "/images/du_an/bien_hoa.jpg",
    name_vi: "Đường nối vào cao tốc Biên Hoà – Vũng Tàu (Từ QL56 đến nút giao Vũng Vằn) (Gói thầu 35)",
    name_en: "Connector to Bien Hoa - Vung Tau Expressway (From QL56 to Vung Van Interchange) (Package 35)",
    year: "2025",
  },
];

const VISIBLE_COUNT = 2;
const AUTO_SLIDE_MS = 7000;
const SLIDE_DURATION_MS = 1200;

export function ProjectsPreview() {
  const { locale } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const [activeWindow, setActiveWindow] = useState(0);
  const [enableTransition, setEnableTransition] = useState(true);

  const windows = useMemo(() => {
    if (PROJECTS.length <= VISIBLE_COUNT) return [PROJECTS];
    return PROJECTS.map((_, start) =>
      Array.from({ length: VISIBLE_COUNT }, (_, idx) => PROJECTS[(start + idx) % PROJECTS.length])
    );
  }, []);

  const renderedWindows = useMemo(() => {
    if (windows.length <= 1) return windows;
    return [...windows, windows[0]];
  }, [windows]);

  const canSlide = windows.length > 1;

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

  useEffect(() => {
    if (!canSlide) return;

    const timer = window.setInterval(() => {
      setActiveWindow((prev) => prev + 1);
    }, AUTO_SLIDE_MS);

    return () => window.clearInterval(timer);
  }, [canSlide]);

  useEffect(() => {
    if (!canSlide) return;
    if (activeWindow < windows.length) return;

    const timeout = window.setTimeout(() => {
      setEnableTransition(false);
      setActiveWindow(0);

      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          setEnableTransition(true);
        });
      });
    }, SLIDE_DURATION_MS + 20);

    return () => window.clearTimeout(timeout);
  }, [activeWindow, canSlide, windows.length]);

  const trackWidthPercent = renderedWindows.length * 100;
  const windowWidthPercent = 100 / renderedWindows.length;

  const renderProjectCard = (project: (typeof PROJECTS)[number], key: string) => (
    <div key={key} className="gsap-item group cursor-default">
      <div className="relative w-full aspect-video overflow-hidden">
        <Image
          src={project.image}
          alt={locale === "vi" ? project.name_vi : project.name_en}
          fill
          loading="eager"
          sizes="(max-width: 1024px) 100vw, 40vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="px-4 py-3 space-y-1">
        <p className="text-xs font-bold uppercase tracking-wider min-h-4" style={{ color: "#FE9D6F" }}>
          {project.year}
        </p>
        <p className="text-base font-semibold text-foreground leading-snug tracking-tight min-h-14">
          {locale === "vi" ? project.name_vi : project.name_en}
        </p>
      </div>
    </div>
  );

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
      <div className="flex-1 overflow-hidden">
        <div
          className="flex h-full will-change-transform"
          style={{
            width: `${trackWidthPercent}%`,
            transform: `translate3d(-${activeWindow * windowWidthPercent}%, 0, 0)`,
            transition: enableTransition ? `transform ${SLIDE_DURATION_MS}ms cubic-bezier(0.22, 0.61, 0.36, 1)` : "none",
          }}
        >
          {renderedWindows.map((projects, windowIndex) => (
            <div key={`window-${windowIndex}`} className="h-full divide-y divide-border" style={{ width: `${windowWidthPercent}%` }}>
              {projects.map((project, projectIndex) =>
                renderProjectCard(project, `window-${windowIndex}-${project.image}-${projectIndex}`)
              )}
            </div>
          ))}
        </div>
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
