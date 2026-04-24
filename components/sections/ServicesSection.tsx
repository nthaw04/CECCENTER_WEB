"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const DRIVE_FILE_ID = "1ax1xIrOVKkOFQTVnOw_NVPrtEunjWNeQ";
const DRIVE_VIEW_URL =
  "https://drive.google.com/file/d/1GGRiwMzQqWKJiNv6-J7ZfU-NgqRDJ-0T/view?usp=drive_link";
const DRIVE_IMAGE_URL = `https://drive.google.com/thumbnail?id=${DRIVE_FILE_ID}&sz=w2000`;

export function ServicesSection() {
  gsap.registerPlugin(ScrollTrigger);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelector(".gsap-header"),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        },
      );
      gsap.fromTo(
        el.querySelectorAll(".gsap-content"),
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        },
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="py-4 lg:py-8 bg-muted/20 tracking-tighter"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-4 lg:mb-6 gsap-header">
          <h2 className="text-3xl lg:text-4xl font-black text-foreground mb-3">
            LĨNH VỰC HOẠT ĐỘNG
          </h2>
          <div
            className="h-0.5 w-16 mx-auto"
            style={{ backgroundColor: "#F6B254" }}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-start">
          <div className="gsap-content rounded-2xl bg-card p-5 sm:p-6 lg:p-7">
            <div className="space-y-5 text-sm sm:text-base leading-relaxed text-foreground">
              <p>
                <strong>1.</strong> Nghiên cứu khoa học và triển khai ứng dụng
                trong lĩnh vực: Công nghệ vật liệu xây dựng.
              </p>

              <p>
                <strong>2.</strong> Sản xuất thử – Thử nghiệm, chuyển giao công
                nghệ từ kết quả nghiên cứu theo lĩnh vực đăng ký.
              </p>

              <div className="space-y-2.5">
                <p>
                  <strong>3.</strong> Dịch vụ khoa học và công nghệ:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground marker:text-foreground">
                  <li>
                    Tư vấn khảo sát địa chất công trình, địa chất thủy văn, địa
                    hình;
                  </li>
                  <li>
                    Tư vấn thiết kế, thẩm tra thiết kế: Công trình giao thông
                    vận tải, công trình hạ tầng đô thị, kiến trúc và xây dựng
                    dân dụng;
                  </li>
                  <li>
                    Tư vấn giám sát: Công trình giao thông vận tải, công trình
                    hạ tầng đô thị, kiến trúc và xây dựng dân dụng, địa kỹ
                    thuật;
                  </li>
                  <li>
                    Thí nghiệm, kiểm định, giám định chất lượng các loại vật
                    liệu xây dựng, công trình xây dựng;
                  </li>
                  <li>
                    Thông tin KH&amp;CN, huấn luyện bồi dưỡng chuyên môn theo
                    lĩnh vực đăng ký.
                  </li>
                </ul>
              </div>

              <p>
                <strong>4.</strong> Hợp tác trong và ngoài nước theo lĩnh vực
                đăng ký phù hợp Luật định ./.
              </p>
            </div>
          </div>

          <div className="gsap-content">
            <a href={DRIVE_VIEW_URL} target="_blank" rel="noopener noreferrer">
              <Image
                src={DRIVE_IMAGE_URL}
                alt="Chứng chỉ năng lực hoạt động xây dựng"
                width={2000}
                height={1400}
                unoptimized
                className="block w-full h-auto"
                loading="lazy"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
