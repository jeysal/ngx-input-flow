import { Component } from '@angular/core';
import { persons } from './persons';

@Component({
  selector: 'ngx-input-flow-e2e-multi-model',
  template: `
        <table [(ngxInputFlow)]="persons" #input="ngxInputFlow">
          <tr *ngFor="let person of input.flow()">
            <td>
              <input type="text" name="name" [(ngModel)]="person.name" [ngxInputFlowModel]="person">
            </td>
            <td>
              <input type="checkbox" name="invited" [(ngModel)]="person.invited" [ngxInputFlowModel]="person">
            </td>
          </tr>
        </table>
    `,
})
export class E2eMultiModelComponent {
  persons = persons;
}
