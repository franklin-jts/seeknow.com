import { useEffect } from 'react';

/**
 * Runs a section's DOM-behaviour initialiser once, after the section's markup
 * has been committed. (StrictMode is intentionally not used in main.jsx, so the
 * initialiser is never double-invoked in development.)
 */
export default function useInit(init) {
  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
