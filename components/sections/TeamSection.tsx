"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HardHat, GraduationCap, Wrench, BookOpen, Users } from "@phosphor-icons/react";
import type { Icon as PhosphorIcon } from "@phosphor-icons/react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useLanguage } from "@/context/LanguageContext";

const LEVEL_ICONS: Record<string, PhosphorIcon> = {
  worker: HardHat,
  college: GraduationCap,
  engineer: Wrench,
  master: BookOpen,
  researcher: Users,
};

export function TeamSection() {
  const { t } = useLanguage();

  gsap.registerPlugin(ScrollTrigger);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelector(".gsap-header"),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none" } }
      );
      gsap.fromTo(
        el.querySelectorAll(".gsap-col"),
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", stagger: 0.15,
          scrollTrigger: { trigger: el, start: "top 80%", toggleActions: "play none none none" } }
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="team" className="py-20 lg:py-28 bg-background tracking-tighter">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-14 gsap-header">
          <div className="flex justify-center mb-2">
            <Badge
              variant="outline"
              className="text-xs font-semibold tracking-wider uppercase px-3 py-1"
            >
              {t.team.section_title}
            </Badge>
          </div>
          <h2 className="text-3xl lg:text-4xl font-black text-foreground mt-3 mb-4">
            {t.team.section_subtitle}
          </h2>
          <Separator className="w-16 mx-auto h-0.5 bg-primary" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Description */}
          <div className="space-y-6 gsap-col">
            <p className="text-base text-muted-foreground leading-relaxed">
              {t.team.description}
            </p>

            {/* Expert levels grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {t.team.levels.map((level, idx) => {
                const IconComponent = LEVEL_ICONS[level.icon] ?? Users;
                return (
                  <div
                    key={idx}
                    className="flex flex-col items-center gap-2 p-3 rounded-xl bg-muted/50 border border-border text-center"
                  >
                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                      <IconComponent
                        className="h-4.5 w-4.5 text-primary"
                        weight="fill"
                      />
                    </div>
                    <span className="text-xs font-semibold text-foreground leading-tight">
                      {level.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Visual stat card */}
          <Card className="border-border gsap-col">
            <CardContent className="p-8 text-center space-y-6">
              <div className="space-y-2">
                <p className="text-5xl font-black" style={{ color: "#FE9D6F" }}>2006</p>
                <p className="text-sm text-muted-foreground font-medium">
                  Năm thành lập
                </p>
              </div>
              <Separator />
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-1">
                  <p className="text-3xl font-black" style={{ color: "#FE9D6F" }}>19+</p>
                  <p className="text-xs text-muted-foreground">
                    Năm kinh nghiệm
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-3xl font-black text-foreground">5+</p>
                  <p className="text-xs text-muted-foreground">
                    Lĩnh vực chuyên môn
                  </p>
                </div>
              </div>
              <Separator />
              <div className="space-y-1">
                <Badge variant="secondary" className="text-xs font-semibold px-3 py-1">
                  ISO/IEC 17025:2017
                </Badge>
                <p className="text-xs text-muted-foreground mt-2">
                  Chứng nhận hệ thống quản lý PTN quốc tế
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
