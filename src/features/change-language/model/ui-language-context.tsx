import React, { createContext, useContext, useMemo, useState } from 'react';
import { UILanguage } from '../../../types';

type UILanguageContextValue = {
  language: UILanguage;
  isKo: boolean;
  setLanguage: (language: UILanguage) => void;
};

const UILanguageContext = createContext<UILanguageContextValue | null>(null);

/**
 * Single, shared owner of UI language state (previously `useState` in
 * App.tsx, prop-drilled as `uiLang` into all 12 section widgets — see
 * docs/INTERACTION_AUDIT.md). Default language is unchanged ('ko').
 */
export const UILanguageProvider: React.FC<{
  children: React.ReactNode;
  defaultLanguage?: UILanguage;
}> = ({ children, defaultLanguage = 'ko' }) => {
  const [language, setLanguage] = useState<UILanguage>(defaultLanguage);
  const value = useMemo(
    () => ({ language, isKo: language === 'ko', setLanguage }),
    [language]
  );
  return <UILanguageContext.Provider value={value}>{children}</UILanguageContext.Provider>;
};

export function useUILanguage(): UILanguageContextValue {
  const ctx = useContext(UILanguageContext);
  if (!ctx) {
    throw new Error('useUILanguage must be used within a UILanguageProvider');
  }
  return ctx;
}
