import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecoverpinPageRoutingModule } from './recoverpin-routing.module';

import { RecoverpinPage } from './recoverpin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecoverpinPageRoutingModule
  ],
  declarations: [RecoverpinPage]
})
export class RecoverpinPageModule {}
