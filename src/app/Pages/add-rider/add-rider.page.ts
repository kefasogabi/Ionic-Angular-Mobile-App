import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { forkJoin } from 'rxjs';
import { AuthService } from 'src/app/Auth/auth.service';
import { Guarantor, KeyValuePair, LocalData, PlaceLocation, Rider } from 'src/app/Models/user.model';
import { LookupsService } from 'src/app/Services/lookups.service';
import { RiderService } from 'src/app/Services/rider.service';
import { StorageService } from 'src/app/Services/storage.service';
import { UserService } from 'src/app/Services/user.Service';
import { VendorService } from 'src/app/Services/vendor.service';

@Component({
  selector: 'app-add-rider',
  templateUrl: './add-rider.page.html',
  styleUrls: ['./add-rider.page.scss'],
})
export class AddRiderPage implements OnInit {

  riderDetails:Rider;
  guarantorDetails:Guarantor;
  addRiderForm: FormGroup;
  guarantorForm:FormGroup;
  gender:KeyValuePair;
  vehicleType:KeyValuePair;
  Occupation:KeyValuePair;
  Relationship:KeyValuePair;
  service:boolean;
  step:any = 1;

  error_messages = {

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
  constructor(private formBuilder: FormBuilder,
              private lookupService: LookupsService,
              private authService: AuthService, 
              private alert: AlertController,
              private riderService: RiderService,
              private router: Router,
              private loadingCtrl: LoadingController,
              private storage: StorageService,) {

                this.addRiderForm = this.formBuilder.group({
                  RiderDetails: new FormGroup({
                    userId: new FormControl(''),
                    surname: new FormControl('', Validators.compose([
                      Validators.required
                    ])),
                    firstname: new FormControl('', Validators.compose([
                      Validators.required
                    ])),
                    othernames: new FormControl('', Validators.compose([
                      Validators.required
                    ])),
                    gender: new FormControl('', Validators.compose([
                      Validators.required
                    ])),
                    gpsAddress: new FormControl('', Validators.compose([
                      Validators.required
                    ])),
                    gpsLongitude: new FormControl('', Validators.compose([
                      Validators.required
                    ])),
                    gpsLatitude: new FormControl('', Validators.compose([
                      Validators.required
                    ])),
                    gpsAddressImage: new FormControl('', Validators.compose([
                      Validators.required
                    ])),
                    vehicleId: new FormControl('', Validators.compose([
                      Validators.required
                    ])),
                    vehicleType: new FormControl('', Validators.compose([
                      Validators.required
                    ])),
                    vehicleMake: new FormControl('', Validators.compose([
                      Validators.required
                    ])),
                    vehicleModel: new FormControl('', Validators.compose([
                      Validators.required
                    ])),
                  }),
                  GuarantorDetails: new FormGroup({
                    userId: new FormControl(''),
                    fullname: new FormControl('', Validators.compose([
                      Validators.required
                    ])),
                    telephone: new FormControl('', Validators.compose([
                      Validators.required
                    ])),
                    occupationId: new FormControl('', Validators.compose([
                      Validators.required
                    ])),
                    contactAddress: new FormControl('', Validators.compose([
                      Validators.required
                    ])),
                    cityOrTown: new FormControl('', Validators.compose([
                      Validators.required
                    ])),
                    stateOrRegion: new FormControl('', Validators.compose([
                      Validators.required
                    ])),
                    relationshipId: new FormControl('', Validators.compose([
                      Validators.required
                    ])),
                  }),
                  
                });

                this.storage.getObject('data').then((data: any) => {
                  this.addRiderForm.get('RiderDetails.userId').setValue(data.userId);
                  this.addRiderForm.get('GuarantorDetails.userId').setValue(data.userId);
                });

   }

  ngOnInit() {
   
    let sources = [
      this.lookupService.getGenders(),
      this.lookupService.getVehicleTypes(),
      this.lookupService.getOccupation(),
      this.lookupService.getRelationship()
     ];
    
     forkJoin(sources).subscribe((data:any)=>{
      this.gender = data[0],
      this.vehicleType = data[1],
      this.Occupation = data[2],
      this.Relationship = data[3]
     });
  }

  addRider(){

    this.riderDetails ={
      userId:this.addRiderForm.get('RiderDetails.userId').value,
      surname:this.addRiderForm.get('RiderDetails.surname').value,
      firstname:this.addRiderForm.get('RiderDetails.firstname').value,
      othernames:this.addRiderForm.get('RiderDetails.othernames').value,
      gender:this.addRiderForm.get('RiderDetails.gender').value,
      gpsAddress:this.addRiderForm.get('RiderDetails.gpsAddress').value,
      gpsLongitude:this.addRiderForm.get('RiderDetails.gpsLongitude').value,
      gpsLatitude:this.addRiderForm.get('RiderDetails.gpsLatitude').value,
      gpsAddressImage:this.addRiderForm.get('RiderDetails.gpsAddressImage').value,
      vehicleId:this.addRiderForm.get('RiderDetails.vehicleId').value,
      vehicleType:this.addRiderForm.get('RiderDetails.vehicleType').value,
      vehicleMake:this.addRiderForm.get('RiderDetails.vehicleMake').value,
      vehicleModel:this.addRiderForm.get('RiderDetails.vehicleModel').value,
    };

    this.loadingCtrl.create({ keyboardClose: true, message: 'Please Wait...' })
    .then(loadingEl => {
      loadingEl.present();
      this.riderService.addRider(this.riderDetails).subscribe((data:any) => {
        loadingEl.dismiss();
        this.authService.setUserData(data);
        this.addGuarantor();
        this.router.navigate(['/tabs/home'], { replaceUrl: true });
        this.showAlert(data.message, data.status);
      }, (err:any) => {
        loadingEl.dismiss();
        this.showAlert(err.message, err.status);
      });
    });  
  }

  addGuarantor(){
    this.guarantorDetails = {
      userId:this.addRiderForm.get('GuarantorDetails.userId').value,
      fullname:this.addRiderForm.get('GuarantorDetails.fullname').value,
      telephone:this.addRiderForm.get('GuarantorDetails.telephone').value,
      occupationId:this.addRiderForm.get('GuarantorDetails.occupationId').value,
      contactAddress:this.addRiderForm.get('GuarantorDetails.contactAddress').value,
      cityOrTown:this.addRiderForm.get('GuarantorDetails.cityOrTown').value,
      stateOrRegion:this.addRiderForm.get('GuarantorDetails.stateOrRegion').value,
      relationshipId:this.addRiderForm.get('GuarantorDetails.relationshipId').value,
    };

    this.riderService.addGuarantor(this.guarantorDetails).subscribe((data:any) => {
      console.log(data.message, data.status);
    }, (err:any) => {
      console.log(err.message, err.status);
    });
  }

 next(){
    this.step = this.step + 1;
  }

  previous(){
    this.step = this.step - 1;
  }

  onLocationPicked(location: PlaceLocation) {
    console.log(location);
    this.addRiderForm.get('RiderDetails.gpsAddress').setValue(location.address);
    this.addRiderForm.get('RiderDetails.gpsLongitude').setValue(location.lng);
    this.addRiderForm.get('RiderDetails.gpsLatitude').setValue(location.lat);
    this.addRiderForm.get('RiderDetails.gpsAddressImage').setValue(location.staticMapImageUrl);
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
