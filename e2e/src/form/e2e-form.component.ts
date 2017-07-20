import { Component } from '@angular/core';

@Component({
  selector: 'ngx-input-flow-e2e-form',
  template: `
        <form novalidate>
          <div [(ngxInputFlow)]="customers" #input="ngxInputFlow">
            <input type="text"
                   *ngFor="let customer of input.flow()"
                   [ngxInputFlowModel]="customer"
                   [(ngModel)]="customer.id"
                   [ngModelOptions]="{ standalone: true }">
          </div>
        <form>
        <div id="customers">
          {{ customers | json }}
        </div>
    `,
})
export class E2eFormComponent {
  customers = [];
}
