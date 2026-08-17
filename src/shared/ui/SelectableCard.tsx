import React from 'react';

/**
 * Resting appearance of an unselected card. Each option pairs a surface with
 * the ink that reads correctly on it — they are chosen together, not mixed.
 */
type SelectableSurface = 'surface' | 'surface-alt';

/**
 * How selection is expressed.
 *
 * - `fill`    the card inverts onto the accent surface. Used where selecting a
 *             card swaps the exhibit next to it (sentence pair, domain,
 *             language, iteration preset).
 * - `outline` the card keeps its surface and strengthens its border. Used by
 *             PipelineSection, where every step must stay readable at once
 *             because the row is read as a sequence, not as a picker.
 */
type SelectableVariant = 'fill' | 'outline';

const RESTING: Record<SelectableSurface, string> = {
  surface: 'bg-surface text-ink-body hover:text-ink',
  'surface-alt': 'bg-surface-alt text-ink',
};

const FILLED = 'bg-accent border-accent text-on-accent shadow-xs';

/**
 * The one selectable-card interaction in this site, in one place.
 *
 * Before this component, five widgets each re-derived the same
 * `isSelected ? '…' : '…'` className and the same focus ring by hand
 * (docs/INTERACTION_AUDIT.md, "Selectable-card / pressed-button pattern").
 * What is shared — and what this component owns — is the *semantics and the
 * state palette*: a real `<button>`, `aria-pressed`, one focus-visible
 * treatment, and the accent-fill/rule-border state machine.
 *
 * What it deliberately does NOT own is layout. Padding, grid behavior and
 * internal composition stay at the call site via `className`, because a
 * 4-column pair picker, a 5-across pipeline step and an inline preset chip
 * share a state machine but share nothing about their geometry. Folding those
 * into variant props would produce exactly the do-everything component this
 * refactor is trying to avoid.
 *
 * Selection state itself stays local to each widget (INTERACTION_AUDIT.md's
 * conclusion) — this component takes `selected`/`onSelect` and owns no state.
 */
export const SelectableCard: React.FC<{
  selected: boolean;
  onSelect: () => void;
  /** Resting surface + ink pair. Defaults to the plain reading surface. */
  surface?: SelectableSurface;
  variant?: SelectableVariant;
  /**
   * Content-driven emphasis that outranks selection. PipelineSection's
   * "GAP ORIGIN" step is permanently filled because the research says that
   * step is where the token gap originates — that is a property of the data,
   * not of what the reader clicked, so it is a separate flag rather than a
   * second meaning for `selected`.
   */
  emphasized?: boolean;
  /**
   * Bold the whole card when it is filled. Only for cards whose children have
   * no weights of their own; cards that set weights per element must leave
   * this off or their internal hierarchy flattens.
   */
  boldWhenFilled?: boolean;
  /** Item id within its collection, for `data-item-id`. */
  itemId?: string | number;
  /** Layout only: padding, width, alignment, internal spacing. */
  className?: string;
  children: React.ReactNode;
}> = ({
  selected,
  onSelect,
  itemId,
  surface = 'surface',
  variant = 'fill',
  emphasized = false,
  boldWhenFilled = false,
  className = '',
  children,
}) => {
  const isFilled = emphasized || (selected && variant === 'fill');
  const isOutlined = !emphasized && selected && variant === 'outline';

  const stateClass = isFilled
    ? `${FILLED}${boldWhenFilled ? ' font-bold' : ''}`
    : isOutlined
    ? `${RESTING[surface]} border-ink`
    : `${RESTING[surface]} border-rule hover:border-ink`;

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      data-role="selectable"
      data-item-id={itemId}
      data-selected={selected || undefined}
      data-emphasized={emphasized || undefined}
      className={`rounded-xs border transition-all cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rule-strong ${stateClass} ${className}`}
    >
      {children}
    </button>
  );
};
