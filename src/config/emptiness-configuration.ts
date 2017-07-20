import { Injectable } from '@angular/core';

@Injectable()
export class EmptinessConfiguration {
  public isEmpty: (item: any) => boolean = item =>
    Object.values(item).every(val => !val); // tslint:disable-line:semicolon

  public createEmptyItem: () => any = () => ({});
}
