/**
 * Defines which elements should be checked for emptiness during change detection.
 */
export enum ElementCheckSetting {
  /**
   * Do not check any items.
   */
  None,
  /**
   * Check only items that have been added.
   */
  New,
  /**
   * Always check every item.
   */
  All,
}
