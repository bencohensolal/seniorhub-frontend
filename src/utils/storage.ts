/**
 * Storage utility for persisting data in localStorage
 * Provides type-safe access to stored data
 */

const STORAGE_KEYS = {
  AUTH_USER: 'seniorhub_auth_user',
  AUTH_TOKEN: 'seniorhub_auth_token',
  HOUSEHOLD_STATUS: 'seniorhub_household_status',
} as const;

export class StorageService {
  /**
   * Save data to localStorage
   */
  static save<T>(key: string, data: T): void {
    try {
      const serialized = JSON.stringify(data);
      localStorage.setItem(key, serialized);
    } catch (error) {
      console.error(`[Storage] Failed to save ${key}:`, error);
    }
  }

  /**
   * Load data from localStorage
   */
  static load<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(key);
      if (!item) return null;
      return JSON.parse(item) as T;
    } catch (error) {
      console.error(`[Storage] Failed to load ${key}:`, error);
      return null;
    }
  }

  /**
   * Remove data from localStorage
   */
  static remove(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`[Storage] Failed to remove ${key}:`, error);
    }
  }

  /**
   * Clear all app data from localStorage
   */
  static clear(): void {
    try {
      Object.values(STORAGE_KEYS).forEach((key) => {
        localStorage.removeItem(key);
      });
    } catch (error) {
      console.error('[Storage] Failed to clear storage:', error);
    }
  }
}

export { STORAGE_KEYS };
