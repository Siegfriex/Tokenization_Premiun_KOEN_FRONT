import React, { useState, useEffect } from 'react';
import { useUILanguage } from '../features/change-language';
import { LanguageSwitch } from '../features/change-language';
import { NAV_SECTIONS } from '../entities/navigation';
import { getLocalizedText } from '../shared/i18n';

export const StoryProgress: React.FC = () => {
  const { language } = useUILanguage();
  const [scrollPercent, setScrollPercent] = useState<number>(0);
  const [activeSection, setActiveSection] = useState<string>('hero');

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
      setScrollPercent(Math.min(100, Math.max(0, scrolled)));

      // Detect active section
      for (let i = NAV_SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(NAV_SECTIONS[i].id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 240) {
            setActiveSection(NAV_SECTIONS[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isKo = language === 'ko';

  return (
    <header className="sticky top-0 z-50 bg-surface/95 backdrop-blur-md border-b border-rule text-ink transition-all">
      {/* Top Bar */}
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-10 h-14 flex items-center justify-between gap-6">
        {/* Brand / Article Header */}
        <div className="flex items-center gap-3 shrink-0">
          <span className="w-2 h-2 rounded-full bg-surface-inverse"></span>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono tracking-widest text-ink uppercase font-bold">
              DATA JOURNALISM
            </span>
            <span className="text-[#DADAD6] hidden sm:inline">|</span>
            <span className="text-sm font-semibold tracking-tight text-ink-body hidden md:inline">
              {isKo ? 'Token Premium: 생성형 AI의 언어 표기 효율성 격차' : 'Token Premium: Linguistic Efficiency Discrepancies in GenAI'}
            </span>
          </div>
        </div>

        {/* Desktop Quick Nav Links */}
        <nav className="hidden lg:flex items-center gap-1 text-[11px] font-mono">
          {NAV_SECTIONS.map((sec) => {
            const isActive = activeSection === sec.id;
            return (
              <a
                key={sec.id}
                href={`#${sec.id}`}
                className={`px-2.5 py-1 rounded-xs transition-colors ${
                  isActive
                    ? 'text-ink-inverse bg-surface-inverse font-bold'
                    : 'text-ink-muted hover:text-ink hover:bg-surface-alt'
                }`}
              >
                {getLocalizedText(sec.label, language)}
              </a>
            );
          })}
        </nav>

        {/* Right Controls: KO/EN Language Switch */}
        <div className="flex items-center gap-3 shrink-0">
          <LanguageSwitch />
        </div>
      </div>

      {/* Thin Reading Progress Indicator Bar in Editorial Ink */}
      <div className="w-full h-[2px] bg-[#E8E8E4]">
        <div
          className="h-full bg-surface-inverse transition-all duration-150"
          style={{ width: `${scrollPercent}%` }}
        />
      </div>
    </header>
  );
};
