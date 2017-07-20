import { NgModule } from '@angular/core';
import { InputFlowModelDirective } from './directive/ngx-input-flow-model.directive';
import { InputFlowDirective } from './directive/ngx-input-flow.directive';

const content: any[] = [InputFlowDirective, InputFlowModelDirective];

@NgModule({
  declarations: content,
  exports: content,
})
export class InputFlowModule {}
