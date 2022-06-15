import { forkJoin } from 'rxjs';
import { HomeService } from './../../Services/home.service';
import { ImageModalPage } from './../image-modal/image-modal.page';
import { LoadingController, ModalController, Platform } from '@ionic/angular';
import { ClientService } from 'src/app/Services/client.service';
import { LocalData, BookingInfo, Coordinates } from './../../Models/user.model';
import { StorageService } from 'src/app/Services/storage.service';
import { AuthService } from './../../Auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Services/user.Service';
import { Plugins } from '@capacitor/core';
import { interval, Subscription } from 'rxjs';
import { RiderService } from 'src/app/Services/rider.service';

const { Browser } = Plugins;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit{

  today = new Date();
  user:any = {};
  sources:any;
  subscription: Subscription;
  number:any;
  sysConfig:any;
  center:Coordinates;
  client:BookingInfo[] =[];
  vendor:BookingInfo[] =[];
  rider:BookingInfo[] =[];
  organization:BookingInfo[] = [];
  clientServices:any;
  riderServices:any;
  vendorServices:any;
  orgServices:any;
  public isMenuOpen : boolean = false;
  isLoading:boolean = false;


  constructor(private router: Router, 
              private userService: UserService, 
              private authService:AuthService,
              private storage: StorageService,
              private clientService: ClientService,
              private modalController:ModalController,
              private homeService:HomeService,
              private loadingCtrl: LoadingController,
              private platform: Platform,
              private riderService:RiderService,
              ) {

                this.initializeApp();
                this.authService.checkAuth();
                this.platform.backButton.subscribeWithPriority(9999, () => {
                  document.addEventListener('ionBackButton', function (event) {
                    event.preventDefault();
                    event.stopPropagation();
                  }, false);
                });
            
                Browser.prefetch({
                  urls:['https://getbootstrap.com']
                })

                this.storage.getObject('data').then((localData: any) => {
                 this.clientServices = this.serviceExists(localData, ['clientService']);
                 this.riderServices = this.serviceExists(localData, ['ryderService']);
                 this.vendorServices = this.serviceExists(localData, ['vendorService']);
                 this.orgServices = this.serviceExists(localData, ['orgService']);
                });

              }

 
  ngOnInit(){

      
  }

  initializeApp(){
    this.platform.ready().then(() => {
      this.storage.getObject('data').then((user: any) => {
        this.riderServices = this.serviceExists(user, ['ryderService']);
        if(this.riderServices == true){
          this.homeService.getSysConfig(user.countryId).subscribe((data:any)=>{
            this.number =  data[0]['riderReportingInterval'] * 1000;
            const source = interval(this.number);
            this.subscription = source.subscribe(val => this.getPosition());
          });
        }
      });
     
    });
  }

  getPosition(){
    Plugins.Geolocation.getCurrentPosition()
    .then(geoPosition => {
      this.storage.getObject('data').then((user: any) => {
        const coordinates: any = {
          gpsLatitude: geoPosition.coords.latitude,
          gpsLongitude: geoPosition.coords.longitude,
          userId:user.userId
        };
        this.reportPosition(coordinates);
      });
     
    })
    .catch(err => {
    });
  }

  reportPosition(data:any){
    this.riderService.reportPosition(data).subscribe((data:any)=>{
      console.log("SUCCESS");
    },(err:any) => {
      console.log("FAIL");
    })
  }


  ionViewWillEnter(){
    this.doRefresh();
  }

  async openPage(){
    await Browser.open({ toolbarColor:"#3a327f", url: 'https://getbootstrap.com' });
 }

  /*
    slider with more narrow cards, 2 fully visible slides
  */
  slideOptsThumbs = {
    spaceBetween: 0,
    slidesPerView: 3,
  };

  doRefresh() {
      this.isLoading = true;
        this.storage.getObject('data').then((localData: any) => {
          this.user = localData;
          this.sources = [
            this.homeService.client(localData.userId),
            this.homeService.vendor(localData.userId),
            this.homeService.rider(localData.userId),
            this.homeService.organization(localData.userId)
          ];

         

          forkJoin(this.sources).subscribe((data:any)=>{
            this.isLoading = false;
            this.client = data[0],
            this.vendor = data[1],
            this.rider = data[2],
            this.organization = data[3]

            console.log(data);
          }, (err:any) => {
            this.isLoading = false;
          });

        });
  }
  

  public toggleAccordion(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  public Delivered(event: any) : void
  {
     console.log(`Capture event value: ${event}`);
  }

  showImage(img){
    this.modalController.create({
      component:ImageModalPage,
      componentProps:{
        img:img
      }
    }).then(model => model.present());
  }

  
  navigate(route: string) {
    this.router.navigate([route]);
  }

  serviceExists(data:any,services:any[]){
    let obj = {};
    for (let x of services) {
        if(x in data){
            obj[x] = data[x];
        }
    }
    for (let i in obj) {
      if (obj[i] === true) return true;
    }
    return false;
  }

  book(){
    this.router.navigate(['/tabs/booking'], { replaceUrl: true });
  }

  estimate(){
    this.router.navigate(['/tabs/estimate'], { replaceUrl: true });
  }

  tracking(){
    this.router.navigate(['/tabs/tracking'], { replaceUrl: true });
  }

  help(){
    this.router.navigate(['/tabs/help'], {replaceUrl: true })
  }

  addService(){
    this.router.navigate(['/tabs/addmore-service'], { replaceUrl: true });
  }

  

  goToNotifications(){
    this.router.navigate(['/tabs/notification'], { replaceUrl: true });
  }


}
