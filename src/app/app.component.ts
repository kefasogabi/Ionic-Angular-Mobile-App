import { NetworkService } from './Services/network.service';
import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { HomeService } from './Services/home.service';
import { Plugins, Capacitor } from '@capacitor/core';
import { Coordinates } from './Models/user.model';
import { StorageService } from 'src/app/Services/storage.service';
import { interval, Subscription } from 'rxjs';
import { RiderService } from './Services/rider.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {


  constructor(
    private platform: Platform,
    private networkService:NetworkService,
    private homeService:HomeService,
    private storage: StorageService,
    private riderService:RiderService
  ) {
    
   
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      if(Capacitor.isPluginAvailable('SplashScreen')){
        Plugins.SplashScreen.hide();
      }
      this.networkService.initializeNetworkEvents();
      
     
     
    });
  }

 

 

}
