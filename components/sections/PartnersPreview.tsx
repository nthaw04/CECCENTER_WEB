"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PARTNERS = [
    {
    logo: "/images/khach_hang/khachhang3.png",
    name: "Công ty cổ phần iDECO Việt Nam",
  },
   {
    logo: "/images/khach_hang/khachhang4.png",
    name: "Chi nhánh phía Nam - Tổng công ty xây dựng Trường Sơn",
  },
  {
    logo: "/images/khach_hang/khachhang1.png",
    name: "Công ty Cổ phần Công nghệ Xây dựng Solar Cons ",
  },
  {
    logo: "/images/khach_hang/khachhang2.png",
    name: "Tổng công ty 319 BQP",
  },
  {
    logo: "/images/khach_hang/khachhang5.png",
    name: "Công ty TNHH thiết kế xây dựng thương mại Phú Cường",
  },
  {
    logo: "/images/khach_hang/khachhang6.png",
    name: "Công ty Cổ phần TVKĐ Công trình Toàn Trí",
  },
];

export function PartnersPreview() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const lastTsRef = useRef<number | null>(null);
  const offsetRef = useRef(0);
  const pauseRef = useRef(false);
  const [isPaused, setIsPaused] = useState(false);
  const LOOP_PARTNERS = [...PARTNERS, ...PARTNERS];
  const SPEED_PX_PER_SEC = 100;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".partner-item",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    pauseRef.current = isPaused;
  }, [isPaused]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const tick = (ts: number) => {
      if (lastTsRef.current === null) {
        lastTsRef.current = ts;
      }

      const dt = (ts - (lastTsRef.current ?? ts)) / 1000;
      lastTsRef.current = ts;

      if (!pauseRef.current) {
        const singleTrackWidth = track.scrollWidth / 2;
        if (singleTrackWidth > 0) {
          offsetRef.current += SPEED_PX_PER_SEC * dt;
          if (offsetRef.current >= singleTrackWidth) {
            offsetRef.current -= singleTrackWidth;
          }
          track.style.transform = `translate3d(-${offsetRef.current}px, 0, 0)`;
        }
      }

      rafRef.current = window.requestAnimationFrame(tick);
    };

    const handleResize = () => {
      const singleTrackWidth = track.scrollWidth / 2;
      if (singleTrackWidth > 0) {
        offsetRef.current = offsetRef.current % singleTrackWidth;
      }
    };

    rafRef.current = window.requestAnimationFrame(tick);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }
      rafRef.current = null;
      lastTsRef.current = null;
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className="border border-border bg-card flex flex-col overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Header bar */}
      <div
        className="px-4 py-2 bg-cec-accent flex items-center gap-2"
      >
        <span className="text-white font-bold text-base uppercase tracking-wide">
          Các Đối Tác Chiến Lược
        </span>
      </div>

      {/* Partners conveyor */}
      <div className="px-4 pb-4 overflow-hidden">
        <div ref={trackRef} className="flex w-max gap-10 will-change-transform">
          {LOOP_PARTNERS.map((partner, index) => (
            <div
              key={`${partner.name}-${index}`}
              className="partner-item w-52 sm:w-56 md:w-60 lg:w-64 shrink-0 flex flex-col items-center gap-2 group"
            >
              {/* Logo box */}
              <div className="w-full aspect-square bg-white flex items-center justify-center overflow-hidden transition-shadow duration-300">
                <div className="relative w-full h-full">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    fill
                    sizes="(max-width: 640px) 208px, (max-width: 1024px) 240px, 256px"
                    className="object-contain"
                  />
                </div>
              </div>
              {/* Partner name */}
              <p className="text-base text-center tracking-tighter leading-snug font-medium px-1">
                {partner.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
