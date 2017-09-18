import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { E2eCheckAllElementsComponent } from './check-elements/e2e-check-all-elements.component';
import { E2eCheckNewElementsComponent } from './check-elements/e2e-check-new-elements.component';
import { E2eCheckNoElementsComponent } from './check-elements/e2e-check-no-elements.component';
import { E2eCustomEmptyComponent } from './custom-empty/e2e-custom-empty.component';
import { E2eFormComponent } from './form/e2e-form.component';
import { E2eNestedComponent } from './nested/e2e-nested.component';
import { E2eNoModelBindingComponent } from './no-model-binding/e2e-no-model-binding.component';
import { E2eOtherInputsComponent } from './other-inputs/e2e-other-inputs.component';
import { E2eReplacementComponent } from './replacement/e2e-replacement.component';
import { E2eMultiForComponent } from './simple/e2e-multi-for.component';
import { E2eMultiModelComponent } from './simple/e2e-multi-model.component';
import { E2eOuterComponent } from './simple/e2e-outer.component';
import { E2eSetComponent } from './simple/e2e-set.component';
import { E2eSimpleComponent } from './simple/e2e-simple.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/simple',
    pathMatch: 'full',
  },
  {
    path: 'simple',
    component: E2eSimpleComponent,
  },
  {
    path: 'multi-model',
    component: E2eMultiModelComponent,
  },
  {
    path: 'multi-for',
    component: E2eMultiForComponent,
  },
  {
    path: 'set',
    component: E2eSetComponent,
  },
  {
    path: 'form',
    component: E2eFormComponent,
  },
  {
    path: 'custom-empty',
    component: E2eCustomEmptyComponent,
  },
  {
    path: 'check-no-elements',
    component: E2eCheckNoElementsComponent,
  },
  {
    path: 'check-new-elements',
    component: E2eCheckNewElementsComponent,
  },
  {
    path: 'check-all-elements',
    component: E2eCheckAllElementsComponent,
  },
  {
    path: 'replacement',
    component: E2eReplacementComponent,
  },
  {
    path: 'other-inputs',
    component: E2eOtherInputsComponent,
  },
  {
    path: 'nested',
    component: E2eNestedComponent,
  },
  {
    path: 'outer',
    component: E2eOuterComponent,
  },
  {
    path: 'no-model-binding',
    component: E2eNoModelBindingComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class E2eRoutingModule {}
