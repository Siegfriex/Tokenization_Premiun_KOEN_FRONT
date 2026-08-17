import React from 'react';

type Space = 'xs' | 'sm' | 'md';
type Align = 'center' | 'start' | 'end';

const SPACE_CLASS: Record<Space, string> = {
  xs: 'gap-1.5',
  sm: 'gap-2',
  md: 'gap-3',
};

const ALIGN_CLASS: Record<Align, string> = {
  center: 'items-center',
  start: 'items-start',
  end: 'items-end',
};

/** Horizontal wrapping cluster — replaces ad hoc `flex flex-wrap items-center gap-{n}`. */
export const Cluster: React.FC<{
  space?: Space;
  align?: Align;
  className?: string;
  children: React.ReactNode;
}> = ({ space = 'sm', align = 'center', className = '', children }) => (
  <div className={`flex flex-wrap ${ALIGN_CLASS[align]} ${SPACE_CLASS[space]} ${className}`}>
    {children}
  </div>
);
