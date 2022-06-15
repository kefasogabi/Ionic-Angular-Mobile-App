import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddOrgservicePageRoutingModule } from './add-orgservice-routing.module';

import { AddOrgservicePage } from './add-orgservice.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddOrgservicePageRoutingModule,
    ReactiveFormsModule,
    ComponentsModule
  ],
  declarations: [AddOrgservicePage]
})
export class AddOrgservicePageModule {}
