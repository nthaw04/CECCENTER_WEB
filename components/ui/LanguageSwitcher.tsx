"use client";

import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import { Globe } from "@phosphor-icons/react";

export function LanguageSwitcher() {
  const { locale, toggleLanguage } = useLanguage();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className="flex items-center gap-1.5 font-medium text-sm px-2"
      aria-label="Switch language"
    >
      <Globe className="h-4 w-4" weight="bold" />
      <span className="uppercase tracking-wide">{locale === "vi" ? "EN" : "VI"}</span>
    </Button>
  );
}
