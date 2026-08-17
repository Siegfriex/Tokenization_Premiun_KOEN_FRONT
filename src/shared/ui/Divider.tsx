import React from 'react';

type Tone = 'default' | 'subtle';

const TONE_CLASS: Record<Tone, string> = {
  default: 'border-rule',
  subtle: 'border-rule/60',
};

/** Horizontal rule primitive — one `border-t` + rule token instead of per-widget hairlines. */
export const Divider: React.FC<{ tone?: Tone; className?: string }> = ({
  tone = 'default',
  className = '',
}) => <hr data-role="divider" className={`border-t ${TONE_CLASS[tone]} ${className}`} />;
