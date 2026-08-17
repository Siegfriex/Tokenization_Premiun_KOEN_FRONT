import React from 'react';
import { useUILanguage } from '../features/change-language';
import { LanguageSwitch } from '../features/change-language';
import { useActiveSection, useScrollProgress } from '../features/observe-scroll-section';
import { NAV_SECTIONS, NAV_SECTION_IDS } from '../entities/navigation';
import { getLocalizedText } from '../shared/i18n';
import { Container } from '../shared/ui';

export const StoryProgress: React.FC = () => {
  const { language } = useUILanguage();
  const scrollPercent = useScrollProgress();
  const activeSection = useActiveSection(NAV_SECTION_IDS);

  const isKo = language === 'ko';

  return (
    <header className="sticky top-0 z-50 bg-surface/95 backdrop-blur-md border-b border-rule text-ink transition-all">
      {/* Top Bar */}
      <Container className="px-4 sm:px-6 lg:px-10 h-14 flex items-center justify-between gap-6">
        {/* Brand / Article Header */}
        <div className="flex items-center gap-3 shrink-0">
          <span className="w-2 h-2 rounded-full bg-accent"></span>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono tracking-widest text-ink uppercase font-bold">
              DATA JOURNALISM
            </span>
            <span className="text-rule-neutral hidden sm:inline">|</span>
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
                aria-current={isActive ? 'location' : undefined}
                className={`px-2.5 py-1 rounded-xs transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rule-strong ${
                  isActive
                    ? 'text-on-accent bg-accent font-bold'
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
      </Container>

      {/* Thin Reading Progress Indicator Bar in Editorial Ink */}
      <div className="w-full h-[2px] bg-mark-track">
        <div
          className="h-full bg-accent transition-all duration-150"
          style={{ width: `${scrollPercent}%` }}
        />
      </div>
    </header>
  );
};
