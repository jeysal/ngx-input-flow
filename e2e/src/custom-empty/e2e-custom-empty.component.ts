import { Component } from '@angular/core';

export interface Item {
  product: string;
  count: number;
}

@Component({
  selector: 'ngx-input-flow-e2e-custom-empty',
  template: `
        <div [(ngxInputFlow)]="items" [emptyItem]="emptyItem" [emptyWhen]="emptyWhen" #input="ngxInputFlow">
          <div *ngFor="let item of input.flow()"
                 [ngxInputFlowModel]="item">
            <input type="text" [(ngModel)]="item.product" name="product">
            <input type="number" [(ngModel)]="item.count" name="count">
          </div>
        </div>
    `,
})
export class E2eCustomEmptyComponent {
  items = [{ product: '123', count: 1 }];
  emptyItem = () => ({ product: '', count: 1 });
  emptyWhen = (item: Item) =>
    !item.product && (!item.count || item.count === 1); // tslint:disable-line:semicolon
}
