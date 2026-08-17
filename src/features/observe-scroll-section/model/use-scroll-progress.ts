import { useEffect, useState } from 'react';

/**
 * Reading-progress percentage (0-100), used to fill the thin progress bar
 * in the sticky header. Moved unchanged (identical math) from
 * StoryProgress.tsx's legacy scroll handler — this is a continuous
 * percentage, not a discrete active-section boundary, so it still
 * legitimately needs its own scroll listener (IntersectionObserver
 * cannot produce a continuous scroll percentage).
 */
export function useScrollProgress(): number {
  const [scrollPercent, setScrollPercent] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
      setScrollPercent(Math.min(100, Math.max(0, scrolled)));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollPercent;
}
