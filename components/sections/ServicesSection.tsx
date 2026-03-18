"use client";

import {
  Flask,
  Factory,
  MapTrifold,
  Ruler,
  Eye,
  Clipboard,
  BookOpen,
  Globe,
} from "@phosphor-icons/react";
import type { Icon as PhosphorIcon } from "@phosphor-icons/react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useLanguage } from "@/context/LanguageContext";

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

export function ServicesSection() {
  const { t } = useLanguage();

  return (
    <section id="services" className="py-20 lg:py-28 bg-muted/20 tracking-tighter">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-14">
          <div className="flex justify-center mb-2">
            <Badge
              variant="outline"
              className="text-xs font-semibold tracking-wider uppercase px-3 py-1"
            >
              {t.services.section_title}
            </Badge>
          </div>
          <h2 className="text-3xl lg:text-4xl font-black text-foreground mt-3 mb-4">
            {t.services.section_subtitle}
          </h2>
          <Separator className="w-16 mx-auto h-0.5 bg-primary" />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {t.services.items.map((service, idx) => {
            const IconComponent = SERVICE_ICONS[service.icon] ?? Flask;
            return (
              <Card
                key={idx}
                className="group border-border hover:border-primary/40 hover:shadow-md transition-all duration-300 cursor-default"
              >
                <CardContent className="p-5 space-y-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <IconComponent
                      className="h-5 w-5 text-primary"
                      weight="fill"
                    />
                  </div>
                  <h3 className="font-bold text-sm text-foreground leading-snug">
                    {service.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
