import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EstimatePageRoutingModule } from './estimate-routing.module';

import { EstimatePage } from './estimate.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EstimatePageRoutingModule,
    ReactiveFormsModule,
    ComponentsModule
  ],
  declarations: [EstimatePage]
})
export class EstimatePageModule {}
