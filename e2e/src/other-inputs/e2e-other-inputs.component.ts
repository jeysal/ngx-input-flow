import { Component } from '@angular/core';

@Component({
  selector: 'ngx-input-flow-e2e-other-inputs',
  template: `
        <table [(ngxInputFlow)]="items" #input="ngxInputFlow">
          <tr *ngFor="let item of input.flow(); let i = index" [ngxInputFlowModel]="item">
            <td>
              <select [(ngModel)]="item.x">
                <option class="n" value="">Nothing</option>
                <option class="a" value="a">A</option>
                <option class="b" value="b">B</option>
              </select>
            </td>
            <td>
              <input type="radio" [(ngModel)]="item.y" class="n" [name]="'radio' + i" value=""> Nothing
              <input type="radio" [(ngModel)]="item.y" class="a" [name]="'radio' + i" value="a"> A
              <input type="radio" [(ngModel)]="item.y" class="b" [name]="'radio' + i" value="b"> B
            </td>
          </tr>
        </table>
        <div id="items">
          {{ items | json }}
        </div>
    `,
})
export class E2eOtherInputsComponent {
  items = [];
}
