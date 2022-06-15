import { AuthService } from './../../Auth/auth.service';
import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController, Platform, ToastController } from '@ionic/angular';
import { UserService } from 'src/app/Services/user.Service';
import { LookupsService } from 'src/app/Services/lookups.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


  countries:any = [];
  LoginForm: FormGroup;
  error_messages = {
    
    'countryId': [
      { type: 'required', message: 'Code is required.' }
    ],
    'phone': [
      { type: 'required', message: 'Phone is required.' }
    ],
    'password': [
      { type: 'required', message: 'pin is required.' },
      { type: 'minlength', message: 'pin length too short.' }
    ],
  }
  constructor(private formBuilder: FormBuilder, 
              private userService: UserService,
              private authService: AuthService, 
              private alert: AlertController,
              public toastController: ToastController,
              private loadingCtrl: LoadingController,
              private router: Router,
              private lookupService: LookupsService, 
              private route: ActivatedRoute,
              private platform: Platform,) { 

                this.platform.backButton.subscribeWithPriority(9999, () => {
                  document.addEventListener('ionBackButton', function (event) {
                    event.preventDefault();
                    event.stopPropagation();
                  }, false);
                });

    this.LoginForm = this.formBuilder.group({
      countryId: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      phone: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(15),
        // Validators.pattern(/^[1-9][0-9]*$/)
      ])),
      telephone: '',
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(4)
      ])),
     
    });
  }

  ngOnInit() {
    this.lookupService.getCountries().subscribe((data:any)=>{
      this.countries = data;
    });
  }

  login(){
    let login = true;
    this.LoginForm.get('telephone').setValue(this.Phone,{emitEvent:false});
    this.authService.login(this.LoginForm.value, login);
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

  get Phone(): string{
    return `${this.LoginForm.get('countryId').value}${this.LoginForm.get('phone').value}`
  }

  noZero(e:any){
    if (String.fromCharCode(e.which) == '0' && e.target.value.indexOf('0') == 0) {
      return e.target.value = e.target.value.slice(0, -1);
    }
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
      position: 'middle',
      color: 'success'
    })
    .then( toast => toast.present());
    
  }

}
