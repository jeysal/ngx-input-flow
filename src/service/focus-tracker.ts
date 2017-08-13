import { Injectable } from '@angular/core';
import 'rxjs/add/operator/debounce';
import 'rxjs/add/operator/distinct';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/mergeAll';
import 'rxjs/add/operator/toArray';
import 'rxjs/add/operator/window';
import 'rxjs/add/operator/withLatestFrom';
import { Observable } from 'rxjs/Observable';
import { merge } from 'rxjs/observable/merge';
import { timer } from 'rxjs/observable/timer';
import { Subject } from 'rxjs/Subject';
import { ArrayManager } from '../service/array-manager';

/**
 * Coordinates {@link InputFlowModelDirective} focus event handling.
 */
@Injectable()
export class FocusTracker<T> {
  public focusin$: Subject<FocusEvent<T>> = new Subject();
  public focusout$: Subject<FocusEvent<T>> = new Subject();

  constructor(private manager: ArrayManager<T>) {
    const currentlyFocused$: Observable<T | null> = this.focusin$
      .map(e => e.element)
      .merge(this.focusout$.mapTo(null));

    const check$: Observable<T[]> = this.focusout$
      .map(e => e.element)
      .window(
        merge(this.focusin$, this.focusout$).debounce(e => timer(e.debounce)),
      )
      .map(win => win.distinct().toArray())
      .mergeAll()
      .withLatestFrom(currentlyFocused$, (arr: T[], curr: T) =>
        arr.filter(elem => elem !== curr),
      );

    check$.subscribe(elems => this.manager.checkItems(elems));
  }
}

export interface FocusEvent<T> {
  element: T;
  debounce: number;
}
