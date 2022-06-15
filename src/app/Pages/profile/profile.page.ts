import { RiderService } from './../../Services/rider.service';
import { KeyValuePair, ImageUrl,  EditUser, BankAccount, Card, PlaceLocation, Rider, Guarantor } from './../../Models/user.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { forkJoin } from 'rxjs';
import { ClientService } from 'src/app/Services/client.service';
import { LookupsService } from 'src/app/Services/lookups.service';
import { StorageService } from 'src/app/Services/storage.service';
import { UserService } from 'src/app/Services/user.Service';
import { AuthService } from 'src/app/Auth/auth.service';
import {
  Plugins,
  Capacitor,
  CameraSource,
  CameraResultType
} from '@capacitor/core';
import { AccountService } from 'src/app/Services/account.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  account:BankAccount;
  card:Card;
  userProfile:any = {};
  public showProfile : boolean = false;
  public showBank : boolean = false;
  public showCard: boolean = false;
  public showRiderProfile: boolean = false;
  public showGuarantor: boolean = false;
  image: ImageUrl;
  profileForm: FormGroup;
  bankForm: FormGroup;
  cardForm: FormGroup;
  imgForm:FormGroup;
  riderProfile:FormGroup;
  guarantorForm:FormGroup;
  gender:KeyValuePair;
  banks:KeyValuePair;
  cardType:KeyValuePair;
  vehicleType:KeyValuePair;
  user:EditUser;
  Occupation:KeyValuePair;
  Relationship:KeyValuePair;
  clientServices:any;
  riderServices:any;
  vendorServices:any;
  orgServices:any;
  myPhoto:any = "assets/avatar.png";
  error_messages = {
    'surname': [
      { type: 'required', message: 'Surname is required.' }
    ],
    'firstname': [
      { type: 'required', message: 'First Name is required.' }
    ],
    'gender': [
      { type: 'required', message: 'Gender is required.' }
    ]
  };

  bank_messages = {
    'accountName': [
      { type: 'required', message: 'Account name is required.' }
    ],
    'accountNumber': [
      { type: 'required', message: 'Account number is required.' }
    ],
    'bankName': [
      { type: 'required', message: 'Bank is required.' }
    ]
  }

  card_messages = {
    'cardNumber': [
      { type: 'required', message: 'CardNumber is required.' }
    ],
    'cardType': [
      { type: 'required', message: 'CardType is required.' }
    ],
    'cardName': [
      { type: 'required', message: 'CardName is required.' }
    ],
    'expiryMonth': [
      { type: 'required', message: 'ExpiryMonth is required.' }
    ],
    'expiryYear': [
      { type: 'required', message: 'ExpiryYear is required.' }
    ],
    'securityNumber': [
      { type: 'required', message: 'SecurityNumber is required.' }
    ]
  }

  riderProfile_messages = {

    'surname': [
      { type: 'required', message: 'Surname is required.' }
    ],
    'firstname': [
      { type: 'required', message: 'First Name is required.' }
    ],
    'othernames': [
      { type: 'required', message: 'Other names is required.' }
    ],
    'gender': [
      { type: 'required', message: 'Gender is required.' }
    ],
    'vehicleId': [
      { type: 'required', message: 'Vehicle number is required.' }
    ],
    'vehicleType': [
      { type: 'required', message: 'Vehicle type is required.' }
    ],
    'vehicleMake': [
      { type: 'required', message: 'Vehicle make is required.' }
    ],
    'vehicleModel': [
      { type: 'required', message: 'Vehicle model is required.' }
    ],
  }

  guarantor_messages = {
    'fullname': [
      { type: 'required', message: 'Fullname is required.' }
    ],
    'telephone': [
      { type: 'required', message: 'Telephone is required.' }
    ],
    'occupationId': [
      { type: 'required', message: 'occupation is required.' }
    ],
    'contactAddress': [
      { type: 'required', message: 'Contact Address is required.' }
    ],
    'cityOrTown': [
      { type: 'required', message: 'cityOrTown is required.' }
    ],
    'stateOrRegion': [
      { type: 'required', message: 'stateOrRegion is required.' }
    ],
    'relationshipId': [
      { type: 'required', message: 'relationship is required.' }
    ],
  }

  constructor( private formBuilder: FormBuilder,
              private lookupService: LookupsService,
              private authService: AuthService, 
              private alert: AlertController,
              private clientService: ClientService,
              private userService: UserService,
              private alertCtrl:AlertController,
              private loadingCtrl: LoadingController,
              private storage: StorageService,
              private riderService:RiderService,
              private router: Router,
              private accountService: AccountService,) {
                this.storage.getObject('data').then((localData: any) => {
                  this.clientServices = this.serviceExists(localData, ['clientService']);
                  this.riderServices = this.serviceExists(localData, ['ryderService']);
                  this.vendorServices = this.serviceExists(localData, ['vendorService']);
                  this.orgServices = this.serviceExists(localData, ['orgService']);
                 });


      this.profileForm = this.formBuilder.group({
        userId: null,
        surname: new FormControl(null, Validators.compose([
          Validators.required
        ])),
        firstname: new FormControl(null, Validators.compose([
          Validators.required
        ])),
        othernames: new FormControl(null, Validators.compose([
          Validators.required
        ])),
        gender: new FormControl(null, Validators.compose([
          Validators.required
        ]))
      });

      this.bankForm = this.formBuilder.group({
        userId: null,
        accountName: new FormControl(null, Validators.compose([
          Validators.required
        ])),
        accountNumber: new FormControl(null, Validators.compose([
          Validators.required
        ])),
        bankName: new FormControl(null, Validators.compose([
          Validators.required
        ])),
      });

      this.cardForm = this.formBuilder.group({
        userId: null,
        cardNumber: new FormControl(null, Validators.compose([
          Validators.required
        ])),
        cardType: new FormControl(null, Validators.compose([
          Validators.required
        ])),
        cardName: new FormControl(null, Validators.compose([
          Validators.required
        ])),
        expiryMonth: new FormControl(null, Validators.compose([
          Validators.required
        ])),
        expiryYear: new FormControl(null, Validators.compose([
          Validators.required
        ])),
        securityNumber: new FormControl(null, Validators.compose([
          Validators.required
        ]))
      });

      this.imgForm = this.formBuilder.group({
        userId: '',
        imageBase64String: new FormControl('')
      });

      this.riderProfile = this.formBuilder.group({
        userId: null,
        surname: new FormControl(null, Validators.compose([
          Validators.required
        ])),
        firstname: new FormControl(null, Validators.compose([
          Validators.required
        ])),
        othernames: new FormControl(null, Validators.compose([
          Validators.required
        ])),
        gender: new FormControl(null, Validators.compose([
          Validators.required
        ])),
        gpsAddress: new FormControl(null, Validators.compose([
          Validators.required
        ])),
        gpsLongitude: new FormControl(null, Validators.compose([
          Validators.required
        ])),
        gpsLatitude: new FormControl(null, Validators.compose([
          Validators.required
        ])),
        vehicleId: new FormControl(null, Validators.compose([
          Validators.required
        ])),
        vehicleType: new FormControl(null, Validators.compose([
          Validators.required
        ])),
        vehicleMake: new FormControl(null, Validators.compose([
          Validators.required
        ])),
        vehicleModel: new FormControl(null, Validators.compose([
          Validators.required
        ])),
      });

      this.guarantorForm = this.formBuilder.group({
        userId: new FormControl(null),
        fullname: new FormControl(null, Validators.compose([
          Validators.required
        ])),
        telephone: new FormControl(null, Validators.compose([
          Validators.required
        ])),
        occupationId: new FormControl(null, Validators.compose([
          Validators.required
        ])),
        contactAddress: new FormControl(null, Validators.compose([
          Validators.required
        ])),
        cityOrTown: new FormControl(null, Validators.compose([
          Validators.required
        ])),
        stateOrRegion: new FormControl(null, Validators.compose([
          Validators.required
        ])),
        relationshipId: new FormControl(null, Validators.compose([
          Validators.required
        ])),
      });

      this.storage.getObject('data').then((data: any) => {
        this.imgForm.get('userId').setValue(data.userId);
      });
   }

  ngOnInit() {

  }

  slideOptsThumbs = {
    spaceBetween: 20,
    slidesPerView: 3,
  };

  ionViewWillEnter(){
    this.storage.getObject('data').then((localData: any) => {
      this.userProfile = localData;
      let sources = [
        this.lookupService.getGenders(),
        this.lookupService.getBanks(),
        this.lookupService.getCardTypes(),
        this.lookupService.getVehicleTypes(),
        this.lookupService.getOccupation(),
        this.lookupService.getRelationship()
      ];
      
      forkJoin(sources).subscribe((data:any)=>{
        this.gender = data[0],
        this.banks = data[1],
        this.cardType = data[2],
        this.vehicleType = data[3],
        this.Occupation = data[4],
        this.Relationship = data[5]
      });

      this.clientService.getClient(localData.userId).subscribe((data:any)=>{
        this.setUser(data)
      });

      this.riderService.getRider(localData.userId).subscribe((data:any)=>{
        this.setRiderProfile(data)
      });

      this.riderService.getGuarantor(localData.userId).subscribe((data:any)=>{
        this.setGuarantor(data)
      });

      this.accountService.getCard(localData.userId).subscribe((data:any)=>{
         this.setCard(data);
      });
      this.accountService.getAccount(localData.userId).subscribe((data:any)=>{
        this.setAccount(data);
      });

     

    });
  }

  getImage(){
    Plugins.Camera.getPhoto({
      quality: 50,
      source: CameraSource.Prompt,
      correctOrientation: true,
      height: 300,
      width: 300,
      resultType: CameraResultType.Base64
    })
      .then(image => {
        this.myPhoto = 'data:image/jpeg;base64,' + image.base64String;
        this.imgForm.get('imageBase64String').setValue(image.base64String);
        this.uploadImage();
      })
      .catch(error => {
        return false;
      });
  }

  onLocationPicked(location: PlaceLocation) {
    this.riderProfile.get('gpsAddress').setValue(location.address);
    this.riderProfile.get('gpsLongitude').setValue(location.lng);
    this.riderProfile.get('gpsLatitude').setValue(location.lat);
  }

  uploadImage(){
    this.userService.postImage(this.imgForm.value,).subscribe((data:any) => {
      this.showAlert(data.message, data.status);
    }, (err:any) => {
      this.showAlert(err.message, err.status);
    });
  }

  profile(){
      this.loadingCtrl.create({ keyboardClose: true, message: 'Please Wait...' })
      .then(loadingEl => {
        loadingEl.present();
        this.clientService.updateClient(this.profileForm.value, this.profileForm.get('userId').value).subscribe((data:any) => {
          loadingEl.dismiss();
          this.authService.setUserData(data);
          this.showProfile = false;
          this.showAlert("Profile updated successfully.", data.status);
        }, (err:any) => {
          loadingEl.dismiss();
          this.showAlert(err.message, err.status);
        });
    });  
  }

  bankAccount(){
    console.log(this.bankForm.value);
    if(this.bankForm.get('userId').value != null){
      this.storage.getObject('data').then((data: any) => {
        this.bankForm.get('userId').setValue(data.userId);
      });
      this.loadingCtrl.create({ keyboardClose: true, message: 'Please Wait...' })
      .then(loadingEl => {
        loadingEl.present();
        this.accountService.updateAccount(this.bankForm.value, this.bankForm.get('userId').value).subscribe((data:any) => {
          loadingEl.dismiss();
        // this.authService.setUserData(data);
          this.showProfile = false;
          this.showAlert("Bank updated successfully.", data.status);
        }, (err:any) => {
          loadingEl.dismiss();
          this.showAlert("An unexpected error occured!", "Error");
        });
      });
    }else{
      this.storage.getObject('data').then((data: any) => {
        this.bankForm.get('userId').setValue(data.userId);
      });
    this.loadingCtrl.create({ keyboardClose: true, message: 'Please Wait...' })
    .then(loadingEl => {
      loadingEl.present();
      this.accountService.postAccount(this.bankForm.value).subscribe((data:any) => {
        loadingEl.dismiss();
       //this.authService.setUserData(data);
        this.showProfile = false;
        this.showAlert("Bank added successfully.", data.status);
      }, (err:any) => {
        loadingEl.dismiss();
        this.showAlert("An unexpected error occured!", "Error");
      });
    });  
    }
  }

  cards(){
    if(this.cardForm.get('userId').value != null){
      this.storage.getObject('data').then((data: any) => {
         this.cardForm.get('userId').setValue(data.userId);
      });
      this.loadingCtrl.create({ keyboardClose: true, message: 'Please Wait...' })
      .then(loadingEl => {
        loadingEl.present();
        this.accountService.updateCard(this.cardForm.value, this.cardForm.get('userId').value).subscribe((data:any) => {
          loadingEl.dismiss();
         //this.authService.setUserData(data);
          this.showProfile = false;
          this.showAlert("Card updated successfully.", data.status);
        }, (err:any) => {
          loadingEl.dismiss();
          this.showAlert("An unexpected error occured!", "Error");
        });
      });  
    }else{
      this.storage.getObject('data').then((data: any) => {
        this.cardForm.get('userId').setValue(data.userId);
     });
      this.loadingCtrl.create({ keyboardClose: true, message: 'Please Wait...' })
      .then(loadingEl => {
        loadingEl.present();
        this.accountService.postCard(this.cardForm.value).subscribe((data:any) => {
          loadingEl.dismiss();
        // this.authService.setUserData(data);
          this.showProfile = false;
          this.showAlert("Card added successfully.", data.status);
        }, (err:any) => {
          loadingEl.dismiss();
          this.showAlert("An unexpected error occured!", "Error");
        });
    });  
    }
  }

  RiderProfile(){
    this.loadingCtrl.create({ keyboardClose: true, message: 'Please Wait...' })
      .then(loadingEl => {
        loadingEl.present();
        this.riderService.updateRider(this.riderProfile.value, this.riderProfile.get('userId').value).subscribe((data:any) => {
          loadingEl.dismiss();
          this.authService.setUserData(data);
          this.showProfile = false;
          this.showAlert("Profile updated successfully.", data.status);
        }, (err:any) => {
          loadingEl.dismiss();
          this.showAlert("An unexpected error occured!", "Error");
        });
    });  
  }

  guarantor(){
    if(this.guarantorForm.get('userId').value != null){
      this.storage.getObject('data').then((data: any) => {
         this.guarantorForm.get('userId').setValue(data.userId);
      });
      this.loadingCtrl.create({ keyboardClose: true, message: 'Please Wait...' })
      .then(loadingEl => {
        loadingEl.present();
        this.riderService.updateGuarantor(this.guarantorForm.value, this.guarantorForm.get('userId').value).subscribe((data:any) => {
          loadingEl.dismiss();
         //this.authService.setUserData(data);
          this.showProfile = false;
          this.showAlert("Guarantor updated successfully.", data.status);
        }, (err:any) => {
          loadingEl.dismiss();
          this.showAlert("An unexpected error occured!", "Error");
        });
      });  
    }else{
      this.storage.getObject('data').then((data: any) => {
        this.guarantorForm.get('userId').setValue(data.userId);
     });
      this.loadingCtrl.create({ keyboardClose: true, message: 'Please Wait...' })
      .then(loadingEl => {
        loadingEl.present();
        this.riderService.addGuarantor(this.guarantorForm.value).subscribe((data:any) => {
          loadingEl.dismiss();
        // this.authService.setUserData(data);
          this.showProfile = false;
          this.showAlert("Guarantor added successfully.", data.status);
        }, (err:any) => {
          loadingEl.dismiss();
          this.showAlert("An unexpected error occured!", "Error");
        });
    });  
    }
  }

  public toggleProfile(): void {
    this.showProfile = !this.showProfile;
  }

  public toggleBank(): void {
    this.showBank = !this.showBank;
  }

  public toggleCard(): void {
    this.showCard = !this.showCard;
  }

  public toggleRiderProfile(): void {
    this.showRiderProfile = !this.showRiderProfile;
  }

  public toggleGuarantor(): void{
    this.showGuarantor = !this.showGuarantor;
  }

 private setUser(u:EditUser){
  this.profileForm.get('userId').setValue(u.userId);
  this.profileForm.get('surname').setValue(u.surname);
  this.profileForm.get('firstname').setValue(u.firstname);
  this.profileForm.get('othernames').setValue(u.othernames);
  this.profileForm.get('gender').setValue(u.gender);
 }

 private setAccount(a:BankAccount){
  this.bankForm.get('userId').setValue(a.userId);
  this.bankForm.get('accountName').setValue(a.accountName);
  this.bankForm.get('accountNumber').setValue(a.accountNumber);
  this.bankForm.get('bankName').setValue(a.bankName);
  
  
 }

 private setCard(c:Card){
  this.cardForm.get('userId').setValue(c.userId);
  this.cardForm.get('cardNumber').setValue(c.cardNumber);
  this.cardForm.get('cardType').setValue(c.cardType);
  this.cardForm.get('cardName').setValue(c.cardName);
  this.cardForm.get('expiryMonth').setValue(c.expiryMonth);
  this.cardForm.get('expiryYear').setValue(c.expiryYear);
  this.cardForm.get('securityNumber').setValue(c.securityNumber);
 }

 private setRiderProfile(r:Rider){
  this.riderProfile.get('userId').setValue(r.userId);
  this.riderProfile.get('surname').setValue(r.surname);
  this.riderProfile.get('firstname').setValue(r.firstname);
  this.riderProfile.get('othernames').setValue(r.othernames);
  this.riderProfile.get('gender').setValue(r.gender);
  this.riderProfile.get('gpsAddress').setValue(r.gpsAddress);
  this.riderProfile.get('gpsLongitude').setValue(r.gpsLongitude);
  this.riderProfile.get('gpsLatitude').setValue(r.gpsLatitude);
  this.riderProfile.get('vehicleId').setValue(r.vehicleId);
  this.riderProfile.get('vehicleType').setValue(r.vehicleType);
  this.riderProfile.get('vehicleMake').setValue(r.vehicleMake);
  this.riderProfile.get('vehicleModel').setValue(r.vehicleModel);
 }

 private setGuarantor(g:Guarantor){
  this.guarantorForm.get('userId').setValue(g.userId);
  this.guarantorForm.get('fullname').setValue(g.fullname);
  this.guarantorForm.get('telephone').setValue(g.telephone);
  this.guarantorForm.get('occupationId').setValue(g.occupationId);
  this.guarantorForm.get('contactAddress').setValue(g.contactAddress);
  this.guarantorForm.get('cityOrTown').setValue(g.cityOrTown);
  this.guarantorForm.get('stateOrRegion').setValue(g.stateOrRegion);
  this.guarantorForm.get('relationshipId').setValue(g.relationshipId);
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

 
logout(){
  this.alertCtrl.create({
    cssClass: 'my-custom-class',
    header: 'Are you sure?',
    message: 'Do you really want to logout?',
    buttons: [{ 
                text: 'Cancel', 
                role: 'cancel'
              },
              {
                text: 'Yes',
                handler: ()=>{
                  this.authService.logout();
                }
              }]
  }).then( x => x.present());
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

client(){
  this.router.navigate(['/tabs/add-clientservice']);
 }
 
 vendor(){
   this.router.navigate(['/tabs/add-vendorservice']);
 }
 
 rider(){
   this.router.navigate(['/tabs/add-rider']);
 }
 
 organization(){
   this.router.navigate(['/tabs/add-orgservice']);
 }


}
