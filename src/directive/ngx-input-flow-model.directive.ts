import { Directive, HostListener, Input } from '@angular/core';
import { ArrayManager } from '../service/array-manager';
import { FocusTracker } from '../service/focus-tracker';

@Directive({
  selector: '[ngxInputFlowModel]',
})
export class InputFlowModelDirective<T> {
  @Input()
  public ngxInputFlowModel?: T;

  /**
   * Specifies the delay after the last focus event before the array is checked for elements left empty.
   */
  @Input()
  public focusDebounce: number = 500;

  constructor(
    private tracker: FocusTracker<T>,
    private manager: ArrayManager<T>,
  ) {}

  /**
   * Checks the item that has lost focus previously (stored by {@link onFocusout}) for emptiness.
   * The empty check is skipped if the very same item just regained focus.
   */
  @HostListener('focusin')
  public onFocusin() {
    if (this.ngxInputFlowModel != null) {
      this.tracker.focusin$.next({
        element: this.ngxInputFlowModel,
        debounce: this.focusDebounce,
      });
    }
  }

  /**
   * Just stores the item that has lost focus without empty check.
   *
   * By delaying the empty removal, we can make sure not to remove an item that has lost focus but would immediately regain focus
   * (for example if the user tabbed from one field in an empty table row to another).
   */
  @HostListener('focusout')
  public onFocusout() {
    if (this.ngxInputFlowModel != null) {
      this.tracker.focusout$.next({
        element: this.ngxInputFlowModel,
        debounce: this.focusDebounce,
      });
    }
  }

  /**
   * Checks the flow on change & input.
   * Change is necessary because e.g. checkboxes do not fire input events.
   * Input is necessary because e.g. text inputs do not fire change events until they lose focus.
   */
  @HostListener('change')
  @HostListener('input')
  public onInput() {
    this.manager.checkTail();
  }
}
