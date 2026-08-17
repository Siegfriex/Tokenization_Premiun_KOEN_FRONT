import React from 'react';
import { useUILanguage } from '../model/ui-language-context';

/** Moved unchanged (markup/classes) from src/components/StoryProgress.tsx. */
export const LanguageSwitch: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { language, setLanguage } = useUILanguage();
  const isKo = language === 'ko';

  return (
    <div
      className={`inline-flex items-center bg-surface-alt rounded-xs p-0.5 border border-rule text-xs font-mono ${className}`}
    >
      <button
        type="button"
        onClick={() => setLanguage('ko')}
        className={`px-2.5 py-0.5 rounded-xs transition-all cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rule-strong ${
          isKo ? 'bg-surface-inverse text-ink-inverse font-bold' : 'text-ink-muted hover:text-ink'
        }`}
        aria-pressed={isKo}
      >
        KO
      </button>
      <button
        type="button"
        onClick={() => setLanguage('en')}
        className={`px-2.5 py-0.5 rounded-xs transition-all cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rule-strong ${
          !isKo ? 'bg-surface-inverse text-ink-inverse font-bold' : 'text-ink-muted hover:text-ink'
        }`}
        aria-pressed={!isKo}
      >
        EN
      </button>
    </div>
  );
};
