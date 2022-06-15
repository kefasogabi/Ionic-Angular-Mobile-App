import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyservicesPage } from './myservices.page';

const routes: Routes = [
  {
    path: '',
    component: MyservicesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyservicesPageRoutingModule {}
