"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Flask, Factory, MapTrifold, Ruler, Eye, Clipboard, BookOpen, Globe,
  ArrowRight, CaretRight,
} from "@phosphor-icons/react";
import type { Icon as PhosphorIcon } from "@phosphor-icons/react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

const SERVICE_ICONS: Record<string, PhosphorIcon> = {
  flask: Flask,
  factory: Factory,
  map: MapTrifold,
  blueprint: Ruler,
  eye: Eye,
  test: Clipboard,
  info: BookOpen,
  globe: Globe,
};

export function ServicesPreview() {
  const { t, locale } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll(".gsap-item"),
        { opacity: 0, x: 20 },
        {
          opacity: 1, x: 0, duration: 0.5, ease: "power3.out", stagger: 0.06,
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
          {locale === "vi" ? "Lĩnh Vực Hoạt Động" : "Our Services"}
        </span>
        <CaretRight size={16} color="white" weight="bold" />
      </div>

      {/* Service list */}
      <div className="flex-1 divide-y divide-border">
        {t.services.items.map((service, i) => {
          const Icon = SERVICE_ICONS[service.icon] ?? Clipboard;
          return (
            <div
              key={i}
              className="gsap-item flex items-center gap-3 px-5 py-3 hover:bg-muted/40 transition-colors group cursor-default"
            >
              <Icon
                size={16}
                weight="duotone"
                className="shrink-0 text-muted-foreground group-hover:text-foreground transition-colors"
              />
              <span className="text-sm text-foreground/75 dark:text-muted-foreground tracking-tight group-hover:text-foreground transition-colors flex-1 leading-snug">
                {service.title}
              </span>
              <ArrowRight
                size={13}
                className="shrink-0 opacity-0 group-hover:opacity-60 transition-opacity text-muted-foreground"
              />
            </div>
          );
        })}
      </div>

      {/* View all */}
      <div className="px-5 py-3 border-t border-border shrink-0">
        <Link
          href="/services"
          className="text-xs font-semibold tracking-wider uppercase flex items-center gap-1.5 hover:gap-3 transition-all w-fit"
          style={{ color: "#FE9D6F" }}
        >
          {locale === "vi" ? "Xem tất cả dịch vụ" : "View all services"}
          <ArrowRight size={12} />
        </Link>
      </div>
    </div>
  );
}
