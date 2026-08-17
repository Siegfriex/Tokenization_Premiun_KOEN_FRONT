import React from 'react';

type SectionSpacing = 'compact' | 'default' | 'spacious';
type SectionTone = 'default' | 'muted';

const SPACING_CLASS: Record<SectionSpacing, string> = {
  compact: 'py-16 sm:py-20',
  default: 'py-20 sm:py-28',
  spacious: 'py-24 sm:py-32',
};

const TONE_CLASS: Record<SectionTone, string> = {
  default: 'bg-surface text-ink',
  muted: 'bg-surface-alt text-ink',
};

/**
 * Standard top-level page section: consistent vertical rhythm, background
 * tone, and bottom rule. Every widget's outer `<section>` currently
 * repeats this by hand with one of a handful of near-identical class
 * strings (see docs/DESIGN_AUDIT.md "Section vertical rhythm").
 */
export const Section: React.FC<{
  id?: string;
  spacing?: SectionSpacing;
  tone?: SectionTone;
  rule?: boolean;
  className?: string;
  children: React.ReactNode;
}> = ({ id, spacing = 'default', tone = 'default', rule = true, className = '', children }) => {
  const ruleClass = rule ? 'border-b border-rule' : '';
  return (
    <section
      id={id}
      className={`${SPACING_CLASS[spacing]} ${TONE_CLASS[tone]} ${ruleClass} scroll-mt-12 ${className}`}
    >
      {children}
    </section>
  );
};
