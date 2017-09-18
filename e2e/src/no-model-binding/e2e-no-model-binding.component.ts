import { Component } from '@angular/core';
import { persons } from '../data/persons';

@Component({
  selector: 'ngx-input-flow-e2e-no-model-binding',
  template: `
        <table [(ngxInputFlow)]="persons" #input="ngxInputFlow" [ngxInputFlowModel]>
          <tr *ngFor="let person of input.flow()">
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
export class E2eNoModelBindingComponent {
  persons = persons;
}
