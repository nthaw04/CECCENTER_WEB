"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ORANGE = "#FE9D6F";

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
];

export function PartnersPreview() {
  const sectionRef = useRef<HTMLDivElement>(null);

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

  return (
    <div
      ref={sectionRef}
      className="border border-border bg-card flex flex-col overflow-hidden"
    >
      {/* Header bar */}
      <div
        className="px-4 py-2.5 flex items-center gap-2"
        style={{ backgroundColor: ORANGE }}
      >
        <span className="text-white font-bold text-sm uppercase tracking-wide">
          Các Đối Tác Chiến Lược
        </span>
      </div>

      {/* Partners grid */}
      <div className="p-4 grid grid-cols-4 gap-4">
        {PARTNERS.map((partner) => (
          <div
            key={partner.name}
            className="partner-item flex flex-col items-center gap-2 group"
          >
            {/* Logo box */}
            <div className="w-full aspect-square bg-white flex items-center justify-center p-4 overflow-hidden transition-shadow duration-300">
              <div className="relative w-full h-full">
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  fill
                  className="object-contain"
                />
              </div>
            </div>
            {/* Partner name */}
            <p className="text-sm text-center tracking-tighter leading-snug font-medium px-1">
              {partner.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
