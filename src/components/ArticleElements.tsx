import React from 'react';
import { Container } from '../shared/ui/Container';
import { SectionEyebrow } from '../shared/ui/SectionHeading';

/**
 * Controlled Reading Column for Article Prose
 * Constrained to the shared `reading` container width (720px) for optimal
 * reading cadence and line length.
 */
export const ArticleReadingColumn: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => {
  return (
    <Container variant="reading" role="reading-column" className={`text-left ${className}`}>
      {children}
    </Container>
  );
};

/**
 * Article Lead Paragraph
 * 21px–26px, line-height 1.6, medium weight
 */
export const ArticleLead: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => {
  return (
    <p
      data-role="article-lead"
      className={`text-xl sm:text-2xl text-ink font-medium leading-[1.6] tracking-tight mb-8 font-sans ${className}`}
    >
      {children}
    </p>
  );
};

/**
 * Article Body Paragraph
 * 17px–19px desktop, 16–18px mobile, line-height 1.85, regular weight
 */
export const ArticleParagraph: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => {
  return (
    <p
      data-role="article-paragraph"
      className={`text-[17px] sm:text-[18px] text-ink-strong font-normal leading-[1.85] mb-6 font-sans antialiased break-keep ${className}`}
    >
      {children}
    </p>
  );
};

/**
 * Article Subheading
 * 28px–36px desktop, generous top margin, unnumbered
 */
export const ArticleSubheading: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => {
  return (
    <h3
      data-role="article-subheading"
      className={`text-2xl sm:text-3xl lg:text-[32px] font-bold text-ink tracking-tight mt-12 sm:mt-14 mb-6 leading-snug font-sans break-keep ${className}`}
    >
      {children}
    </h3>
  );
};

/**
 * Narrative Pull Quote / Big Question
 * 32px–46px in generous white space
 */
export const ArticlePullQuote: React.FC<{
  children: React.ReactNode;
  citation?: string;
  className?: string;
}> = ({ children, citation, className = '' }) => {
  return (
    <div data-role="article-pullquote" className={`py-10 sm:py-14 my-8 sm:my-12 border-y border-rule space-y-4 ${className}`}>
      <blockquote className="text-2xl sm:text-3xl lg:text-4xl font-bold text-ink tracking-tight leading-[1.3] font-sans break-keep">
        {children}
      </blockquote>
      {citation && (
        <div className="text-xs font-mono text-ink-muted uppercase tracking-wider">
          — {citation}
        </div>
      )}
    </div>
  );
};

/**
 * Key Finding Callout
 * Thin top/bottom rules, bold sentence, generous spacing, NO rounded box
 */
export const ArticleFinding: React.FC<{
  label?: string;
  statement: React.ReactNode;
  bigNumber?: string;
  className?: string;
}> = ({ label = 'KEY FINDING', statement, bigNumber, className = '' }) => {
  return (
    <div data-role="article-finding" className={`border-y border-rule py-6 sm:py-8 my-8 sm:my-10 space-y-3 ${className}`}>
      {label && (
        <SectionEyebrow>{label}</SectionEyebrow>
      )}
      {bigNumber && (
        <div className="text-5xl sm:text-7xl lg:text-8xl font-serif font-bold text-ink tracking-tight leading-none my-2">
          {bigNumber}
        </div>
      )}
      <div className="text-base sm:text-lg lg:text-xl font-bold text-ink leading-relaxed font-sans break-keep">
        {statement}
      </div>
    </div>
  );
};

/**
 * Large Editorial Finding (Standalone Visual Moment with oversized typography & whitespace)
 */
export const ArticleBigFinding: React.FC<{
  bigNumber: string;
  label?: string;
  statement: React.ReactNode;
  className?: string;
}> = ({ bigNumber, label, statement, className = '' }) => {
  return (
    <div data-role="article-big-finding" className={`py-12 sm:py-16 my-10 sm:my-14 border-y border-rule text-left space-y-4 ${className}`}>
      {label && (
        <SectionEyebrow>{label}</SectionEyebrow>
      )}
      <div className="text-6xl sm:text-8xl lg:text-9xl font-serif font-bold text-ink tracking-tight leading-none">
        {bigNumber}
      </div>
      <p className="text-lg sm:text-xl lg:text-2xl text-ink font-medium leading-relaxed max-w-reading break-keep">
        {statement}
      </p>
    </div>
  );
};

/**
 * Figure Caption with Numbering
 * FIG. 01 · ...
 */
export const ArticleFigureCaption: React.FC<{
  figNum?: string;
  caption: React.ReactNode;
  source?: string;
  className?: string;
}> = ({ figNum, caption, source, className = '' }) => {
  return (
    <figcaption data-role="figure-caption" className={`pt-3 space-y-1 text-xs font-mono ${className}`}>
      <div className="text-ink font-semibold flex items-start gap-2">
        {figNum && <span className="text-ink font-bold shrink-0 whitespace-nowrap">{figNum} ·</span>}
        <span className="text-ink-body font-normal break-keep">{caption}</span>
      </div>
      {source && <div className="text-ink-subtle text-[11px] break-keep">{source}</div>}
    </figcaption>
  );
};

/**
 * Muted Source Reference
 */
export const ArticleSource: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => {
  return (
    <div data-role="article-source" className={`text-xs font-mono text-ink-muted pt-2 ${className}`}>
      {children}
    </div>
  );
};

/**
 * Article Footnotes List
 */
export const ArticleFootnotes: React.FC<{
  footnotes: string[];
  className?: string;
}> = ({ footnotes, className = '' }) => {
  if (!footnotes || footnotes.length === 0) return null;
  return (
    <div data-role="article-footnotes" className={`border-t border-rule pt-5 mt-10 space-y-2 text-xs font-mono text-ink-muted ${className}`}>
      <div data-source="widget" className="text-[11px] font-bold text-ink uppercase tracking-wider">
        NOTES &amp; REFERENCES
      </div>
      <ul className="space-y-1.5 list-none">
        {footnotes.map((fn, idx) => (
          <li key={idx} className="leading-relaxed">
            {fn}
          </li>
        ))}
      </ul>
    </div>
  );
};

/**
 * Full-Width Data Visualization Breakout
 * Allows large charts or interactive components to stretch across the
 * shared `wide` editorial grid (1360px).
 *
 * `figure` makes it a real `<figure>`, which is what lets the
 * `ArticleFigureCaption` inside it be a `<figcaption>` — that is the pairing
 * that ties a caption to the chart it describes. Set it wherever the breakout
 * contains a captioned exhibit; leave it off for breakouts that are purely
 * interactive and have no caption. The classes are identical either way.
 */
export const ArticleFullWidthBreak: React.FC<{
  figure?: boolean;
  children: React.ReactNode;
  className?: string;
}> = ({ figure = false, children, className = '' }) => {
  if (figure) {
    return (
      <figure
        data-role="figure"
        className={`w-full mx-auto max-w-wide my-12 sm:my-16 ${className}`}
      >
        {children}
      </figure>
    );
  }
  return (
    <Container variant="wide" role="full-width-break" className={`my-12 sm:my-16 ${className}`}>
      {children}
    </Container>
  );
};
