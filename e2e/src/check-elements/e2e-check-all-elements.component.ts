import { Component } from '@angular/core';
import { E2eCheckElementsComponentBase } from './e2e-check-elements-component-base';

@Component({
  selector: 'ngx-input-flow-e2e-check-all-elements',
  template: `
        <table [(ngxInputFlow)]="persons" checkElements="All" #input="ngxInputFlow">
          <tr *ngFor="let person of input.flow()" [ngxInputFlowModel]="person">
            <td>
              <input type="text" name="name" [(ngModel)]="person.name">
            </td>
            <td>
              <input type="checkbox" name="invited" [(ngModel)]="person.invited">
            </td>
          </tr>
        </table>
        <button id="empty-first" (click)="emptyFirst()">Empty first element</button>
        <button id="replace-first-empty" (click)="replaceFirstEmpty()">Replace first with empty element</button>
        <button id="prepend-empty" (click)="prependEmpty()">Prepend empty element</button>
    `,
})
export class E2eCheckAllElementsComponent extends E2eCheckElementsComponentBase {}
