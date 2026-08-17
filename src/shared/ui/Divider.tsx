import React from 'react';

type Tone = 'default' | 'subtle';

const TONE_CLASS: Record<Tone, string> = {
  default: 'border-rule',
  subtle: 'border-rule/60',
};

/** Horizontal rule primitive — replaces repeated `border-t border-[#DADAD6]`. */
export const Divider: React.FC<{ tone?: Tone; className?: string }> = ({
  tone = 'default',
  className = '',
}) => <hr className={`border-t ${TONE_CLASS[tone]} ${className}`} />;
