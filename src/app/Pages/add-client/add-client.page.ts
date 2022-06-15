import { ClientService } from './../../Services/client.service';
import { KeyValuePair, LocalData, PlaceLocation, CreateWallet } from './../../Models/user.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { forkJoin } from 'rxjs';
import { LookupsService } from 'src/app/Services/lookups.service';
import { UserService } from 'src/app/Services/user.Service';
import { StorageService } from 'src/app/Services/storage.service';
import { AuthService } from 'src/app/Auth/auth.service';
import { WalletService } from 'src/app/Services/wallet.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.page.html',
  styleUrls: ['./add-client.page.scss'],
})
export class AddClientPage implements OnInit {

 
  addClientForm: FormGroup;
  createWalletForm:FormGroup;
  gender:KeyValuePair;
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
  }

  constructor(private formBuilder: FormBuilder,
              private lookupService: LookupsService,
              private authService: AuthService, 
              private alert: AlertController,
              private clientService: ClientService,
              private router: Router,
              private walletService:WalletService,
              private loadingCtrl: LoadingController,
              private storage: StorageService,) {
                
    this.addClientForm = this.formBuilder.group({
      userId: '',
      surname: new FormControl('', Validators.compose([
        Validators.required
      ])),
      firstname: new FormControl('', Validators.compose([
        Validators.required
      ])),
      othernames: new FormControl(''),
      gender: new FormControl('', Validators.compose([
        Validators.required
      ]))
    });

    this.createWalletForm = this.formBuilder.group({
      userId: new FormControl(null),
      countryId: new FormControl(null),
    });

     this.storage.getObject('data').then((data: any) => {
      this.addClientForm.get('userId').setValue(data.userId);
      this.createWalletForm.get('userId').setValue(data.userId);
      this.createWalletForm.get('countryId').setValue(data.countryId);
    });

   }

  ngOnInit() {
    
    let sources = [
      this.lookupService.getGenders()
     ];
    
     forkJoin(sources).subscribe((data:any)=>{
      this.gender = data[0]
     });

  }


  addClient(){
    this.loadingCtrl.create({ keyboardClose: true, message: 'Please Wait...' })
    .then(loadingEl => {
      loadingEl.present();
      this.clientService.addClient(this.addClientForm.value).subscribe((data:any) => {
        loadingEl.dismiss();
        this.authService.setUserData(data);
        this.router.navigate(['/tabs/home'], { replaceUrl: true });
        // this.showAlert(data.message, data.status);
      }, (err:any) => {
        loadingEl.dismiss();
        this.showAlert(err.message, err.status);
      });
  });  
  }

  createWallet(){
    this.walletService.createWallet(this.createWalletForm.value).subscribe((data:any) => {
      this.showAlert(data.message, data.status);
    }, (err:any) => {
      console.log("Error while creating wallet");
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
