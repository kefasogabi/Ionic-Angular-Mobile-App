import { LocalData } from './../../Models/user.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { forkJoin } from 'rxjs';
import { KeyValuePair } from 'src/app/Models/user.model';
import { LookupsService } from 'src/app/Services/lookups.service';
import { UserService } from 'src/app/Services/user.Service';
import { VendorService } from 'src/app/Services/vendor.service';
import { StorageService } from 'src/app/Services/storage.service';
import { AuthService } from 'src/app/Auth/auth.service';

@Component({
  selector: 'app-add-vendor',
  templateUrl: './add-vendor.page.html',
  styleUrls: ['./add-vendor.page.scss'],
})
export class AddVendorPage implements OnInit {

  addVendorForm: FormGroup;
  gender:KeyValuePair;
  paymentTypes:KeyValuePair;
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
    ]
  }

  constructor(private formBuilder: FormBuilder,
              private lookupService: LookupsService,
              private authService: AuthService, 
              private alert: AlertController,
              private vendorService: VendorService,
              private router: Router,
              private loadingCtrl: LoadingController,
              private storage: StorageService,) {
                
    this.addVendorForm = this.formBuilder.group({
      userId: '',
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
      ]))
    });



    this.storage.getObject('data').then((data: any) => {
      this.addVendorForm.get('userId').setValue(data.userId);
    });

   }

  ngOnInit() {
    let sources = [
      this.lookupService.getGenders(),
      this.lookupService.getPaymentTypes()
     ];
    
     forkJoin(sources).subscribe((data:any)=>{
      this.gender = data[0],
      this.paymentTypes = data[1]
     })
  }

  addVendor(){
    this.loadingCtrl.create({ keyboardClose: true, message: 'Please Wait...' })
    .then(loadingEl => {
      loadingEl.present();
      this.vendorService.addVendor(this.addVendorForm.value).subscribe((data:any) => {
        loadingEl.dismiss();
        this.authService.setUserData(data);
        this.router.navigate(['/tabs/home'], { replaceUrl: true });
        this.showAlert(data.message, data.status);
      }, (err:any) => {
        loadingEl.dismiss();
        this.showAlert(err.message, err.status);
      });
  });  
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
