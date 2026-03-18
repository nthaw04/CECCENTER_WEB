"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import vi, { type Translations } from "@/lib/translations/vi";
import en from "@/lib/translations/en";

type Locale = "vi" | "en";

interface LanguageContextValue {
  locale: Locale;
  t: Translations;
  toggleLanguage: () => void;
  setLocale: (locale: Locale) => void;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(
  undefined
);

const translations: Record<Locale, Translations> = { vi, en };

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("vi");

  const toggleLanguage = useCallback(() => {
    setLocaleState((prev) => (prev === "vi" ? "en" : "vi"));
  }, []);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
  }, []);

  const value: LanguageContextValue = {
    locale,
    t: translations[locale],
    toggleLanguage,
    setLocale,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used inside <LanguageProvider>");
  }
  return ctx;
}
