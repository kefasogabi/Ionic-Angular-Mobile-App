import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddOrgPage } from './add-org.page';

const routes: Routes = [
  {
    path: '',
    component: AddOrgPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddOrgPageRoutingModule {}
