import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { merge as mergeObservables } from 'rxjs/observable/merge';
import { timer } from 'rxjs/observable/timer';
import { debounce } from 'rxjs/operators/debounce';
import { distinct } from 'rxjs/operators/distinct';
import { map } from 'rxjs/operators/map';
import { mapTo } from 'rxjs/operators/mapTo';
import { merge } from 'rxjs/operators/merge';
import { mergeMap } from 'rxjs/operators/mergeMap';
import { toArray } from 'rxjs/operators/toArray';
import { window } from 'rxjs/operators/window';
import { withLatestFrom } from 'rxjs/operators/withLatestFrom';
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
    const currentlyFocused$: Observable<T | null> = this.focusin$.pipe(
      map(e => e.element),
      merge(this.focusout$.pipe(mapTo(null))),
    );

    const check$: Observable<T[]> = this.focusout$.pipe(
      map(e => e.element),
      window(
        mergeObservables(this.focusin$, this.focusout$).pipe(
          debounce(e => timer(e.debounce)),
        ),
      ),
      mergeMap(win => win.pipe(distinct(), toArray())),
      withLatestFrom(currentlyFocused$, (arr: T[], curr: T) =>
        arr.filter(elem => elem !== curr),
      ),
    );

    check$.subscribe(elems => this.manager.checkItems(elems));
  }
}

export interface FocusEvent<T> {
  element: T;
  debounce: number;
}
