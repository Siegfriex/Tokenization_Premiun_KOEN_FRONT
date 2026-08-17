import React from 'react';
import { claimAttrs, type ClaimId } from '../trace';

/**
 * The mono, uppercase, letter-spaced label that opens a section or a callout.
 *
 * Nine section headers and two ArticleElements callouts carried this exact
 * class string independently; four of them still spelled it with a raw hex
 * that the legacy recolor pass happened to resolve to the same gray. It is the
 * site's most-repeated single typographic role, so it is named here once.
 */
export const SectionEyebrow: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => {
  return (
    <div
      data-role="eyebrow"
      className={`text-xs font-mono text-ink-muted font-bold uppercase tracking-widest ${className}`}
    >
      {children}
    </div>
  );
};

/**
 * The accent-underlined phrase inside a section heading.
 *
 * Every section heading in the story splits into a neutral first line and an
 * emphasized second line carrying the section's actual claim. The underline is
 * the one place the ACCENT layer touches editorial typography — it marks the
 * claim, it does not recolor the prose (see shared/config/tokens.css).
 */
export const HeadingAccent: React.FC<{
  /** Set when the accented phrase itself states a research figure, so the
   *  claim registry can find it in the DOM. */
  claim?: ClaimId;
  children: React.ReactNode;
}> = ({ claim, children }) => {
  return (
    <span
      data-role="heading-accent"
      {...(claim ? claimAttrs(claim) : {})}
      className="underline decoration-accent underline-offset-8 decoration-2"
    >
      {children}
    </span>
  );
};

/**
 * `default` is the standard section opener. `display` is one step larger and
 * one measure wider, used only by the closing EditorialConclusionSection so
 * the final question lands with more weight than the sections that argued
 * toward it.
 */
type HeadingScale = 'default' | 'display';

const SCALE: Record<HeadingScale, { wrapper: string; heading: string }> = {
  default: {
    wrapper: 'max-w-4xl',
    heading: 'text-3xl sm:text-5xl lg:text-6xl',
  },
  display: {
    wrapper: 'max-w-5xl',
    heading: 'text-4xl sm:text-6xl lg:text-7xl',
  },
};

/**
 * A section's opening block: eyebrow above, `<h2>` below.
 *
 * Owning the pair together (rather than exporting only a styled `<h2>`) is
 * what makes the story's heading hierarchy actually enforceable — the eyebrow
 * spacing, the measure, and the type scale move as one unit, and a new section
 * cannot accidentally ship a heading one size off.
 */
export const SectionHeading: React.FC<{
  eyebrow?: React.ReactNode;
  scale?: HeadingScale;
  children: React.ReactNode;
  className?: string;
}> = ({ eyebrow, scale = 'default', children, className = '' }) => {
  const { wrapper, heading } = SCALE[scale];
  return (
    <div data-role="section-heading" className={`space-y-4 ${wrapper} ${className}`}>
      {eyebrow && <SectionEyebrow>{eyebrow}</SectionEyebrow>}
      <h2 className={`${heading} font-bold tracking-tight text-ink leading-tight`}>
        {children}
      </h2>
    </div>
  );
};
