import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddClientservicePage } from './add-clientservice.page';

const routes: Routes = [
  {
    path: '',
    component: AddClientservicePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddClientservicePageRoutingModule {}
