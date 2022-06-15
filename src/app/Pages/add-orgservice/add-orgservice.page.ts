import { OrgService } from './../../Services/org.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { forkJoin } from 'rxjs';
import { AuthService } from 'src/app/Auth/auth.service';
import { KeyValuePair, LocalData, PlaceLocation } from 'src/app/Models/user.model';
import { ClientService } from 'src/app/Services/client.service';
import { LookupsService } from 'src/app/Services/lookups.service';
import { StorageService } from 'src/app/Services/storage.service';
import { UserService } from 'src/app/Services/user.Service';

@Component({
  selector: 'app-add-orgservice',
  templateUrl: './add-orgservice.page.html',
  styleUrls: ['./add-orgservice.page.scss'],
})
export class AddOrgservicePage implements OnInit {

  addOrgForm: FormGroup;
  paymentTypes:KeyValuePair;
  error_messages = {
    'orgName': [
      { type: 'required', message: ' Name is required.' }
    ],

    'regNumber': [
      { type: 'required', message: 'Registration is required.' }
    ],
  }

  constructor(private formBuilder: FormBuilder,
              private lookupService: LookupsService,
              private alert: AlertController,
              private orgService: OrgService,
              private router: Router,
              private authservice:AuthService,
              private loadingCtrl: LoadingController,
              private storage: StorageService,) {

                this.addOrgForm = this.formBuilder.group({
                  userId: '',
                  orgName: new FormControl('', Validators.compose([
                    Validators.required
                  ])),
                  regNumber: new FormControl('', Validators.compose([
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
                });
            
                this.storage.getObject('data').then((data: any) => {
                  this.addOrgForm.get('userId').setValue(data.userId);
                });
               }

  ngOnInit() {
    let sources = [
      this.lookupService.getPaymentTypes()
     ];
    
     forkJoin(sources).subscribe((data:any)=>{
      this.paymentTypes = data[0]
     });
     
  }

  addOrg(){
    this.loadingCtrl.create({ keyboardClose: true, message: 'Please Wait...' })
    .then(loadingEl => {
      loadingEl.present();
      this.orgService.addOrg(this.addOrgForm.value).subscribe((data:any) => {
        loadingEl.dismiss();
        this.authservice.setUserData(data);
        this.router.navigate(['/tabs/home'], { replaceUrl: true });
        this.showAlert(data.message, data.status);
      }, (err:any) => {
        loadingEl.dismiss();
        this.showAlert(err.message, err.status);
      });
  });  
  }


  onLocationPicked(location: PlaceLocation) {
    this.addOrgForm.get('gpsAddress').setValue(location.address);
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

  back(){
    this.router.navigate(['/tabs/addmore-service'], { replaceUrl: true });
  }

}
