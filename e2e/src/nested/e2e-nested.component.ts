import { Component } from '@angular/core';

@Component({
  selector: 'ngx-input-flow-e2e-nested',
  template: `
        <div [(ngxInputFlow)]="persons"
             [emptyWhen]="isPersonEmpty"
             [emptyItem]="emptyPerson"
             #personFlow="ngxInputFlow">
          <div class="person" *ngFor="let person of personFlow.flow()" [ngxInputFlowModel]="person">
            <label class="name">Name <input type="text" [(ngModel)]="person.name"></label>
            <br>
            <label class="email"
                   [(ngxInputFlow)]="person.emailAddrs"
                   #emailFlow="ngxInputFlow">Email addresses
              <input type="email"
                     *ngFor="let emailAddr of emailFlow.flow()"
                     [ngxInputFlowModel]="emailAddr"
                     [(ngModel)]="emailAddr.addr">
            </label>
          </div>
        </div>
    `,
})
export class E2eNestedComponent {
  persons: Person[] = [];

  isPersonEmpty(person: Person): boolean {
    return !person.name && !person.emailAddrs.length;
  }

  emptyPerson(): Person {
    return { name: '', emailAddrs: [] };
  }
}

export interface Person {
  name: string;
  emailAddrs: { addr: string }[];
}
