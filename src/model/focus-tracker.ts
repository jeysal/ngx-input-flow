import { Injectable } from '@angular/core';

/**
 * Memorizes the last element that has lost focus.
 */
@Injectable()
export class FocusTracker<T> {
  public lastFocused?: T;
}
