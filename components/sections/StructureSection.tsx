"use client";

import { CheckCircle, Certificate, Handshake, Target } from "@phosphor-icons/react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useLanguage } from "@/context/LanguageContext";

export function StructureSection() {
  const { t } = useLanguage();

  return (
    <section id="structure" className="py-20 lg:py-28 bg-muted/20 tracking-tighter">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-14">
          <div className="flex justify-center mb-2">
            <Badge
              variant="outline"
              className="text-xs font-semibold tracking-wider uppercase px-3 py-1"
            >
              {t.structure.section_title}
            </Badge>
          </div>
          <h2 className="text-3xl lg:text-4xl font-black text-foreground mt-3 mb-4">
            {t.structure.section_subtitle}
          </h2>
          <Separator className="w-16 mx-auto h-0.5 bg-primary" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Org Structure */}
          <Card className="border-border">
            <CardContent className="p-6 lg:p-8 space-y-4">
              <h3 className="font-bold text-foreground flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" weight="fill" />
                Cơ cấu tổ chức
              </h3>
              <ul className="space-y-2.5">
                {t.structure.departments.map((dept, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/10 text-primary text-[10px] font-bold shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="text-sm text-foreground">{dept}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Certifications */}
          <Card className="border-border">
            <CardContent className="p-6 lg:p-8 space-y-4">
              <h3 className="font-bold text-foreground flex items-center gap-2">
                <Certificate className="h-5 w-5 text-primary" weight="fill" />
                Chứng nhận & Năng lực
              </h3>
              <div className="space-y-4">
                {t.structure.certs.map((cert, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-muted/50 border border-border space-y-1">
                    <p className="text-sm font-bold text-foreground">{cert.title}</p>
                    <p className="text-xs text-primary font-semibold">{cert.code}</p>
                    <p className="text-xs text-muted-foreground">{cert.issuer}</p>
                    <p className="text-xs text-muted-foreground italic">{cert.decree}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Mission & Cooperation */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="border-border bg-primary/5">
            <CardContent className="p-6 lg:p-8 space-y-4">
              <h3 className="font-bold text-foreground flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" weight="fill" />
                {t.structure.mission_title}
              </h3>
              <p className="text-sm text-foreground leading-relaxed">
                {t.structure.mission_desc}
              </p>
              <div className="pt-2">
                <p className="text-xs text-muted-foreground mb-1.5 uppercase tracking-wider font-semibold">
                  Phương châm
                </p>
                <blockquote className="border-l-2 border-primary pl-3 italic text-sm font-semibold text-primary">
                  &ldquo;{t.structure.slogan}&rdquo;
                </blockquote>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardContent className="p-6 lg:p-8 space-y-4">
              <h3 className="font-bold text-foreground flex items-center gap-2">
                <Handshake className="h-5 w-5 text-primary" weight="fill" />
                {t.structure.cooperation_title}
              </h3>
              <p className="text-sm text-foreground leading-relaxed">
                {t.structure.cooperation_desc}
              </p>

              {/* Decrees */}
              <div className="pt-2 space-y-2">
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                  Thực hiện theo
                </p>
                {[
                  "Nghị định 62/2016/NĐ-CP ngày 01/7/2016",
                  "Nghị định 35/2023/NĐ-CP ngày 20/6/2023",
                  "Nghị định 175/2024/NĐ-CP ngày 30/12/2024",
                ].map((decree, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                    <span className="text-xs text-muted-foreground">{decree}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
