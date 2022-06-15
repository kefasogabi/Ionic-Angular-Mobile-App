import { RidesService } from './../../Services/rides.service';
import { ClientService } from './../../Services/client.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActionSheetController, AlertController, LoadingController } from '@ionic/angular';
import { forkJoin } from 'rxjs';
import { Booking, KeyValuePair, PlaceLocation, EstimateDetail, Estimate } from 'src/app/Models/user.model';
import { LookupsService } from 'src/app/Services/lookups.service';
import { StorageService } from 'src/app/Services/storage.service';
import { UserService } from 'src/app/Services/user.Service';
import { VendorService } from 'src/app/Services/vendor.service';
import { AuthService } from 'src/app/Auth/auth.service';
import { WalletService } from 'src/app/Services/wallet.service';


@Component({
  selector: 'app-booking',
  templateUrl: './booking.page.html',
  styleUrls: ['./booking.page.scss'],
})
export class BookingPage implements OnInit {

  client:any;
  book:Booking;
  step:any = 1;
  estimates:EstimateDetail;
  bookForm: FormGroup;
  contentType:KeyValuePair;
  handling:KeyValuePair;
  paymentTypes:KeyValuePair;
  pickupType:KeyValuePair;
  typeOfRides:KeyValuePair;
  payers:KeyValuePair;
  wallet:any;
  showWallet:boolean = false;
  error_messages = {
    'typeOfContent': [
      { type: 'required', message: 'Content Type is required.' }
    ],
    'briefDescription': [
      { type: 'required', message: 'Description is required.' }
    ],
    'imageBase64String': [
      { type: 'required', message: 'Image is required.' }
    ],
    'pickupDateTime': [
      { type: 'required', message: 'Date is required.' }
    ],
    'pickupAddress': [
      { type: 'required', message: 'Pickup address is required.' }
    ],
    'phone': [
      { type: 'required', message: 'Phone number is required.' },
      { type: 'minlength', message: 'Phone length is short.' },
      { type: 'maxlength', message: 'Phone length.' },
    ],
    'dropoffDateTime': [
      { type: 'required', message: 'Date is required.' }
    ],
    'typeOfRide': [
      { type: 'required', message: 'Type of ride is required.' }
    ],
    'price': [
      { type: 'required', message: 'Price is required.' }
    ],
    'payer': [
      { type: 'required', message: 'Type of ride is required.' }
    ],
    'paymentType': [
      { type: 'required', message: 'Price is required.' }
    ],

  }
  fromDate: String = new Date().toISOString();
  toDate: String;
  // toDate: string = new Date(fromDate);
  constructor(private formBuilder: FormBuilder,
              private lookupService: LookupsService,
              private walletService: WalletService, 
              private clientService: ClientService,
              private alert: AlertController,
              private rideService: RidesService,
              private router: Router,
              private loadingCtrl: LoadingController,
              private storage: StorageService) {

                this.bookForm = this.formBuilder.group({

                  PackageDetails: new FormGroup({
                    vendorId: new FormControl(''),
                    typeOfContent: new FormControl('', Validators.compose([
                      Validators.required
                    ])),
                    briefDescription: new FormControl('', Validators.compose([
                      Validators.required
                    ])),
                    imagePreview: new FormControl(''),
                    packageImage: new FormControl(''),
                  }),
                  pickupDetails: new FormGroup({
                    pickupDateTime: new FormControl('', Validators.compose([
                      Validators.required
                    ])),
                    pickupAddress: new FormControl('', Validators.compose([
                      Validators.required
                    ])),
                    pickupLongitude: new FormControl(''),
                    pickupLatitude: new FormControl(''),
                    pickupAddressImage: new FormControl(''),
                  }),
                  dropoffDetails: new FormGroup({
                    countryId: new FormControl({value:'', disabled: true}),
                    phone: new FormControl('', Validators.compose([
                      Validators.required,
                      Validators.minLength(5),
                      Validators.maxLength(15),
                    ])),
                    clientId: new FormControl(''),
                    fullname: new FormControl(''),
                    contactTelephone: new FormControl(''),
                    dropoffDateTime: new FormControl('', Validators.compose([
                      Validators.required
                    ])),
                    dropoffAddress: new FormControl('', Validators.compose([
                      Validators.required
                    ])),
                    dropoffLatitude: new FormControl(''),
                    dropoffLongitude: new FormControl(''),
                    dropoffAddressImage: new FormControl(''),
                   
                  }),

                  paymentDetails: new FormGroup({
                   
                    typeOfRide: new FormControl('', Validators.compose([
                      Validators.required
                    ])),
                    price: new FormControl('', Validators.compose([
                      Validators.required
                    ])),
                    payer: new FormControl('', Validators.compose([
                      Validators.required
                    ])),
                    paymentType: new FormControl('', Validators.compose([
                      Validators.required
                    ])),
                   
                  }),

                });
            
               

               }

  ngOnInit() {

    let sources = [
      this.lookupService.getContentType(),
      this.lookupService.getHandling(),
      this.lookupService.getPaymentTypes(),
      this.lookupService.getPickupType(),
      this.lookupService.getPayer(),
      this.lookupService.getVehicleTypes(),
     ];
    
     forkJoin(sources).subscribe((data:any)=>{
      this.contentType = data[0],
      this.handling = data[1],
      this.paymentTypes = data[2],
      this.pickupType = data[3],
      this.payers = data[4],
      this.typeOfRides = data[5]
     });
  }

  ionViewWillEnter(){
    this.storage.getObject('data').then((data: any) => {
      this.bookForm.get('PackageDetails.vendorId').setValue(data.userId);
      this.bookForm.get('dropoffDetails.countryId').setValue(data.countryId);

      this.walletService.getBalance(data.userId).subscribe((data:any) => {
        this.wallet =data ;
      }, (err:any) => {
        console.log("Error while creating wallet");
      });
      
    });
  }
  

  next(){
    this.step = this.step + 1;
    this.toDate = this.bookForm.get('pickupDetails.pickupDateTime').value;
  }

  previous(){
    this.step = this.step - 1;
  }

  submit(){
    
    this.book = {
      vendorId: this.bookForm.get('PackageDetails.vendorId').value,
      typeOfContent: this.bookForm.get('PackageDetails.typeOfContent').value,
      briefDescription: this.bookForm.get('PackageDetails.briefDescription').value,
      packageImage: this.bookForm.get('PackageDetails.packageImage').value,
      
      pickupDateTime: this.bookForm.get('pickupDetails.pickupDateTime').value,
      pickupAddress: this.bookForm.get('pickupDetails.pickupAddress').value,
      pickupLongitude:this.bookForm.get('pickupDetails.pickupLongitude').value,
      pickupLatitude:this.bookForm.get('pickupDetails.pickupLatitude').value,
      pickupAddressImage:this.bookForm.get('pickupDetails.pickupAddressImage').value,
      
      clientId: this.bookForm.get('dropoffDetails.clientId').value,
      contactTelephone: this.Phone,
      dropoffDateTime: this.bookForm.get('dropoffDetails.dropoffDateTime').value,
      dropoffAddress: this.bookForm.get('dropoffDetails.dropoffAddress').value,
      dropoffLatitude: this.bookForm.get('dropoffDetails.dropoffLatitude').value,
      dropoffLongitude: this.bookForm.get('dropoffDetails.dropoffLongitude').value,
      dropoffAddressImage:this.bookForm.get('dropoffDetails.dropoffAddressImage').value,

      typeOfRide:this.bookForm.get('paymentDetails.typeOfRide').value,
      price:this.bookForm.get('paymentDetails.price').value,
    };

    console.log(this.book);

    this.loadingCtrl.create({ keyboardClose: true, message: 'Please Wait...' })
    .then(loadingEl => {
      loadingEl.present();
      this.rideService.newRide(this.book).subscribe((data:any) => {
        loadingEl.dismiss();
        this.router.navigate(['/tabs/home'], { replaceUrl: true });
        this.showAlert(data.message, data.status);
      }, (err:any) => {
        loadingEl.dismiss();
        this.showAlert(err.message, err.status);
      });
  });  

  }


  noZero(e:any){
    if (String.fromCharCode(e.which) == '0' && e.target.value.indexOf('0') == 0) {
      return e.target.value = e.target.value.slice(0, -1);
    }
  }

  getClient(){
    this.clientService.getClientByTelephone(this.Phone).subscribe((data:any)=>{
      this.client = data;
      this.bookForm.get('dropoffDetails.fullname').setValue(data.fullname);
      this.bookForm.get('dropoffDetails.clientId').setValue(data.userId);
    }
    ,(err:any) => {
      this.bookForm.get('dropoffDetails.fullname').setValue(err.message);
    });
  }

  get Phone(): string{
    return `${this.bookForm.get('dropoffDetails.countryId').value}${this.bookForm.get('dropoffDetails.phone').value}`
  }

  onPickUpPicked(location:PlaceLocation) {
    this.bookForm.get('pickupDetails.pickupAddress').setValue(location.address);
    this.bookForm.get('pickupDetails.pickupLongitude').setValue(location.lng);
    this.bookForm.get('pickupDetails.pickupLatitude').setValue(location.lat);
    this.bookForm.get('pickupDetails.pickupAddressImage').setValue(location.staticMapImageUrl);
    this.estimate();
  }

  onDropOffPicked(location: PlaceLocation) {
    this.bookForm.get('dropoffDetails.dropoffAddress').setValue(location.address);
    this.bookForm.get('dropoffDetails.dropoffLatitude').setValue(location.lat);
    this.bookForm.get('dropoffDetails.dropoffLongitude').setValue(location.lng);
    this.bookForm.get('dropoffDetails.dropoffAddressImage').setValue(location.staticMapImageUrl);
    this.estimate();
  }

  estimate(){
    this.storage.getObject('data').then((data: any) => {
      let estimateDetail:Estimate ={
        pickupLongitude: this.bookForm.get('pickupDetails.pickupLongitude').value,
        pickupLatitude: this.bookForm.get('pickupDetails.pickupLatitude').value,
        dropoffLongitude: this.bookForm.get('dropoffDetails.dropoffLongitude').value,
        dropoffLatitude: this.bookForm.get('dropoffDetails.dropoffLatitude').value,
        countryId: data.countryId
      };
        this.rideService.getPrice(estimateDetail).subscribe((data:any) => {
          this.estimates = data;
        }, (err:any) => {
          console.log(err.message);
        });
      });
  }

  checkBalance(selectedValue, wallet){
    if(selectedValue.detail.value > wallet.balance){
      this.showWallet = true;
    }else{
      this.showWallet = false;
    }
  }

  fund(){
    this.router.navigate(['/tabs/fund-wallet'], {replaceUrl: true })
  }

  onImagePicked(imageData: string ) {
   this.bookForm.get('PackageDetails.imagePreview').setValue('data:image/jpeg;base64,' + imageData);
   this.bookForm.get('PackageDetails.packageImage').setValue(imageData);
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

  ionViewWillLeave(){
    this.bookForm.reset();
    this.step = 1;
  }
  

}
