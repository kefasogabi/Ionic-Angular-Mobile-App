import { HistoryService } from './../../Services/history.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { forkJoin } from 'rxjs';
import { BookingInfo } from 'src/app/Models/user.model';
import { HomeService } from 'src/app/Services/home.service';
import { StorageService } from 'src/app/Services/storage.service';
import { ImageModalPage } from '../image-modal/image-modal.page';

@Component({
  selector: 'app-history',
  templateUrl: 'history.page.html',
  styleUrls: ['history.page.scss']
})
export class HistoryPage implements OnInit {
  valueType = 'Received';
  clientServices:any;
  riderServices:any;
  vendorServices:any;
  orgServices:any;
  client:BookingInfo[] =[];
  vendor:BookingInfo[] =[];
  rider:BookingInfo[] =[];
  organization:BookingInfo[];
  sources:any;
  isLoading:boolean = false;
  constructor( private storage: StorageService,
               private historyService:HistoryService,
               private modalController:ModalController,
               private router: Router,) {
    this.storage.getObject('data').then((localData: any) => {
      this.clientServices = this.serviceExists(localData, ['clientService']);
      this.riderServices = this.serviceExists(localData, ['ryderService']);
      this.vendorServices = this.serviceExists(localData, ['vendorService']);
      this.orgServices = this.serviceExists(localData, ['orgService']);
     });
  }

  ngOnInit(){
      this.storage.getObject('data').then((localData: any) => {
        this.isLoading = true;
        console.log("OnInIt");
        this.sources = [
          this.historyService.client(localData.userId),
          this.historyService.vendor(localData.userId),
          this.historyService.rider(localData.userId),
          this.historyService.organization(localData.userId)
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


  ionViewWillEnter(){
    // this.doRefresh();
  }

  // reload(event) {
  //   console.log('Begin async operation');

  //   setTimeout(() => {
  //     console.log('Async operation has ended');
  //     event.target.complete();
  //   }, 2000);
  // }

  doRefresh(event) {
      this.storage.getObject('data').then((localData: any) => {
        this.sources = [
          this.historyService.client(localData.userId),
          this.historyService.vendor(localData.userId),
          this.historyService.rider(localData.userId),
          this.historyService.organization(localData.userId)
        ];

       

        forkJoin(this.sources).subscribe((data:any)=>{
          event.target.complete();
          this.client = data[0],
          this.vendor = data[1],
          this.rider = data[2],
          this.organization = data[3]

          console.log(data);
        }, (err:any) => {
          event.target.complete();
        });

      });
  }

  navigate(route: string) {
    this.router.navigate([route], { replaceUrl: true });
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
