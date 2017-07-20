import {
  Directive,
  DoCheck,
  EventEmitter,
  Input,
  IterableDiffer,
  IterableDiffers,
  Output,
} from '@angular/core';
import { EmptinessConfiguration } from '../config/emptiness-configuration';
import { ElementCheckSetting } from '../model/element-check-setting';
import { FocusTracker } from '../model/focus-tracker';
import { ArrayManager } from '../service/array-manager';

@Directive({
  selector: '[ngxInputFlow]',
  providers: [ArrayManager, EmptinessConfiguration, FocusTracker],
  exportAs: 'ngxInputFlow',
})
export class InputFlowDirective<T> implements DoCheck {
  constructor(
    private manager: ArrayManager<T>,
    private config: EmptinessConfiguration,
    private differs: IterableDiffers,
  ) {}

  /**
   * The original input iterable.
   * The iterable will be processed according to the configuration and the result emitted via {@link #ngxInputFlowChange}.
   * The full flow iterable for use in an NgForOf, including a trailing empty element, is made available via {@link #flow}.
   */
  @Input()
  public set ngxInputFlow(val: Iterable<T>) {
    // handle referentially new iterable
    if (val !== this.manager.current) {
      this.manager.current = Array.from(val);
      this.ngxInputFlowChange.emit(this.manager.current);
    }

    // ensure differ is initialized
    if (!this.differ) {
      this.differ = this.differs.find(this.manager.current).create();
    }
  }

  /**
   * The modified {@link #ngxInputFlow input iterable}, condensed to have no empty elements according to the configuration.
   *
   * Usually, this output is bound with a banana in a box to automatically remove empty elements from the input iterable.
   * This two-way binding modifies the input to pass it back as an output, resulting in a changed input value again.
   * However, the condensing is idempotent in that it does not emit anything on the second invocation, hence no infinite loop results.
   *
   * The {@link EventEmitter} is asynchronous because it emits during {@link #ngOnChanges change detection}.
   */
  @Output() public ngxInputFlowChange = new EventEmitter<Iterable<T>>(true);

  /**
   * The modified input iterable, condensed to have no empty elements, then complemented with a single new empty element.
   */
  public flow(): T[] {
    return this.manager.getFlow();
  }

  /**
   * Determines which elements of the iterable are checked during change detection.
   */
  @Input()
  public checkElements: string = ElementCheckSetting[ElementCheckSetting.None];

  /**
   * Specifies a 'filter' function that determines whether an item is considered empty.
   */
  @Input()
  public set emptyWhen(val: (item: any) => boolean) {
    this.config.isEmpty = val;
  }

  /**
   * Specifies a function that supplies new flow items.
   */
  @Input()
  public set emptyItem(val: () => any) {
    this.config.createEmptyItem = val;
  }

  /**
   * Initialized when a diffable {@link Iterable} is assigned to {@link #ngxInputFlow}.
   * Before that happens, all input will be ignored.
   */
  private differ: IterableDiffer<T>;

  /**
   * Performs additional checks if enabled by {@link #checkElements}
   */
  public ngDoCheck() {
    if (this.differ) {
      let indicesToCheck: number[] = [];

      if (this.checkElements === ElementCheckSetting[ElementCheckSetting.New]) {
        const changes = this.differ.diff(this.manager.current);
        if (changes) {
          changes.forEachAddedItem(record => {
            if (record.currentIndex != null)
              indicesToCheck.push(record.currentIndex);
          });
        }
      } else if (
        this.checkElements === ElementCheckSetting[ElementCheckSetting.All]
      ) {
        this.manager.checkTail();

        indicesToCheck = this.manager.current.map((val, i) => i);
      }

      this.manager.checkIndices(indicesToCheck);
    }
  }
}
