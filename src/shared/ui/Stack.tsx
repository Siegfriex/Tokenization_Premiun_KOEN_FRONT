import React from 'react';

type Space = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

const SPACE_CLASS: Record<Space, string> = {
  xs: 'space-y-2',
  sm: 'space-y-4',
  md: 'space-y-6',
  lg: 'space-y-8',
  xl: 'space-y-12',
};

/** Vertical rhythm primitive — replaces ad hoc `space-y-{2,3,4,6,8,10,12,16}`. */
export const Stack: React.FC<{
  space?: Space;
  className?: string;
  children: React.ReactNode;
}> = ({ space = 'md', className = '', children }) => (
  <div className={`${SPACE_CLASS[space]} ${className}`}>{children}</div>
);
