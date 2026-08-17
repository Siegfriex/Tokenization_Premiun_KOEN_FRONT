import React from 'react';

/**
 * A single subword token as rendered by the tokenizer, shown as a chip.
 *
 * This is the visual vocabulary of the site's core claim — that the same
 * sentence segments into a different number of pieces in Korean and English —
 * so the chip is a named primitive rather than an inline class string. It
 * belongs to the DATA-MARK layer (see shared/config/tokens.css): hovering a
 * chip fills it near-black, not cobalt, so that reading a token stream never
 * looks like selecting something.
 *
 * `weight` distinguishes the two token streams that appear side by side.
 * It is a prop rather than a `className` passthrough because two competing
 * `font-*` utilities in one class attribute resolve by stylesheet order, not
 * by the order they are written — which would make the distinction silently
 * order-dependent.
 */
export const TokenChip: React.FC<{
  weight?: 'medium' | 'semibold';
  children: React.ReactNode;
}> = ({ weight = 'medium', children }) => {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-xs bg-surface-alt text-ink-strong border border-rule hover:bg-mark hover:text-on-accent transition-colors text-xs font-mono ${
        weight === 'semibold' ? 'font-semibold' : 'font-medium'
      }`}
    >
      {children}
    </span>
  );
};
