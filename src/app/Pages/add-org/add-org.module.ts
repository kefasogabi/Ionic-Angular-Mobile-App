import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddOrgPageRoutingModule } from './add-org-routing.module';

import { AddOrgPage } from './add-org.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    AddOrgPageRoutingModule,
    ComponentsModule
  ],
  declarations: [AddOrgPage]
})
export class AddOrgPageModule {}
