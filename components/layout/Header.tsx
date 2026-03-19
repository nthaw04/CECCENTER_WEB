"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { List, X, MagnifyingGlass, Sun, Moon, MapPin } from "@phosphor-icons/react";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { MapModal } from "@/components/ui/MapModal";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

/* Brand palette */
const BLUE_DK = "#4A90C4";   /* top bar + active tab          */
const BLUE_LT = "rgba(73,144,196,0.10)"; /* hover bg light tint */
const TEXT_DK = "#0a2847";   /* dark navy text                */

const NAV_ITEMS = [
  { key: "home",      label_vi: "Trang Chủ",  label_en: "Home",     href: "/" },
  { key: "services",  label_vi: "Lĩnh Vực",   label_en: "Services", href: "/services" },
  { key: "structure", label_vi: "Dự Án",      label_en: "Projects", href: "/structure" },
  { key: "team",      label_vi: "Nhân Lực",   label_en: "Team",     href: "/team" },
  { key: "contact",   label_vi: "Liên Hệ",    label_en: "Contact",  href: "/contact" },
];

export function Header() {
  const { locale } = useLanguage();
  const pathname  = usePathname();
  const { resolvedTheme, setTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mapOpen, setMapOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    const base = href.split("#")[0];
    return base !== "/" && pathname.startsWith(base);
  };

  return (
    <header className="sticky top-0 left-0 right-0 z-50 shadow-sm bg-background border-b border-border">

      <MapModal open={mapOpen} onClose={() => setMapOpen(false)} />

      {/* ── Top bar ── */}
      <div style={{ backgroundColor: BLUE_DK }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-9 gap-2">
          {/* Address */}
          <button
            onClick={() => setMapOpen(true)}
            className="hidden sm:flex items-center gap-1.5 text-white/80 hover:text-white transition-colors text-xs"
            aria-label="Xem bản đồ"
          >
            <MapPin className="h-3.5 w-3.5" weight="fill" />
            <span>302 Gò Dưa, Phường Tam Bình, TP. Hồ Chí Minh</span>
          </button>
          <div className="flex items-center gap-2 ml-auto">
          <LanguageSwitcher />
          <span className="w-px h-4 bg-white/20" />
          <button
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
            className="flex items-center justify-center w-7 h-7 text-white/70 hover:text-white hover:bg-white/10 transition-colors"
          >
            {resolvedTheme === "dark"
              ? <Sun className="h-4 w-4" weight="bold" />
              : <Moon className="h-4 w-4" weight="bold" />
            }
          </button>
          </div>
        </div>
      </div>

      {/* ── Main bar ── */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-stretch h-14 lg:h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 pr-6 shrink-0" aria-label="CEC Center Home">
            <div className="relative w-10 h-10 shrink-0 bg-white/10 p-1">
              <Image
                src="/images/cec-logo.png"
                alt="CEC"
                fill
                className="object-contain"
                onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
              />
            </div>
            <div className="hidden sm:block leading-tight">
              <p className="font-black text-sm lg:text-base tracking-tight" style={{ color: TEXT_DK }}>CEC Center</p>
              <p className="text-[10px] lg:text-xs" style={{ color: TEXT_DK, opacity: 0.6 }}>LAS - XD 449</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-stretch flex-1">
            {NAV_ITEMS.map(({ key, label_vi, label_en, href }) => {
              const active = isActive(href);
              return (
                <Link
                  key={key}
                  href={href}
                  className={cn(
                    "flex items-center px-2 xl:px-3 text-base font-semibold tracking-tight whitespace-nowrap transition-colors",
                    active ? "text-white" : ""
                  )}
                  style={active
                    ? { backgroundColor: BLUE_DK, color: "white" }
                    : { color: TEXT_DK }
                  }
                  onMouseEnter={e => { if (!active) (e.currentTarget as HTMLElement).style.backgroundColor = BLUE_LT; }}
                  onMouseLeave={e => { if (!active) (e.currentTarget as HTMLElement).style.backgroundColor = ""; }}
                >
                  {locale === "vi" ? label_vi : label_en}
                </Link>
              );
            })}
          </nav>

          {/* Search + mobile toggle */}
          <div className="flex items-center gap-1 ml-auto">
            <button
              aria-label="Search"
              className="w-10 h-10 flex items-center justify-center border transition-colors"
              style={{ borderColor: TEXT_DK + "50", color: TEXT_DK }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = BLUE_LT; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = ""; }}
            >
              <MagnifyingGlass className="h-4 w-4" weight="bold" />
            </button>
            <button
              className="lg:hidden w-10 h-10 flex items-center justify-center transition-colors"
              style={{ color: TEXT_DK }}
              onClick={() => setMenuOpen(p => !p)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="h-5 w-5" weight="bold" /> : <List className="h-5 w-5" weight="bold" />}
            </button>
          </div>

        </div>
      </div>

      {/* ── Mobile menu ── */}
      <div className={cn(
        "lg:hidden overflow-hidden transition-all duration-300",
        menuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
      )} style={{ backgroundColor: BLUE_DK }}>
        <nav className="px-4 py-2 space-y-0.5">
          {NAV_ITEMS.map(({ key, label_vi, label_en, href }) => (
            <Link
              key={key}
              href={href}
              onClick={() => setMenuOpen(false)}
              className={cn(
                "block px-3 py-2.5 text-sm font-bold transition-colors hover:bg-white/20",
                isActive(href) ? "text-white" : ""
              )}
              style={isActive(href) ? { backgroundColor: BLUE_DK, color: "white" } : { color: TEXT_DK }}
            >
              {locale === "vi" ? label_vi : label_en}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
