import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddOrgservicePage } from './add-orgservice.page';

const routes: Routes = [
  {
    path: '',
    component: AddOrgservicePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddOrgservicePageRoutingModule {}
