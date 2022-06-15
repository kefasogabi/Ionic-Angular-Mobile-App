import { AuthService } from './../../Auth/auth.service';
import { LookupsService } from './../../Services/lookups.service';
import { UserService } from './../../Services/user.Service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/Services/storage.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  countries:any = [];
  results: Observable<any>;
  data: any;
  validations_form: any;
  signUpForm: FormGroup;
  match: boolean;

  error_messages = {
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'minlength', message: 'Email length.' },   
      { type: 'maxlength', message: 'Email length.' },
      { type: 'required', message: 'please enter a valid email address.' }
    ],

    'phone': [
      { type: 'required', message: 'Phone is required.' },
      { type: 'minlength', message: 'Phone length.' },
      { type: 'maxlength', message: 'Phone length.' },
    ],
    'countryId': [
      { type: 'required', message: 'Code is required.' }
    ],
    'password': [
      { type: 'required', message: 'pin is required.' },
      { type: 'minlength', message: 'pin length too short.' },
      { type: 'maxlength', message: 'pin length too long.' }
    ],
    'confirmPassword': [
      { type: 'required', message: 'Confirm pin is required.' },
      { type: 'minlength', message: 'pin length too short.' },
      { type: 'maxlength', message: 'pin length too long.' },
      { type: 'name', message: 'pin not match' }
    ],
  }

  constructor(private formBuilder: FormBuilder, 
              private userService: UserService,
              private lookupService: LookupsService, 
              private alert: AlertController,
              private router: Router,
              private authService: AuthService,
              private toastController:ToastController,
              private loadingCtrl: LoadingController,
              private storage: StorageService) { 

    this.signUpForm = this.formBuilder.group({
      phone: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(15),
        // Validators.pattern(/^[1-9][0-9]*$/)
      ])),
      telephone: '',
      countryId: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(30),
        Validators.email
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(4)
      ])),
      confirmPassword: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(4),
      ])),
    }, { 
      validators: this.pin.bind(this)
    });

  }

  ngOnInit() {
    this.lookupService.getCountries().subscribe((data:any)=>{
      this.countries = data;
    });
  }

  loadFlags() {
    setTimeout(()=>{ 
      let countries = this.countries;
     let radios=document.getElementsByClassName('alert-radio-label');
     for (let index = 0; index < countries.length; index++) {
        let element = radios[index];
        // Creating the image Element
        var img = document.createElement("img");
        img.setAttribute("src", `assets/flags/${countries[index].flagUrl}`);
        img.setAttribute("style", "width: 30px;height:16px;");
        // inserting image as first child
        element.insertBefore(img, element.firstChild);
       element.innerHTML=element.innerHTML.concat(`${countries[index].countryName}`);
      }
      
  }, 100);
  }


  isShowType = false;
  isHideReg = true;
   
  toggleDisplayDiv() {
    this.isHideReg = !this.isHideReg;
    this.isShowType = !this.isShowType;
  }

  //TODO: fix post issues
  
  onSubmit(){
    this.loadingCtrl.create({ keyboardClose: true, message: 'Please Wait...' })
    .then(loadingEl => {
      loadingEl.present();
      this.signUpForm.get('telephone').setValue(this.Phone,{emitEvent:false});
      let login = false;
      this.userService.signup(this.signUpForm.value).subscribe((data:any) => {
        loadingEl.dismiss();
        let encode =  window.btoa(JSON.stringify(data.activationCode));
        this.storage.setString('code', encode);
        this.showToast(data.message);
        this.authService.login(this.signUpForm.value, login);
        this.router.navigate(['/verifyuser']);
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

  get Phone(): string{
    return `${this.signUpForm.get('countryId').value}${this.signUpForm.get('phone').value}`
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

  private showToast(message: string)
  {
     this.toastController.create({
      message: message,
      duration: 2000,
      position: 'top',
      color: 'success'
    })
    .then( toast => toast.present());
    
  }

  pin(formGroup: FormGroup) {
    const { value: password } = formGroup.get('password');
    const { value: confirmPassword } = formGroup.get('confirmPassword');
    return password === confirmPassword ? null : { pinNotMatch: true, password };
  }

}
