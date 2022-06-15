import { ComponentsModule } from 'src/app/components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerifyUserPageRoutingModule } from './verify-user-routing.module';

import { VerifyUserPage } from './verify-user.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    VerifyUserPageRoutingModule,
    ComponentsModule
  ],
  declarations: [VerifyUserPage]
})
export class VerifyUserPageModule {}
