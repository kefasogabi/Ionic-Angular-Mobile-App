import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyservicesPageRoutingModule } from './myservices-routing.module';

import { MyservicesPage } from './myservices.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyservicesPageRoutingModule
  ],
  declarations: [MyservicesPage]
})
export class MyservicesPageModule {}
