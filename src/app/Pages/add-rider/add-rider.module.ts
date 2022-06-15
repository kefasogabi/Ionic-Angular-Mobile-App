import { ComponentsModule } from './../../components/components.module';
  import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddRiderPageRoutingModule } from './add-rider-routing.module';

import { AddRiderPage } from './add-rider.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    AddRiderPageRoutingModule,
    ComponentsModule
  ],
  declarations: [AddRiderPage]
})
export class AddRiderPageModule {}
