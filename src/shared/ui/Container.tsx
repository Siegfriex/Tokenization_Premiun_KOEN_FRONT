import React from 'react';

type ContainerVariant = 'wide' | 'reading';

// Tailwind v4 auto-generates `max-w-<name>` utilities from `--container-<name>`
// theme keys (the same mechanism that produces its built-in `max-w-lg`, etc.
// from `--container-lg`) — see docs/design/COLOR_HACK_FINDING.md's sibling
// verification in the Phase 2 PR description.
const VARIANT_CLASS: Record<ContainerVariant, string> = {
  wide: 'max-w-wide',
  reading: 'max-w-reading',
};

/**
 * Horizontal width primitive. `wide` (1360px) is the standard section/
 * full-width-breakout container used across every widget; `reading`
 * (720px) is the constrained prose measure (see ArticleReadingColumn in
 * ArticleElements.tsx, which composes this for article body copy).
 */
export const Container: React.FC<{
  variant?: ContainerVariant;
  gutter?: boolean;
  /** Overrides `data-role` for composed wrappers that are a named thing in
   *  their own right (the reading column, the full-width breakout). */
  role?: string;
  children: React.ReactNode;
  className?: string;
}> = ({ variant = 'wide', gutter = false, role = 'container', children, className = '' }) => {
  const gutterClass = gutter ? 'px-4 sm:px-6 lg:px-12' : '';
  return (
    <div data-role={role} data-measure={variant} className={`w-full mx-auto ${VARIANT_CLASS[variant]} ${gutterClass} ${className}`}>
      {children}
    </div>
  );
};
