import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddRiderPage } from './add-rider.page';

const routes: Routes = [
  {
    path: '',
    component: AddRiderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddRiderPageRoutingModule {}
