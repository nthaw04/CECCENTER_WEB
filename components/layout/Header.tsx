"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { List, X } from "@phosphor-icons/react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { key: "about" as const, href: "/#about" },
  { key: "services" as const, href: "/services" },
  { key: "team" as const, href: "/team" },
  { key: "structure" as const, href: "/structure" },
  { key: "contact" as const, href: "/contact" },
];

export function Header() {
  const { t } = useLanguage();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = () => {
    setMenuOpen(false);
  };

  /* Transparent only on the home page before scrolling */
  const onHero = pathname === "/" && !scrolled;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        onHero
          ? "bg-transparent"
          : "bg-background/95 backdrop-blur-md border-b border-border shadow-sm"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* ── Logo ─────────────────────────────────────── */}
          <Link
            href="/"
            className="flex items-center gap-3 shrink-0"
            aria-label="CEC Center Home"
          >
            <div className="relative w-10 h-10 lg:w-12 lg:h-12 shrink-0">
              <Image
                src="/images/cec.svg"
                alt="CEC Center Logo"
                fill
                className="object-contain"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                }}
              />
              {/* Fallback initials */}
              {/* <div
                className={cn(
                  "w-full h-full flex items-center justify-center border-2",
                  onHero
                    ? "border-white/40 bg-white/10"
                    : "border-primary/30 bg-primary/10"
                )}
              >
                <span
                  className={cn(
                    "text-xs font-black",
                    onHero ? "text-white" : "text-primary"
                  )}
                >
                  CEC
                </span>
              </div> */}
            </div>
            <div className="hidden sm:block">
              <p
                className={cn(
                  "font-bold text-sm lg:text-base leading-tight",
                  onHero ? "text-white" : "text-foreground"
                )}
              >
                CEC Center
              </p>
              <p
                className={cn(
                  "text-[10px] lg:text-xs leading-tight",
                  onHero ? "text-white/60" : "text-muted-foreground"
                )}
              >
                LAS - XD 449
              </p>
            </div>
          </Link>

          {/* ── Desktop Nav ───────────────────────────────── */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map(({ key, href }) => (
              <Link
                key={key}
                href={href}
                className={cn(
                  "px-3 py-2 text-sm font-medium transition-colors",
                  onHero
                    ? "text-white/80 hover:text-white hover:bg-white/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                )}
              >
                {t.nav[key]}
              </Link>
            ))}
          </nav>

          {/* ── Controls ──────────────────────────────────── */}
          <div
            className={cn(
              "flex items-center gap-1",
              onHero && "[&_button]:text-white [&_button:hover]:bg-white/10 [&_svg]:text-white"
            )}
          >
            <LanguageSwitcher />
            <ThemeToggle />
            {/* Mobile toggle */}
            <button
              className={cn(
                "lg:hidden w-9 h-9 flex items-center justify-center transition-colors",
                onHero ? "text-white hover:bg-white/10" : "text-foreground hover:bg-accent"
              )}
              onClick={() => setMenuOpen((p) => !p)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              {menuOpen ? (
                <X className="h-5 w-5" weight="bold" />
              ) : (
                <List className="h-5 w-5" weight="bold" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile menu ───────────────────────────────────── */}
      <div
        className={cn(
          "lg:hidden overflow-hidden transition-all duration-300",
          onHero ? "border-t border-white/10" : "border-t border-border",
          menuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <nav
          className={cn(
            "px-4 py-3 space-y-1",
            onHero ? "bg-black/60 backdrop-blur-md" : "bg-background/95 backdrop-blur-md"
          )}
        >
          {NAV_ITEMS.map(({ key, href }) => (
            <Link
              key={key}
              href={href}
              onClick={handleNavClick}
              className={cn(
                  "block px-3 py-2.5 text-sm font-medium transition-colors",
                onHero
                  ? "text-white/80 hover:text-white hover:bg-white/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
              )}
            >
              {t.nav[key]}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
