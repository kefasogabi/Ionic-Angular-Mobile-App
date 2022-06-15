import { Component, OnInit, ViewChild } from '@angular/core';
import { IonNav, MenuController, NavParams } from '@ionic/angular';
import { pageInterface } from 'src/app/Pages/sidebar/sidebar.page';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  show: string;
  bool: boolean;
  check: any;
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Home',
      url: '/tabs/home',
      icon: 'Home'
    },
    {
      title: 'Profile',
      url: '/tabs/profile',
      icon: 'paper-plane'
    },
    {
      title: 'Myservices',
      url: '/tabs/myservices',
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

  head = window.location.pathname;
  index = this.head.substr(1).indexOf("/");

  constructor(public nvctrl: MenuController, public navparams: NavParams) {
   // console.log(this.appPages.keys);
    this.bool = this.head.substr(1).includes("/");

    
    this.check = this.head.substr(1).substr(this.index) ;
   // console.log("qwas" + this.check.replace("/", ""));


    this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === this.check.replace("/", "").toLowerCase());

    if (this.bool == true)
      this.show = ""
    else
      this.show = "hidden"
    
   }

  ngOnInit() {

  }


  openPage(page: pageInterface){

  }

  isActive(page: pageInterface){

  }
  openMenu(){
  
    this.nvctrl.getMenus;
  //   debugger;
  //  if (this.nvctrl.isOpen)
  //   this.nvctrl.close
  // else
  //   this.nvctrl.open  
  }
}