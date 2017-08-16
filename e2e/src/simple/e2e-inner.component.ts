import { Component, Input } from '@angular/core';

@Component({
  selector: 'ngx-input-flow-e2e-inner',
  template: `
          <tr [ngxInputFlowModel]="person">
            <td>
              <input type="text" name="name" [(ngModel)]="person.name">
            </td>
            <td>
              <input type="checkbox" name="invited" [(ngModel)]="person.invited">
            </td>
          </tr>
    `,
})
export class E2eInnerComponent {
  @Input() person: any;
}
