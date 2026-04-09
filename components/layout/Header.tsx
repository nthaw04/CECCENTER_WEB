"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ListIcon,
  XIcon,
  MagnifyingGlassIcon,
  MapPinIcon,
} from "@phosphor-icons/react";
import { X } from "lucide-react";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { useLanguage } from "@/context/LanguageContext";
import useSearch from "@/hooks/useSearch";
import { cn } from "@/lib/utils";

/* Brand palette */
const BLUE_DK = "#4A90C4"; /* top bar + active tab          */
const TEXT_DK = "#000000";

const NAV_ITEMS = [
  { key: "home", label_vi: "TRANG CHỦ", label_en: "Home", href: "/" },
  {
    key: "services",
    label_vi: "LĨNH VỰC HOẠT ĐỘNG",
    label_en: "Services",
    href: "/services",
  },
  {
    key: "structure",
    label_vi: "DỰ ÁN",
    label_en: "Projects",
    href: "/structure",
  },
  {
    key: "lab-capacity-disclosure",
    label_vi: "CÔNG BỐ NLHĐ THÍ NGHIỆM",
    label_en: "Lab Capacity Disclosure",
    href: "/cong-bo-nlhd-thi-nghiem",
  },
  { key: "team", label_vi: "NHÂN LỰC", label_en: "Team", href: "/team" },
  {
    key: "recruitment",
    label_vi: "TUYỂN DỤNG",
    label_en: "Recruitment",
    href: "/recruitment",
  },
  {
    key: "contact",
    label_vi: "LIÊN HỆ",
    label_en: "Contact",
    href: "/contact",
  },
];

export function Header() {
  const { locale } = useLanguage();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const navRef = useRef<HTMLDivElement | null>(null);
  const searchWrapRef = useRef<HTMLDivElement | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const [indicatorStyle, setIndicatorStyle] = useState({
    x: 0,
    width: 0,
    opacity: 0,
  });
  const { query, setQuery, results, isLoading, clearSearch } = useSearch();

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

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setSearchOpen(false);
      clearSearch();
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [pathname, clearSearch]);

  useEffect(() => {
    if (!searchOpen) return;

    const frame = window.requestAnimationFrame(() => {
      searchInputRef.current?.focus();
    });

    return () => window.cancelAnimationFrame(frame);
  }, [searchOpen]);

  useEffect(() => {
    if (!searchOpen) return;

    const onPointerDown = (event: MouseEvent | TouchEvent) => {
      if (!searchWrapRef.current) return;
      const target = event.target as Node;
      if (!searchWrapRef.current.contains(target)) {
        setSearchOpen(false);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [searchOpen]);

  const getTypeLabel = (type: "page" | "section" | "feature" | "contact") => {
    if (locale === "vi") {
      if (type === "page") return "Trang";
      if (type === "section") return "Mục";
      if (type === "feature") return "Dịch vụ";
      return "Liên hệ";
    }

    if (type === "page") return "Page";
    if (type === "section") return "Section";
    if (type === "feature") return "Feature";
    return "Contact";
  };

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
          </div>
        </div>
      </div>

      {/* ── Main bar ── */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-stretch h-14 lg:h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3.5 pr-6 shrink-0"
            aria-label="CEC Center Home"
          >
            <div className="relative w-11 h-11 lg:w-12 lg:h-12 shrink-0 p-1">
              <Image
                src="/images/cec-logo.png"
                alt="CEC"
                fill
                sizes="(max-width: 1024px) 44px, 48px"
                className="object-contain"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                }}
              />
            </div>
            <div className="hidden sm:block leading-tight">
              <p
                className="font-bold text-base lg:text-lg tracking-tighter"
                style={{ color: TEXT_DK }}
              >
                CEC Center
              </p>
              <p
                className="text-xs lg:text-sm"
                style={{ color: TEXT_DK, opacity: 0.6 }}
              >
                LAS - XD 449
              </p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-stretch flex-1 justify-center">
            <div
              ref={navRef}
              className="relative flex h-full items-center gap-6 xl:gap-7 pb-1"
            >
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
            <div ref={searchWrapRef} className="relative">
              <button
                type="button"
                aria-label="Search"
                className="w-10 h-10 flex items-center justify-center transition-colors"
                style={{ borderColor: TEXT_DK + "50", color: TEXT_DK }}
                onClick={() => setSearchOpen((prev) => !prev)}
              >
                <MagnifyingGlassIcon className="h-6 w-6" weight="regular" />
              </button>

              {searchOpen && (
                <div className="absolute right-0 top-[calc(100%+10px)] z-70 w-[92vw] max-w-md overflow-hidden rounded-xl border border-border bg-background shadow-xl">
                  <div className="flex items-center gap-2 border-b border-border px-3">
                    <MagnifyingGlassIcon
                      className="h-5 w-5 text-muted-foreground"
                      weight="bold"
                    />
                    <input
                      ref={searchInputRef}
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder={
                        locale === "vi" ? "Nhập từ khóa..." : "Type keyword..."
                      }
                      className="h-11 w-full tracking-tighter bg-transparent text-sm outline-none"
                    />
                    {query && (
                      <button
                        type="button"
                        onClick={clearSearch}
                        className="h-7 w-7 inline-flex tracking-tighter items-center justify-center rounded-md hover:bg-muted"
                        aria-label={
                          locale === "vi" ? "Xóa tìm kiếm" : "Clear search"
                        }
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>

                  <div className="max-h-[55vh] overflow-y-auto p-2">
                    {isLoading && (
                      <p className="px-2 py-2 text-sm tracking-tighter text-muted-foreground">
                        {locale === "vi" ? "Đang tìm..." : "Searching..."}
                      </p>
                    )}

                    {!isLoading && query.trim().length === 0 && (
                      <p className="px-2 py-2 text-sm tracking-tighter text-muted-foreground">
                        {locale === "vi"
                          ? "Gợi ý nhanh: dự án, tuyển dụng, liên hệ..."
                          : "Quick suggestions: projects, recruitment, contact..."}
                      </p>
                    )}

                    {!isLoading &&
                      query.trim().length > 0 &&
                      query.trim().length < 2 && (
                        <p className="px-2 py-2 text-sm tracking-tighter text-muted-foreground">
                          {locale === "vi"
                            ? "Nhập ít nhất 2 ký tự"
                            : "Enter at least 2 characters"}
                        </p>
                      )}

                    {!isLoading &&
                      query.trim().length >= 2 &&
                      results.length === 0 && (
                        <p className="px-2 py-2 text-sm tracking-tighter text-muted-foreground">
                          {locale === "vi"
                            ? "Không tìm thấy kết quả phù hợp"
                            : "No matching results found"}
                        </p>
                      )}

                    {!isLoading && results.length > 0 && (
                      <div className="space-y-1">
                        {results.map((item) => (
                          <Link
                            key={item.id}
                            href={item.href}
                            onClick={() => {
                              setSearchOpen(false);
                              clearSearch();
                            }}
                            className="block rounded-md border border-transparent px-3 py-2.5 hover:bg-blue-50 hover:border-blue-400 transition-colors"
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div>
                                <p className="text-sm font-semibold tracking-tighter text-foreground">
                                  {item.title}
                                </p>
                                <p className="text-xs tracking-tighter text-muted-foreground mt-1 line-clamp-2">
                                  {item.description}
                                </p>
                              </div>
                              <span className="shrink-0 rounded-full border border-border px-2 py-0.5 text-xs tracking-tighter text-muted-foreground">
                                {getTypeLabel(item.type)}
                              </span>
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
            <button
              className="lg:hidden w-10 h-10 flex items-center justify-center transition-colors"
              style={{ color: TEXT_DK }}
              onClick={() => setMenuOpen((p) => !p)}
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <XIcon className="h-5 w-5" weight="bold" />
              ) : (
                <ListIcon className="h-5 w-5" weight="bold" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile menu ── */}
      <div
        className={cn(
          "lg:hidden overflow-hidden transition-all duration-300",
          menuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0",
        )}
        style={{ backgroundColor: BLUE_DK }}
      >
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
