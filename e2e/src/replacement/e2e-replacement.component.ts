import { Component } from '@angular/core';
import { persons } from '../data/persons';

@Component({
  selector: 'ngx-input-flow-e2e-replacement',
  template: `
        <table [(ngxInputFlow)]="persons" #input="ngxInputFlow">
          <tr *ngFor="let person of input.flow()" [ngxInputFlowModel]="person">
            <td>
              <input type="text" name="name" [(ngModel)]="person.name" (click)="replacePreservingFirst()">
            </td>
            <td>
              <input type="checkbox" name="invited" [(ngModel)]="person.invited">
            </td>
          </tr>
        </table>
    `,
})
export class E2eReplacementComponent {
  persons = persons;

  replacePreservingFirst() {
    this.persons = [
      { name: 'new1', invited: true },
      this.persons[0],
      { name: 'new2', invited: false },
    ];
  }
}
