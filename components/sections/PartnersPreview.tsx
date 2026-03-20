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
  const [page, setPage] = useState(0);
  const ITEMS_PER_PAGE = 4;
  const totalPages = Math.ceil(PARTNERS.length / ITEMS_PER_PAGE);
  const pages = Array.from({ length: totalPages }, (_, pageIndex) =>
    PARTNERS.slice(pageIndex * ITEMS_PER_PAGE, (pageIndex + 1) * ITEMS_PER_PAGE)
  );

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
        className="px-4 py-2.5 bg-cec-accent flex items-center gap-2"
      >
        <span className="text-white font-bold text-sm uppercase tracking-wide">
          Các Đối Tác Chiến Lược
        </span>
        <div className="ml-auto flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(p - 1, 0))}
            disabled={page === 0}
            aria-label="Xem đối tác trước"
            className="h-7 w-7 flex items-center justify-center rounded-sm text-white border border-white/40 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={() => setPage((p) => Math.min(p + 1, totalPages - 1))}
            disabled={page >= totalPages - 1}
            aria-label="Xem đối tác tiếp theo"
            className="h-7 w-7 flex items-center justify-center rounded-sm text-white border border-white/40 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            ›
          </button>
        </div>
      </div>

      {/* Partners slider */}
      <div className="p-4 overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out will-change-transform"
          style={{ transform: `translateX(-${page * 100}%)` }}
        >
          {pages.map((partnersInPage, pageIndex) => {
            const filledPage = [
              ...partnersInPage,
              ...Array.from({ length: ITEMS_PER_PAGE - partnersInPage.length }, () => null),
            ];

            return (
              <div key={`page-${pageIndex}`} className="w-full shrink-0 grid grid-cols-4 gap-4">
                {filledPage.map((partner, slotIndex) => {
                  if (!partner) {
                    return <div key={`empty-${pageIndex}-${slotIndex}`} aria-hidden className="invisible" />;
                  }

                  return (
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
                            sizes="(max-width: 768px) 50vw, (max-width: 1280px) 25vw, 220px"
                            className="object-contain"
                          />
                        </div>
                      </div>
                      {/* Partner name */}
                      <p className="text-base text-center tracking-tighter leading-snug font-medium px-1">
                        {partner.name}
                      </p>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
