import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-info',
  templateUrl: './edit-info.page.html',
  styleUrls: ['./edit-info.page.scss'],
})
export class EditInfoPage implements OnInit {
  editInfoForm: FormGroup;
  countries:any = [];

  constructor(private formBuilder: FormBuilder) { 
    this.editInfoForm = this.formBuilder.group({

      telephone: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(15)
      ])),
      code: new FormControl('', Validators.compose([
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
  }

  pin(formGroup: FormGroup) {
    const { value: password } = formGroup.get('password');
    const { value: confirmPassword } = formGroup.get('confirmPassword');
    return password === confirmPassword ? null : { pinNotMatch: true, password };
  }

  onSubmit(){

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

}
