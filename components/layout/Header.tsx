"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ListIcon, XIcon, MagnifyingGlassIcon, MapPinIcon, SunDimIcon, MoonStarsIcon } from "@phosphor-icons/react";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

/* Brand palette */
const BLUE_DK = "#4A90C4";   /* top bar + active tab          */
const TEXT_DK = "#000000";  

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
  const navRef = useRef<HTMLDivElement | null>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const [indicatorStyle, setIndicatorStyle] = useState({ x: 0, width: 0, opacity: 0 });

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    const base = href.split("#")[0];
    return base !== "/" && pathname.startsWith(base);
  };

  const activeKey = NAV_ITEMS.find((item) => isActive(item.href))?.key;

  useEffect(() => {
    const updateIndicator = () => {
      if (!navRef.current || !activeKey) {
        setIndicatorStyle((prev) => ({ ...prev, opacity: 0 }));
        return;
      }

      const activeLink = linkRefs.current[activeKey];
      if (!activeLink) {
        setIndicatorStyle((prev) => ({ ...prev, opacity: 0 }));
        return;
      }

      const navRect = navRef.current.getBoundingClientRect();
      const linkRect = activeLink.getBoundingClientRect();

      setIndicatorStyle({
        x: linkRect.left - navRect.left,
        width: linkRect.width,
        opacity: 1,
      });
    };

    updateIndicator();
    window.addEventListener("resize", updateIndicator);
    return () => window.removeEventListener("resize", updateIndicator);
  }, [activeKey, locale]);

  return (
    <header className="sticky top-0 left-0 right-0 z-50 shadow-sm bg-background border-b border-border">

      {/* ── Top bar ── */}
      <div style={{ backgroundColor: BLUE_DK }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-9 gap-2">
          {/* Address */}
          <a
            href="https://maps.google.com/?q=302%20%C4%90.%20G%C3%B2%20D%C6%B0a%2C%20Ph%C6%B0%E1%BB%9Dng%20Tam%20B%C3%ACnh%2C%20TP.%20H%E1%BB%93%20Ch%C3%AD%20Minh"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center font-medium gap-1.5 text-white/80 hover:text-white tracking-tighter transition-colors text-xs"
            aria-label="Xem bản đồ"
          >
            <MapPinIcon className="h-3.5 w-3.5" weight="fill" />
            <span>302 Gò Dưa, Phường Tam Bình, TP. Hồ Chí Minh</span>
          </a>
          <div className="flex items-center gap-2 ml-auto">
          <LanguageSwitcher />
          <span className="w-px h-4 bg-white/20" />
          <button
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
            className="flex items-center justify-center w-7 h-7 text-white/70 hover:text-white hover:bg-white/10 hover:rounded-[9999px] transition-colors"
          >
            {resolvedTheme === "dark"
              ? <SunDimIcon className="h-4 w-4" weight="bold" />
              : <MoonStarsIcon className="h-4 w-4" weight="bold" />
            }
          </button>
          </div>
        </div>
      </div>

      {/* ── Main bar ── */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-stretch h-14 lg:h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3.5 pr-6 shrink-0" aria-label="CEC Center Home">
            <div className="relative w-11 h-11 lg:w-12 lg:h-12 shrink-0 p-1">
              <Image
                src="/images/cec-logo.png"
                alt="CEC"
                fill
                sizes="(max-width: 1024px) 44px, 48px"
                className="object-contain"
                onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
              />
            </div>
            <div className="hidden sm:block leading-tight">
              <p className="font-bold text-base lg:text-lg tracking-tighter" style={{ color: TEXT_DK }}>CEC Center</p>
              <p className="text-xs lg:text-sm" style={{ color: TEXT_DK, opacity: 0.6 }}>LAS - XD 449</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-stretch flex-1 justify-center">
            <div ref={navRef} className="relative flex h-full items-center gap-8 xl:gap-9 pb-1">
              {NAV_ITEMS.map(({ key, label_vi, label_en, href }) => {
                const active = isActive(href);
                return (
                  <Link
                    key={key}
                    href={href}
                    ref={(el) => {
                      linkRefs.current[key] = el;
                    }}
                    className="flex h-full items-center px-1 xl:px-1.5 text-base font-medium tracking-tighter whitespace-nowrap transition-colors"
                    style={{ color: active ? BLUE_DK : TEXT_DK }}
                  >
                    {locale === "vi" ? label_vi : label_en}
                  </Link>
                );
              })}

              <span
                className="pointer-events-none absolute bottom-1 h-0.5 rounded-full transition-all duration-300 ease-out"
                style={{
                  transform: `translateX(${indicatorStyle.x}px)`,
                  width: `${indicatorStyle.width}px`,
                  opacity: indicatorStyle.opacity,
                  backgroundColor: BLUE_DK,
                }}
              />
            </div>
          </nav>

          {/* Search + mobile toggle */}
          <div className="flex items-center gap-1 ml-auto">
            <button
              aria-label="Search"
              className="w-10 h-10 flex items-center justify-center transition-colors"
              style={{ borderColor: TEXT_DK + "50", color: TEXT_DK }}
            >
              <MagnifyingGlassIcon className="h-6 w-6" weight="regular" />
            </button>
            <button
              className="lg:hidden w-10 h-10 flex items-center justify-center transition-colors"
              style={{ color: TEXT_DK }}
              onClick={() => setMenuOpen(p => !p)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <XIcon className="h-5 w-5" weight="bold" /> : <ListIcon className="h-5 w-5" weight="bold" />}
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
              className="block px-3 py-2.5 text-sm font-bold transition-colors"
              style={{
                color: isActive(href) ? "white" : "rgba(255,255,255,0.8)",
                textDecoration: isActive(href) ? "underline" : "none",
                textUnderlineOffset: "5px",
                textDecorationThickness: "2px",
              }}
            >
              {locale === "vi" ? label_vi : label_en}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
