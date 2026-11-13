'use client';

import { useSyncExternalStore } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

/** True when the visitor asked the OS for less motion. False during SSR. */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(
    (callback) => {
      const query = window.matchMedia(QUERY);
      query.addEventListener('change', callback);
      return () => query.removeEventListener('change', callback);
    },
    () => window.matchMedia(QUERY).matches,
    () => false,
  );
}
