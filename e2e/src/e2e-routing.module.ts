import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { E2eCustomEmptyComponent } from './custom-empty/e2e-custom-empty.component';
import { E2eFormComponent } from './form/e2e-form.component';
import { E2eMultiForComponent } from './simple/e2e-multi-for.component';
import { E2eMultiModelComponent } from './simple/e2e-multi-model.component';
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
    path: 'form',
    component: E2eFormComponent,
  },
  {
    path: 'custom-empty',
    component: E2eCustomEmptyComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class E2eRoutingModule {}
