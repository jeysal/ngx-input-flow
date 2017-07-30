import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputFlowModule } from '../../src/module';
import { E2eCheckAllElementsComponent } from './check-elements/e2e-check-all-elements.component';
import { E2eCheckNewElementsComponent } from './check-elements/e2e-check-new-elements.component';
import { E2eCheckNoElementsComponent } from './check-elements/e2e-check-no-elements.component';
import { E2eCustomEmptyComponent } from './custom-empty/e2e-custom-empty.component';
import { E2eRootComponent } from './e2e-root.component';
import { E2eRoutingModule } from './e2e-routing.module';
import { E2eFormComponent } from './form/e2e-form.component';
import { E2eReplacementComponent } from './replacement/e2e-replacement.component';
import { E2eMultiForComponent } from './simple/e2e-multi-for.component';
import { E2eMultiModelComponent } from './simple/e2e-multi-model.component';
import { E2eSimpleComponent } from './simple/e2e-simple.component';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    E2eRoutingModule,
    InputFlowModule,
  ],
  declarations: [
    E2eRootComponent,
    E2eFormComponent,
    E2eMultiForComponent,
    E2eMultiModelComponent,
    E2eSimpleComponent,
    E2eCustomEmptyComponent,
    E2eCheckAllElementsComponent,
    E2eCheckNewElementsComponent,
    E2eCheckNoElementsComponent,
    E2eReplacementComponent,
  ],
  providers: [],
  bootstrap: [E2eRootComponent],
})
export class E2eModule {}
