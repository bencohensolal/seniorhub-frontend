import { StorageService, STORAGE_KEYS } from '@/utils/storage';

type HouseholdStatus = 'none' | 'completed';

/**
 * HouseholdStorage - Manages household setup status persistence
 */
export class HouseholdStorage {
  /**
   * Mark household setup as completed
   */
  static async markHouseholdCompleted(): Promise<void> {
    try {
      StorageService.save<HouseholdStatus>(STORAGE_KEYS.HOUSEHOLD_STATUS, 'completed');
      console.log('[HouseholdStorage] Household marked as completed');
    } catch (error) {
      console.error('[HouseholdStorage] Failed to save household status:', error);
      throw error;
    }
  }

  /**
   * Load household setup status
   */
  static async loadHouseholdStatus(): Promise<HouseholdStatus> {
    try {
      const status = StorageService.load<HouseholdStatus>(STORAGE_KEYS.HOUSEHOLD_STATUS);
      return status || 'none';
    } catch (error) {
      console.error('[HouseholdStorage] Failed to load household status:', error);
      return 'none';
    }
  }

  /**
   * Clear household status
   */
  static async clearHouseholdStatus(): Promise<void> {
    try {
      StorageService.remove(STORAGE_KEYS.HOUSEHOLD_STATUS);
      console.log('[HouseholdStorage] Household status cleared');
    } catch (error) {
      console.error('[HouseholdStorage] Failed to clear household status:', error);
      throw error;
    }
  }
}
