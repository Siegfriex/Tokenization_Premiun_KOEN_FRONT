import React, { useState, useEffect } from 'react';
import { UILanguage } from '../types';

interface StoryProgressProps {
  uiLang: UILanguage;
  setUiLang: (lang: UILanguage) => void;
}

const SECTIONS = [
  { id: 'hero', labelKo: 'S0. 커버', labelEn: 'S0. Cover' },
  { id: 'compare', labelKo: 'S1. 분절 비교', labelEn: 'S1. Compare' },
  { id: 'pipeline', labelKo: 'S2. 파이프라인', labelEn: 'S2. Pipeline' },
  { id: 'patterns', labelKo: 'S3. Token Premium', labelEn: 'S3. Premium' },
  { id: 'burden', labelKo: 'S4. 누적 부담', labelEn: 'S4. Burden' },
  { id: 'languages', labelKo: 'S4.5. 글로벌 다국어', labelEn: 'S4.5. Global' },
  { id: 'impact', labelKo: 'S5. 사회적 확장', labelEn: 'S5. Society' },
  { id: 'method', labelKo: 'S6. 방법론·한계', labelEn: 'S6. Method' },
  { id: 'result', labelKo: '결론', labelEn: 'Result' },
];

export const StoryProgress: React.FC<StoryProgressProps> = ({ uiLang, setUiLang }) => {
  const [scrollPercent, setScrollPercent] = useState<number>(0);
  const [activeSection, setActiveSection] = useState<string>('hero');

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
      setScrollPercent(Math.min(100, Math.max(0, scrolled)));

      // Detect active section
      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTIONS[i].id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 240) {
            setActiveSection(SECTIONS[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isKo = uiLang === 'ko';

  return (
    <header className="sticky top-0 z-50 bg-[#FFFFFF]/95 backdrop-blur-md border-b border-[#DADAD6] text-[#111111] transition-all">
      {/* Top Bar */}
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-10 h-14 flex items-center justify-between gap-6">
        {/* Brand / Article Header */}
        <div className="flex items-center gap-3 shrink-0">
          <span className="w-2 h-2 rounded-full bg-[#111111]"></span>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono tracking-widest text-[#111111] uppercase font-bold">
              DATA JOURNALISM
            </span>
            <span className="text-[#DADAD6] hidden sm:inline">|</span>
            <span className="text-sm font-semibold tracking-tight text-[#4A4A47] hidden md:inline">
              {isKo ? 'Token Premium: 생성형 AI의 언어 표기 효율성 격차' : 'Token Premium: Linguistic Efficiency Discrepancies in GenAI'}
            </span>
          </div>
        </div>

        {/* Desktop Quick Nav Links */}
        <nav className="hidden lg:flex items-center gap-1 text-[11px] font-mono">
          {SECTIONS.map((sec) => {
            const isActive = activeSection === sec.id;
            return (
              <a
                key={sec.id}
                href={`#${sec.id}`}
                className={`px-2.5 py-1 rounded-xs transition-colors ${
                  isActive
                    ? 'text-[#FFFFFF] bg-[#111111] font-bold'
                    : 'text-[#777773] hover:text-[#111111] hover:bg-[#F1F2F2]'
                }`}
              >
                {isKo ? sec.labelKo : sec.labelEn}
              </a>
            );
          })}
        </nav>

        {/* Right Controls: KO/EN Language Switch */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="inline-flex items-center bg-[#F1F2F2] rounded-xs p-0.5 border border-[#DADAD6] text-xs font-mono">
            <button
              type="button"
              onClick={() => setUiLang('ko')}
              className={`px-2.5 py-0.5 rounded-xs transition-all cursor-pointer ${
                isKo ? 'bg-[#111111] text-[#FFFFFF] font-bold' : 'text-[#777773] hover:text-[#111111]'
              }`}
            >
              KO
            </button>
            <button
              type="button"
              onClick={() => setUiLang('en')}
              className={`px-2.5 py-0.5 rounded-xs transition-all cursor-pointer ${
                !isKo ? 'bg-[#111111] text-[#FFFFFF] font-bold' : 'text-[#777773] hover:text-[#111111]'
              }`}
            >
              EN
            </button>
          </div>
        </div>
      </div>

      {/* Thin Reading Progress Indicator Bar in Editorial Ink */}
      <div className="w-full h-[2px] bg-[#E8E8E4]">
        <div
          className="h-full bg-[#111111] transition-all duration-150"
          style={{ width: `${scrollPercent}%` }}
        />
      </div>
    </header>
  );
};
