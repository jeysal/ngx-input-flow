import { Directive, HostListener, Input } from '@angular/core';
import { FocusTracker } from '../model/focus-tracker';
import { ArrayManager } from '../service/array-manager';

@Directive({
  selector: '[ngxInputFlowModel]',
})
export class InputFlowModelDirective<T> {
  @Input('ngxInputFlowModel') public ngxInputFlowModel: T;

  constructor(
    private tracker: FocusTracker<T>,
    private manager: ArrayManager<T>,
  ) {}

  /**
   * Just stores the item that has lost focus without empty check.
   *
   * By delaying the empty removal, we can make sure not to remove an item that has lost focus but would immediately regain focus
   * (for example if the user tabbed from one field in an empty table row to another).
   */
  @HostListener('focusout')
  public onFocusout() {
    this.tracker.lastFocused = this.ngxInputFlowModel;
  }

  /**
   * Checks the item that has lost focus previously (stored by {@link onFocusout}) for emptiness.
   * The empty check is skipped if the very same item just regained focus.
   */
  @HostListener('focusin')
  public onFocusin() {
    const lastFocused = this.tracker.lastFocused;

    if (lastFocused && this.ngxInputFlowModel !== lastFocused)
      this.manager.checkItem(lastFocused);
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
