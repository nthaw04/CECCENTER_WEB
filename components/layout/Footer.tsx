"use client";

import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  Phone,
  Envelope,
  FacebookLogo,
  InstagramLogo,
  YoutubeLogo,
} from "@phosphor-icons/react";
import { Separator } from "@/components/ui/separator";
import { useLanguage } from "@/context/LanguageContext";
import { GoogleMap } from "@/components/layout/GoogleMap";

const NAV_GROUPS = [
  {
    titleKey: "group_about" as const,
    links: [
      { labelKey: "about" as const, href: "/#about", ns: "nav" as const },
      { labelKey: "team" as const, href: "/team", ns: "nav" as const },
      { labelKey: "structure" as const, href: "/structure", ns: "nav" as const },
    ],
  },
  {
    titleKey: "group_services" as const,
    links: [
      { labelKey: "services" as const, href: "/services", ns: "nav" as const },
    ],
  },
  {
    titleKey: "group_legal" as const,
    links: [
      { label: "LAS-XD 449", href: "/services" },
      { label: "ISO/IEC 17025:2017", href: "/structure" },
      { label: "245/GCN-BXD", href: "/structure" },
    ],
  },
  {
    titleKey: "group_contact" as const,
    links: [
      { labelKey: "contact" as const, href: "/contact", ns: "nav" as const },
    ],
  },
];

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-card border-t border-border tracking-tighter">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

          {/* ── Left column: brand + contact + social ─────── */}
          <div className="lg:col-span-1 space-y-5">
            {/* Logo + name */}
            <Link href="/" className="flex items-center gap-3 group" aria-label="CEC Center">
              <div className="relative w-12 h-12 shrink-0">
                <Image
                  src="/images/cec-logo.png"
                  alt="CEC Center Logo"
                  fill
                  sizes="48px"
                  className="object-contain"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = "none";
                  }}
                />
              </div>
              <div>
                <p className="font-semibold text-lg leading-tight">
                  CEC Center
                </p>
                <p className="text-sm text-muted-foreground leading-tight mt-0.5">
                  LAS - XD 449
                </p>
              </div>
            </Link>

            {/* Description */}
            <p className="text-sm leading-relaxed">
              {t.footer.description}
            </p>

            {/* Contact rows */}
            <ul className="space-y-2.5">
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 shrink-0 mt-0.5" style={{ color: "#93CAF0" }} weight="fill" />
                <span className="text-sm">{t.about.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0" style={{ color: "#FE9D6F" }} weight="fill" />
                <a
                  href={`tel:${t.about.phone.replace(/\s/g, "")}`}
                  className="text-sm hover:text-foreground transition-colors"
                >
                  {t.about.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Envelope className="h-4 w-4 shrink-0" style={{ color: "#93CAF0" }} weight="fill" />
                <a
                  href={`mailto:${t.about.email}`}
                  className="text-sm hover:text-foreground transition-colors"
                >
                  {t.about.email}
                </a>
              </li>
            </ul>

            {/* Social icons */}
            <div className="flex items-center gap-2 pt-1">
              {[
                { Icon: FacebookLogo, label: "Facebook", href: "#" },
                { Icon: InstagramLogo, label: "Instagram", href: "#" },
                { Icon: YoutubeLogo, label: "YouTube", href: "#" },
              ].map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-8 h-8 flex items-center justify-center rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-colors"
                >
                  <Icon className="h-4 w-4" weight="fill" />
                </a>
              ))}
            </div>
          </div>

          {/* ── Right columns: nav groups ─────────────────── */}
          <div className="lg:col-span-2 grid grid-cols-2 gap-8">
            {NAV_GROUPS.map(({ titleKey, links }) => (
              <div key={titleKey} className="space-y-4">
                <h4 className="font-bold text-xs uppercase tracking-widest" style={{ color: "#FE9D6F" }}>
                  {t.footer[titleKey]}
                </h4>
                <ul className="space-y-2">
                  {links.map((link, i) => {
                    const label =
                      "ns" in link && link.ns === "nav"
                        ? t.nav[link.labelKey as keyof typeof t.nav]
                        : (link as { label: string; href: string }).label;
                    return (
                      <li key={i}>
                        <Link
                          href={link.href}
                          className="text-sm hover:text-foreground transition-colors"
                        >
                          {label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>

          {/* ── Map column ───────────────────────────────── */}
          <div className="lg:col-span-2 flex flex-col gap-2">
            <h4 className="font-bold text-xs uppercase tracking-widest" style={{ color: "#FE9D6F" }}>
              Vị Trí
            </h4>
            <div className="w-full h-52 lg:h-full min-h-44 overflow-hidden border border-border">
              <GoogleMap />
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        {/* ── Bottom bar ────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-muted-foreground">
          <p>{t.footer.copyright}</p>
          <div className="flex items-center gap-4">
            <Link href="#" className="hover:text-foreground transition-colors">
              {t.footer.terms}
            </Link>
            <span className="opacity-40">|</span>
            <Link href="#" className="hover:text-foreground transition-colors">
              {t.footer.privacy}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
