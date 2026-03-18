"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { ArrowRight, CaretLeft, CaretRight } from "@phosphor-icons/react";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";

/*
  HOW TO ADD YOUR HERO IMAGES:
  1. Place construction/engineering photos in /public/images/
     e.g: slide-1.jpg, slide-2.jpg, slide-3.jpg
  2. Update the `image` paths in SLIDES below.
  Each slide falls back to its gradient when the image file is missing.
*/
const SLIDES = [
  {
    image: "/images/slide-1.jpg",
    gradient: "from-slate-950 via-slate-900 to-slate-800",
  },
  {
    image: "/images/slide-2.jpg",
    gradient: "from-zinc-950 via-neutral-900 to-stone-900",
  },
  {
    image: "/images/slide-3.jpeg",
    gradient: "from-stone-950 via-zinc-900 to-slate-900",
  },
];

const INTERVAL_MS = 5000;

export function HeroSection() {
  const { t } = useLanguage();
  const [current, setCurrent] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  const goTo = useCallback(
    (idx: number) => {
      if (transitioning) return;
      setTransitioning(true);
      setCurrent(idx);
      setTimeout(() => setTransitioning(false), 700);
    },
    [transitioning]
  );

  const next = useCallback(
    () => goTo((current + 1) % SLIDES.length),
    [current, goTo]
  );
  const prev = useCallback(
    () => goTo((current - 1 + SLIDES.length) % SLIDES.length),
    [current, goTo]
  );

  useEffect(() => {
    const timer = setInterval(next, INTERVAL_MS);
    return () => clearInterval(timer);
  }, [next]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative h-screen min-h-150 max-h-250 overflow-hidden"
    >
      {/* ── Slides ─────────────────────────────────────────── */}
      {SLIDES.map((slide, idx) => (
        <div
          key={idx}
          aria-hidden={idx !== current}
          className={cn(
            "absolute inset-0 transition-opacity duration-700 ease-in-out",
            idx === current ? "opacity-100" : "opacity-0"
          )}
        >
          {/* Gradient fallback */}
          <div
            className={cn("absolute inset-0 bg-linear-to-br", slide.gradient)}
          />
          {/* Actual image */}
          <Image
            src={slide.image}
            alt={`CEC Center slide ${idx + 1}`}
            fill
            priority={idx === 0}
            className="object-cover"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
          {/* Dark scrim – heavier left for text legibility */}
          <div className="absolute inset-0 bg-linear-to-r from-black/75 via-black/50 to-black/20" />
        </div>
      ))}

      {/* ── Content ─────────────────────────────────────────── */}
      <div className="relative z-10 h-full flex flex-col justify-center px-6 sm:px-12 lg:px-20 xl:px-28">
        <div className="max-w-3xl space-y-6">
          {/* Eyebrow */}
          <p
            className="text-xs sm:text-sm font-bold tracking-[0.3em] uppercase"
            style={{ color: "#93CAF0" }}
          >
            {t.hero.badge}
          </p>

          {/* Impact title */}
          <h1 className="font-black uppercase leading-[0.9] tracking-tight">
            <span className="block text-5xl sm:text-6xl lg:text-7xl xl:text-[5.5rem] text-white">
              {t.hero.title_line1}
            </span>
            <span className="block text-5xl sm:text-6xl lg:text-7xl xl:text-[5.5rem] text-white">
              {t.hero.title_line2}
            </span>
            <span
              className="block text-5xl sm:text-6xl lg:text-7xl xl:text-[5.5rem]"
              style={{ WebkitTextStroke: "2px white", color: "transparent" }}
            >
              {t.hero.title_line3}
            </span>
          </h1>

          {/* Description */}
          <p className="text-sm sm:text-base text-white/70 max-w-lg leading-relaxed">
            {t.hero.description}
          </p>

          {/* CTA */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => scrollTo("about")}
              className="group flex items-center gap-2 px-7 py-3.5 text-sm font-bold uppercase tracking-widest text-black transition-all duration-200 hover:brightness-90 active:scale-[0.97]"
              style={{ backgroundColor: "#93CAF0" }}
            >
              {t.hero.cta_primary}
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                weight="bold"
              />
            </button>
            <button
              onClick={() => scrollTo("contact")}
              className="flex items-center gap-2 px-7 py-3.5 text-sm font-bold uppercase tracking-widest text-white border-2 border-white hover:bg-white hover:text-black transition-all duration-200 active:scale-[0.97]"
            >
              {t.hero.cta_secondary}
            </button>
          </div>
        </div>
      </div>

      {/* ── Bottom bar: dots+counter LEFT | certs+arrows RIGHT ── */}
      <div className="absolute bottom-6 left-6 right-6 sm:left-12 sm:right-8 lg:left-20 xl:left-28 z-20 flex items-center justify-between gap-4">
        {/* Dots + counter */}
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2">
            {SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goTo(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={cn(
                  "rounded-full transition-all duration-300",
                  idx !== current && "w-2 h-2 bg-white/40 hover:bg-white/70"
                )}
                style={
                  idx === current
                    ? { width: "2rem", height: "0.5rem", backgroundColor: "#93CAF0", borderRadius: "9999px" }
                    : {}
                }
              />
            ))}
          </div>
          <span className="text-xs font-bold tracking-widest text-white/40">
            {String(current + 1).padStart(2, "0")} /{" "}
            {String(SLIDES.length).padStart(2, "0")}
          </span>
        </div>

        {/* Certs + arrows */}
        <div className="flex items-center gap-6">
          {/* Cert badges (hidden on small screens) */}
          <div className="hidden lg:flex items-center gap-8">
            {[
              { code: "LAS-XD 449", sub: "Bộ Xây Dựng" },
              { code: "ISO/IEC 17025", sub: "2017" },
              { code: "HCM-00027788", sub: "Sở XD TP.HCM" },
            ].map((c) => (
              <div key={c.code} className="text-right">
                <p
                  className="text-xs font-black uppercase tracking-wide"
                  style={{ color: "#93CAF0" }}
                >
                  {c.code}
                </p>
                <p className="text-[10px] text-white/40">{c.sub}</p>
              </div>
            ))}
          </div>

          {/* Prev / Next arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={prev}
              aria-label="Previous slide"
              className="w-10 h-10 flex items-center justify-center border border-white/30 text-white hover:border-white hover:bg-white/10 transition-all duration-200"
            >
              <CaretLeft className="h-4 w-4" weight="bold" />
            </button>
            <button
              onClick={next}
              aria-label="Next slide"
              className="w-10 h-10 flex items-center justify-center border border-white/30 text-white hover:border-white hover:bg-white/10 transition-all duration-200"
            >
              <CaretRight className="h-4 w-4" weight="bold" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
