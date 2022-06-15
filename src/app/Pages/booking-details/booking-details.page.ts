import { RidesService } from './../../Services/rides.service';
import { BookingInfo } from './../../Models/user.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, ModalController } from '@ionic/angular';
import { StorageService } from 'src/app/Services/storage.service';
import { AuthService } from 'src/app/Auth/auth.service';
import { TrackingModalComponent } from 'src/app/components/tracking-modal/tracking-modal.component';

@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.page.html',
  styleUrls: ['./booking-details.page.scss'],
})
export class BookingDetailsPage implements OnInit {
  booking:any = {};
  clientServices:any;
  riderServices:any;
  vendorServices:any;
  orgServices:any;
  rating:any;
  isLoading:boolean = false;
  vendorId:any;
  constructor( private activatedRoute:ActivatedRoute,  
              private router:Router,
              public authService: AuthService,
              private modalCtrl: ModalController, 
              private storage: StorageService,
              private loadingCtrl: LoadingController,
              private ridesService:RidesService,) { 
                this.storage.getObject('data').then((localData: any) => {
                  this.clientServices = this.serviceExists(localData, ['clientService']);
                  this.riderServices = this.serviceExists(localData, ['ryderService']);
                  this.vendorServices = this.serviceExists(localData, ['vendorService']);
                  this.orgServices = this.serviceExists(localData, ['orgService']);
                  this.vendorId = localData.userId;
                 });
              }

  ngOnInit() {
   
    
  }

  ionViewWillEnter(){
    this.isLoading = true;
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if(!paramMap.has('rideId')){
        //redirect
        this.router.navigate(['/tabs/home'], { replaceUrl: true });
        return
      }
      const rideId = paramMap.get('rideId');
      this.ridesService.getRide(rideId).subscribe((data:any)=>{
        this.isLoading = false;
        this.booking = data;
       }, (err:any) => {
        this.isLoading = false;
      });
    
    });
  }

  rateRider(rate){
    console.log(rate);
  }
  rateClient(rate){
    console.log(rate);
  }

  acceptRide(){
    const rideId = this.activatedRoute.snapshot.paramMap.get('rideId');
    this.loadingCtrl.create({ keyboardClose: true, message: 'Please Wait...' })
    .then(loadingEl => {
      loadingEl.present();
      this.ridesService.acceptRide(rideId).subscribe((data:any)=>{
        loadingEl.dismiss();
        this.booking = data;
       }, (err:any) => {
        loadingEl.dismiss();
      });
    
    });
  }

  activatePickup(){
    const rideId = this.activatedRoute.snapshot.paramMap.get('rideId');
    this.loadingCtrl.create({ keyboardClose: true, message: 'Please Wait...' })
    .then(loadingEl => {
      loadingEl.present();
      this.ridesService.activatePickUp(rideId).subscribe((data:any)=>{
        loadingEl.dismiss();
        this.booking = data;
       }, (err:any) => {
        loadingEl.dismiss();
      });
    
    });
  }

  activateDropoff(){
    const rideId = this.activatedRoute.snapshot.paramMap.get('rideId');
    this.loadingCtrl.create({ keyboardClose: true, message: 'Please Wait...' })
    .then(loadingEl => {
      loadingEl.present();
      this.ridesService.activateDropoff(rideId).subscribe((data:any)=>{
        loadingEl.dismiss();
        this.booking = data;
       }, (err:any) => {
        loadingEl.dismiss();
      });
    
    });
  }

  activateCompletion(){
    const rideId = this.activatedRoute.snapshot.paramMap.get('rideId');
    this.loadingCtrl.create({ keyboardClose: true, message: 'Please Wait...' })
    .then(loadingEl => {
      loadingEl.present();
      this.ridesService.activateCompletion(rideId).subscribe((data:any)=>{
        loadingEl.dismiss();
        this.booking = data;
       }, (err:any) => {
        loadingEl.dismiss();
      });
    
    });
  }

  cancelRide(){
    const rideId = this.activatedRoute.snapshot.paramMap.get('rideId');
    this.loadingCtrl.create({ keyboardClose: true, message: 'Please Wait...' })
    .then(loadingEl => {
      loadingEl.present();
      this.ridesService.cancelRide(rideId).subscribe((data:any)=>{
        loadingEl.dismiss();
        this.booking = data;
       }, (err:any) => {
        loadingEl.dismiss();
      });
    
    });
  }

  track(rideId){
    this.modalCtrl.create({ component: TrackingModalComponent, componentProps: { 
      rideId: rideId
    } }).then(modalEl => { modalEl.present(); });
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

}
