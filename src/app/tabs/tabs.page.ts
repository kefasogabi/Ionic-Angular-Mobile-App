import { AlertController } from '@ionic/angular';
import { AuthService } from './../Auth/auth.service';
import { Component } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(public nvctrl: NavController, public navparams: NavParams) {}



}
