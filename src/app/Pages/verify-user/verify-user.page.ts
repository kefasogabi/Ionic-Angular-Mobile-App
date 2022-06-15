import { AuthService } from './../../Auth/auth.service';
import { LocalData, SendVerificationCode } from './../../Models/user.model';
import { UserService } from 'src/app/Services/user.Service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController, Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/Services/storage.service';

@Component({
  selector: 'app-verify-user',
  templateUrl: './verify-user.page.html',
  styleUrls: ['./verify-user.page.scss'],
})
export class VerifyUserPage implements OnInit {
 data:LocalData;
 verify:SendVerificationCode;
 verifyForm: FormGroup;
 error_messages = {
  'confirmCode': [
    { type: 'required', message: 'code is required.' },
    { type: 'minlength', message: 'code length.' },
    { type: 'maxlength', message: 'code length.' },
    { type: 'name', message: 'code does not match' }
  ]
}
  constructor(private userService:UserService,
              private formBuilder: FormBuilder,
              private loadingCtrl: LoadingController,
              private router: Router,
              private platform: Platform,
              private storage: StorageService,
              private alert: AlertController,
              private authService: AuthService) {
                this.platform.backButton.subscribeWithPriority(9999, () => {
                  document.addEventListener('ionBackButton', function (event) {
                    event.preventDefault();
                    event.stopPropagation();
                  }, false);
                });
    this.verifyForm = this.formBuilder.group({
      telephone: '',
      userId:'',
      email: '',
      code: '',
      confirmCode: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(4),
      ])),
    },{ 
      validators: this.code.bind(this)
    })

    this.storage.getObject('data').then((data: any) => {
      this.data = data;
    });

   }

  ngOnInit() {
    
    this.authService.sendVerificationCode();
    
  }

  sendVerificationCode(){
   this.authService.sendVerificationCode();
  }

  activateUser(){
    this.loadingCtrl.create({ keyboardClose: true, message: 'Please Wait...' })
    .then(loadingEl => {
      loadingEl.present();
      this.storage.getObject('data').then((user: any) => {
        this.userService.activateUser(user).subscribe((data:any)=>{
          loadingEl.dismiss();
          if(this.authService.serviceExists(user)){
            this.router.navigate(['/tabs/home'], { replaceUrl: true });
          }else{
            this.router.navigate(['/select-role'], { replaceUrl: true });
          }
          this.showAlert(data.message, data.status);
        }, (err:any) => {
          loadingEl.dismiss();
          this.showAlert(err.message, err.status);
        });
      });
  }); 
  }

  check(){
    this.storage.getString('code').then((data: any) => {
      if (data.value) {
        let decode = window.atob(data.value);
        this.verifyForm.get('code').setValue(JSON.parse(decode));
      }
    })
  }

  private showAlert(message:string, status:string){
    this.alert
      .create({
        header: status,
        message: message,
        buttons: ['Okay']
      })
      .then(alertEl => alertEl.present());
  }

  code(formGroup: FormGroup) {
    const { value: code } = formGroup.get('code');
    const { value: confirmCode } = formGroup.get('confirmCode');
    return code === confirmCode ? null : { pinNotMatch: true, code };
  }

  
  

}
