import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuController, IonNav, NavParams } from '@ionic/angular';

export interface pageInterface{
  title: string;
  pageName: string;
  tabComponent?: any;
  index?: number;
  icon: string
}



@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.page.html',
  styleUrls: ['./sidebar.page.scss'],
})

export class SidebarPage implements OnInit {

  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'Home'
    },
    {
      title: 'Outbox',
      url: '/profile',
      icon: 'paper-plane'
    },
    {
      title: 'Favorites',
      url: '/myservices',
      icon: 'heart'
    }
  ];

  rootPage = "TabsPage";


  @ViewChild(IonNav) nav: IonNav;
 
  pages: pageInterface[] = [
    { title: 'Home', pageName: 'TabsPage', tabComponent: 'HomePage', index: 0, icon: 'home' },
    { title: 'Services', pageName: 'TabsPage', tabComponent: 'ServicesPage', index: 2, icon: 'rocket' },
    { title: 'Profile', pageName: 'TabsPage', tabComponent: 'ProfilePage', index: 3, icon: 'person-circle' },
    { title: 'LogOut', pageName: 'TabsPage', icon: 'power' },
  ];


  constructor(public nvctrl: MenuController, public navparams: NavParams) { }

  ngOnInit() {
  }

  openPage(page: pageInterface){

  }

  isActive(page: pageInterface){

  }
}
