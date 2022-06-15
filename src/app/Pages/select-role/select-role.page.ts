import { UserService } from './../../Services/user.Service';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AlertController, LoadingController, Platform } from '@ionic/angular';
import { StorageService } from 'src/app/Services/storage.service';


@Component({
  selector: 'app-select-role',
  templateUrl: './select-role.page.html',
  styleUrls: ['./select-role.page.scss'],
})
export class SelectRolePage implements OnInit {
 
  constructor(private UserService: UserService, 
              private router: Router,
              private platform: Platform,
              private storage: StorageService,
              private loadingCtrl: LoadingController,
              private alert: AlertController) {
                this.platform.backButton.subscribeWithPriority(9999, () => {
                  document.addEventListener('ionBackButton', function (event) {
                    event.preventDefault();
                    event.stopPropagation();
                  }, false);
                });
               }

  ngOnInit() {
  }


client(){
 this.router.navigate(['/add-client']);
}

// vendor(){
//   this.router.navigate(['/add-vendor']);
// }

rider(){
  this.router.navigate(['/add-rider']);
}

organization(){
  this.router.navigate(['/add-org']);
}

private sendType(id){
  this.loadingCtrl.create({ keyboardClose: true, message: 'Please wait...' })
    .then(loadingEl => {
      this.storage.getObject('data').then((data: any) => {
        loadingEl.present();
        this.UserService.addClientService(id).subscribe((data:any) => {
          loadingEl.dismiss();
          this.router.navigate(['/tabs/home']);
        }, (err:any) => {
          loadingEl.dismiss();
          this.showAlert(err.message, err.status);
        }); 
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


