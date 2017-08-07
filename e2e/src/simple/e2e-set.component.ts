import { Component } from '@angular/core';
import { persons } from '../data/persons';

@Component({
  selector: 'ngx-input-flow-e2e-set',
  template: `
        <table [(ngxInputFlow)]="persons" #input="ngxInputFlow">
          <tr *ngFor="let person of input.flow()" [ngxInputFlowModel]="person">
            <td>
              <input type="text" name="name" [(ngModel)]="person.name">
            </td>
            <td>
              <input type="checkbox" name="invited" [(ngModel)]="person.invited">
            </td>
          </tr>
        </table>
    `,
})
export class E2eSetComponent {
  persons: Iterable<object> = new Set(persons);
}
