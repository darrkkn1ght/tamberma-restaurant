import { useState, useEffect, useCallback } from 'react';

/**
 * useLocalStorage - React hook for localStorage with SSR safety and reactivity
 * @template T
 * @param {string} key - The localStorage key
 * @param {T} initialValue - Default value if not present
 * @returns {[T, (v: T | ((prev: T) => T)) => void, () => void]}
 *
 * Usage:
 *   const [value, setValue, remove] = useLocalStorage('theme', 'light');
 */
function useLocalStorage(key, initialValue) {
  // SSR safety: check if window exists
  const isClient = typeof window !== 'undefined';

  const readValue = useCallback(() => {
    if (!isClient) return initialValue;
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (err) {
      return initialValue;
    }
  }, [isClient, key, initialValue]);

  const [storedValue, setStoredValue] = useState(readValue);

  // Update state if key/initialValue changes
  useEffect(() => {
    setStoredValue(readValue());
    // eslint-disable-next-line
  }, [key]);

  // Listen to storage events (cross-tab sync)
  useEffect(() => {
    if (!isClient) return;
    const handleStorage = (event) => {
      if (event.key === key) {
        setStoredValue(readValue());
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [key, readValue, isClient]);

  // Set value
  const setValue = useCallback(
    (value) => {
      if (!isClient) return;
      try {
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (err) {
        // Ignore write errors
      }
    },
    [key, storedValue, isClient]
  );

  // Remove value
  const remove = useCallback(() => {
    if (!isClient) return;
    try {
      window.localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (err) {
      // Ignore remove errors
    }
  }, [key, initialValue, isClient]);

  return [storedValue, setValue, remove];
}

export default useLocalStorage;
