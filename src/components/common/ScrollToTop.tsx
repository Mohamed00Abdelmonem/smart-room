import React, { useEffect, useLayoutEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

/**
 * Global ScrollToTop Component
 * 
 * Enforces automatic instant scroll reset to the top of the page (0, 0)
 * on every route change, page transition, and browser Back/Forward navigation.
 * Disables browser default history scroll restoration to guarantee all navigations
 * start at the very top.
 */
export const ScrollToTop: React.FC = () => {
  const { pathname, search, key } = useLocation();
  const navigationType = useNavigationType();

  // 1. Disable browser's automatic scroll restoration globally
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  // 2. Instantly reset scroll position to (0, 0)
  useLayoutEffect(() => {
    const resetScroll = () => {
      try {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'instant' as ScrollBehavior,
        });
      } catch {
        window.scrollTo(0, 0);
      }
      if (document.documentElement) {
        document.documentElement.scrollTop = 0;
        document.documentElement.scrollLeft = 0;
      }
      if (document.body) {
        document.body.scrollTop = 0;
        document.body.scrollLeft = 0;
      }
      const root = document.getElementById('root');
      if (root) {
        root.scrollTop = 0;
      }
    };

    // Immediate synchronous execution before paint
    resetScroll();

    // Secondary execution on next frame to catch newly mounted DOM trees
    const rafId = requestAnimationFrame(resetScroll);

    // Tertiary execution after layout pass (50ms and 120ms) to override any async image/font layout shifts
    const t1 = setTimeout(resetScroll, 50);
    const t2 = setTimeout(resetScroll, 120);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [pathname, search, key, navigationType]);

  return null;
};
