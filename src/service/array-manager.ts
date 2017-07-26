import { Injectable } from '@angular/core';
import { EmptinessConfiguration } from '../config/emptiness-configuration';

@Injectable()
export class ArrayManager<T> {
  constructor(private config: EmptinessConfiguration) {}

  /**
   * The current array without an additional flow item.
   */
  public current: T[] = [];

  /**
   * The item appended for flow input.
   * Not part of the current array itself.
   */
  private currentFlowItem: any = this.config.createEmptyItem();

  public resetFlowItem(): void {
    this.currentFlowItem = this.config.createEmptyItem();
  }

  /**
   * Creates the full array with the flow item appended.
   */
  public getFlow(): T[] {
    return this.current.concat(this.currentFlowItem);
  }

  public checkIndices(indices: number[]): boolean {
    let emptyRemoval = false;

    // iterate from highest to lowest
    for (const i of indices.sort((a, b) => b - a)) {
      if (this.config.isEmpty(this.current[i])) {
        this.current.splice(i, 1);
        emptyRemoval = true;
      }
    }

    return emptyRemoval;
  }

  public checkItem(item: T): boolean {
    let emptyRemoval = false;

    if (this.config.isEmpty(item)) {
      // iterate backwards
      let i = this.current.length;
      while (i--) {
        if (this.current[i] === item) {
          this.current.splice(i, 1);
          emptyRemoval = true;
        }
      }
    }

    return emptyRemoval;
  }

  public checkTail(): boolean {
    return this.checkFlow() || this.checkLast();
  }

  private checkFlow(): boolean {
    // push new flow item if necessary
    if (!this.config.isEmpty(this.currentFlowItem)) {
      this.current.push(this.currentFlowItem);
      this.resetFlowItem();
      return true;
    }
    return false;
  }

  private checkLast(): boolean {
    // move last item to flow if necessary
    if (
      this.current.length &&
      this.config.isEmpty(this.current[this.current.length - 1])
    ) {
      this.currentFlowItem = this.current.pop();
      return true;
    }
    return false;
  }
}
