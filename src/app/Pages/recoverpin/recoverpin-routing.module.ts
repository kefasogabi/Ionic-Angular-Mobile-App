import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecoverpinPage } from './recoverpin.page';

const routes: Routes = [
  {
    path: '',
    component: RecoverpinPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecoverpinPageRoutingModule {}
