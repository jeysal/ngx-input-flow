import { Component } from '@angular/core';
import { emptyPerson, persons } from '../data/persons';

@Component({
  selector: 'ngx-input-flow-e2e-check-new-elements',
  template: `
        <table [(ngxInputFlow)]="persons" checkElements="New" [trackBy]="trackBy" [emptyWhen]="isEmpty" #input="ngxInputFlow">
          <tr *ngFor="let person of input.flow(); trackBy: trackBy" [ngxInputFlowModel]="person">
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
        <button id="replace-first-empty-retaining-id" (click)="replaceFirstEmptyRetainingId()">
          Replace first with empty element retaining id
        </button>
        <button id="prepend-empty" (click)="prependEmpty()">Prepend empty element</button>
    `,
})
export class E2eCheckNewElementsComponent {
  persons = persons.map((person, i) => ({ ...person, id: i }));

  emptyFirst() {
    this.persons[0].name = emptyPerson.name;
    this.persons[0].invited = emptyPerson.invited;
  }

  replaceFirstEmpty() {
    this.persons[0] = { ...emptyPerson, id: 42 };
  }

  replaceFirstEmptyRetainingId() {
    this.persons[0] = { ...emptyPerson, id: this.persons[0].id };
  }

  prependEmpty() {
    this.persons.unshift({ ...emptyPerson, id: 1337 });
  }

  trackBy(id: number, person: any) {
    return person.id;
  }

  isEmpty(person: any) {
    return !person.name && !person.invited;
  }
}
