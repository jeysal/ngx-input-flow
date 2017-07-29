import { Component } from '@angular/core';
import { persons } from '../data/persons';

@Component({
  selector: 'ngx-input-flow-e2e-multi-for',
  template: `
        <table [(ngxInputFlow)]="persons" #input="ngxInputFlow">
          <tr>
            <td *ngFor="let person of input.flow()" [ngxInputFlowModel]="person">
              <input type="text" name="name" [(ngModel)]="person.name">
            </td>
          </tr>
          <tr>
            <td *ngFor="let person of input.flow()" [ngxInputFlowModel]="person">
              <input type="checkbox" name="invited" [(ngModel)]="person.invited">
            </td>
          </tr>
        </table>
    `,
})
export class E2eMultiForComponent {
  persons = persons;
}
