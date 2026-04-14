// Type-safe localStorage helpers with SSR-safety


export function getStorageItem(key, defaultValue = null) {
  try {
    const raw = window.localStorage.getItem(key);
    if (raw === null) return defaultValue;
    return JSON.parse(raw);
  } catch {
    return defaultValue;
  }
}

/**
 * Stringify and write a value to localStorage.
 * Silently fails (e.g., in private browsing / quota exceeded).
 */
export function setStorageItem(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // no-op — storage not available
  }
}

/**
 * Remove a key from localStorage.
 */
export function removeStorageItem(key) {
  try {
    window.localStorage.removeItem(key);
  } catch {
    // no-op
  }
}
