import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { EstimateDetail, PlaceLocation } from 'src/app/Models/user.model';
import { RidesService } from 'src/app/Services/rides.service';
import { StorageService } from 'src/app/Services/storage.service';

@Component({
  selector: 'app-estimate',
  templateUrl: './estimate.page.html',
  styleUrls: ['./estimate.page.scss'],
})
export class EstimatePage implements OnInit {

  estimates:EstimateDetail[] = [];
  estimateForm:FormGroup;
  constructor(private formBuilder: FormBuilder,
              private storage: StorageService,
              private loadingCtrl: LoadingController,
              private ridesService: RidesService,
              private alert: AlertController, ) { 
    this.estimateForm = this.formBuilder.group({
      pickupLongitude: new FormControl(''),
      pickupLatitude: new FormControl(''),
      pickupImage: new FormControl(''),
      pickupAddress: new FormControl(''),
      dropoffLongitude: new FormControl(''),
      dropoffLatitude: new FormControl(''),
      dropoffImage: new FormControl(''),
      dropoffAddress: new FormControl(''),
      countryId: new FormControl('')
    });

    this.storage.getObject('data').then((data: any) => {
      this.estimateForm.get('countryId').setValue(data.countryId);
    });
  }

  ngOnInit() {
  }

  estimate(){
    this.loadingCtrl.create({ keyboardClose: true, message: 'Please Wait...' })
    .then(loadingEl => {
      loadingEl.present();
      this.ridesService.getPrice(this.estimateForm.value).subscribe((data:any) => {
        loadingEl.dismiss();
        this.estimates = data;
      }, (err:any) => {
        loadingEl.dismiss();
        this.showAlert(err.message, err.status);
      });
  });  
  }

  onPickUpPicked(location:PlaceLocation) {
    this.estimateForm.get('pickupAddress').setValue(location.address);
    this.estimateForm.get('pickupLongitude').setValue(location.lng);
    this.estimateForm.get('pickupLatitude').setValue(location.lat);
    this.estimateForm.get('pickupImage').setValue(location.staticMapImageUrl);
  }

  onDropOffPicked(location: PlaceLocation) {
    this.estimateForm.get('dropoffAddress').setValue(location.address);
    this.estimateForm.get('dropoffLatitude').setValue(location.lat);
    this.estimateForm.get('dropoffLongitude').setValue(location.lng);
    this.estimateForm.get('dropoffImage').setValue(location.staticMapImageUrl);
  }

  ionViewWillLeave(){
    this.estimateForm.reset();
    this.estimates = [];
  }

  private showAlert(message: string, status:string) {
    this.alert
      .create({
        header: status,
        message: message,
        buttons: ['Okay']
      })
      .then(alertEl => alertEl.present());
  }

}
