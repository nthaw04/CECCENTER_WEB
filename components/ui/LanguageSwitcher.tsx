"use client";

import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import { GlobeIcon } from "@phosphor-icons/react";

export function LanguageSwitcher() {
  const { locale, toggleLanguage } = useLanguage();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className="flex items-center gap-1.5 font-medium text-sm px-2 text-white hover:text-white dark:text-black dark:hover:text-black"
      aria-label="Switch language"
    >
      <GlobeIcon className="h-6 w-6" weight="regular" />
      <span className="uppercase tracking-wide">{locale === "vi" ? "EN" : "VI"}</span>
    </Button>
  );
}
