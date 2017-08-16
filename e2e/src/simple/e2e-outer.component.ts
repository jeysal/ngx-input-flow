import { Component } from '@angular/core';
import { persons } from '../data/persons';

@Component({
  selector: 'ngx-input-flow-e2e-outer',
  template: `
        <table [(ngxInputFlow)]="persons" #input="ngxInputFlow">
          <ngx-input-flow-e2e-inner *ngFor="let person of input.flow()" [person]="person">
          </ngx-input-flow-e2e-inner>
        </table>
    `,
})
export class E2eOuterComponent {
  persons = persons;
}
