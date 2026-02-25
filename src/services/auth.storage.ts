import type { AuthenticatedUser } from '@/types/auth.types';
import { StorageService, STORAGE_KEYS } from '@/utils/storage';

/**
 * AuthStorage - Manages authentication data persistence
 * Stores user profile and access token in localStorage
 */
export class AuthStorage {
  /**
   * Save authentication data
   */
  static async saveAuthData(user: AuthenticatedUser, token: string): Promise<void> {
    try {
      StorageService.save(STORAGE_KEYS.AUTH_USER, user);
      StorageService.save(STORAGE_KEYS.AUTH_TOKEN, token);
      console.log('[AuthStorage] Authentication data saved');
    } catch (error) {
      console.error('[AuthStorage] Failed to save auth data:', error);
      throw error;
    }
  }

  /**
   * Load authentication data
   */
  static async loadAuthData(): Promise<{
    user: AuthenticatedUser;
    token: string;
  } | null> {
    try {
      const user = StorageService.load<AuthenticatedUser>(STORAGE_KEYS.AUTH_USER);
      const token = StorageService.load<string>(STORAGE_KEYS.AUTH_TOKEN);

      if (!user || !token) {
        console.log('[AuthStorage] No auth data found');
        return null;
      }

      console.log('[AuthStorage] Authentication data loaded');
      return { user, token };
    } catch (error) {
      console.error('[AuthStorage] Failed to load auth data:', error);
      return null;
    }
  }

  /**
   * Clear authentication data
   */
  static async clearAuthData(): Promise<void> {
    try {
      StorageService.remove(STORAGE_KEYS.AUTH_USER);
      StorageService.remove(STORAGE_KEYS.AUTH_TOKEN);
      console.log('[AuthStorage] Authentication data cleared');
    } catch (error) {
      console.error('[AuthStorage] Failed to clear auth data:', error);
      throw error;
    }
  }
}
