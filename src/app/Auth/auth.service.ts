import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { UserService } from '../Services/user.Service';
import { StorageService } from '../Services/storage.service';
import { BehaviorSubject, from } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AuthData } from '../Models/user.model';

@Injectable()
export class AuthService implements OnDestroy {
  private _authData = new BehaviorSubject<AuthData>(null);
  private activeLogoutTimer: any;
  public route:any;
  get userIsAuthenticated() {
    return this._authData.asObservable().pipe(
      map(user => {
        if (user) {
          return !!user.token;
        } else {
          return false;
        }
      })
    );
  }

  get userId() {
    return this._authData.asObservable().pipe(
      map(user => {
        if (user) {
          return user.userId;
        } else {
          return null;
        }
      })
    );
  }

  get token() {
    return this._authData.asObservable().pipe(
      map(user => {
        if (user) {
          return user.token;
        } else {
          return null;
        }
      })
    );
  }

  constructor(private userService: UserService, 
              private alert: AlertController,
              public toastController: ToastController,
              private loadingCtrl: LoadingController,
              private router: Router,
              private storage: StorageService
              ){ }


 

  login(login:any, isLogin:boolean){
    this.loadingCtrl.create({ keyboardClose: true, message: 'Please Wait...' })
    .then(loadingEl => {
      loadingEl.present();
      this.userService.login(login).subscribe((data:any) => {
        this.setData(data);
        console.log(data);
        loadingEl.dismiss();
        if(isLogin){
          if(data.telephoneVerified && data.emailVerified){
            if(this.serviceExists(data)){
              this.router.navigate(['/tabs/home'], { replaceUrl: true });
             }else{
              this.router.navigate(['/select-role'], { replaceUrl: true });
             }
          }else{
            this.router.navigate(['/verifyuser'], { replaceUrl: true });
          }
        }
      }, (err:any) => {
        loadingEl.dismiss();
        this.showAlert(err.message, err.status);
      }); 
    });
  }

  checkAuth(){
    this.storage.getObject('authData').then((data: any) => {
      if(data.telephoneVerified && data.emailVerified){
        if(this.serviceExists(data)){
          this.router.navigate(['/tabs/home'], { replaceUrl: true });
         }else{
          this.router.navigate(['/select-role'], { replaceUrl: true });
         }
      }else{
        this.router.navigate(['/verifyuser'], { replaceUrl: true });
      }
     });
     
  }

  sendVerificationCode(){
    this.loadingCtrl.create({ keyboardClose: true, message: 'Please Wait...' })
      .then(loadingEl => {
        loadingEl.present();
        this.storage.getObject('data').then((localData: any) => {
          this.userService.verifyUser(localData).subscribe((data:any)=>{
            loadingEl.dismiss();
            let encode =  window.btoa(JSON.stringify(data.activationCode));
            this.storage.setString('code', encode);
            this.showAlert(data.activationCode, data.status);
          }, (err:any) => {
            loadingEl.dismiss();
            this.showAlert(err.message, err.status);
          });
      });
    }); 
  }

  serviceExists(data:any){
    let obj = {};
    let service:any[] = ['orgService','ryderService','clientService','vendorService'];
    for (let x of service) {
        if(x in data){
            obj[x] = data[x];
        }
    }
    for (let i in obj) {
      if (obj[i] === true) return true;
    }
    return false;
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

  autoLogin() {
    return from(this.storage.getObject('authData')).pipe(
      map((storedData:any) => {
        if (!storedData ) {
          return null;
        }
        
        const parsedData = storedData as {
          token: string;
          tokenExpirationDate: string;
          userId: string;
          email: string;
          telephoneVerified:boolean;
          emailVerified:boolean;
          orgService:boolean;
          ryderService:boolean;
          clientService:boolean;
          vendorService:boolean;
          
        };

        const expirationTime = new Date(parsedData.tokenExpirationDate);
        if (expirationTime <= new Date()) {
          return null;
        }
        const user = new AuthData(
          parsedData.userId,
          parsedData.email,
          parsedData.token,
          expirationTime,
          parsedData.telephoneVerified,
          parsedData.emailVerified,
          parsedData.orgService,
          parsedData.ryderService,
          parsedData.clientService,
          parsedData.vendorService,
        );
        
        return user;
      }),
      tap(user => {
        if (user) {
          this._authData.next(user);
          this.autoLogout(user.tokenDuration);
        }
      }),
      map(user => {
        return !!user;
      })
    );
  }

  private autoLogout(duration: number) {
    if (this.activeLogoutTimer) {
      clearTimeout(this.activeLogoutTimer);
    }
    this.activeLogoutTimer = setTimeout(() => {
      this.logout();
    }, duration);
  }

  logout() {
    // remove user from local storage to log user out
    if (this.activeLogoutTimer) {
      clearTimeout(this.activeLogoutTimer);
    }
    this._authData.next(null);
    this.storage.removeItem('token');
    this.storage.removeItem('data');
    this.storage.removeItem('code');
    this.storage.removeItem('authData');
    this.router.navigate(['/login'], { replaceUrl: true });
  }

  ngOnDestroy() {
    if (this.activeLogoutTimer) {
      clearTimeout(this.activeLogoutTimer);
    }
  }

  private setData(data){
    const expirationTime = new Date(data.tokenExpirationDate);
    const user = new AuthData(
      data.userId,
      data.email,
      data.token,
      expirationTime,
      data.telephoneVerified,
      data.emailVerified,
      data.orgService,
      data.ryderService,
      data.clientService,
      data.vendorService,
    );
    this._authData.next(user);
    this.autoLogout(user.tokenDuration);
    this.storeAuthData(
      data.userId,
      data.token,
      expirationTime.toISOString(),
      data.email,
      data.telephoneVerified,
      data.emailVerified,
      data.orgService,
      data.ryderService,
      data.clientService,
      data.vendorService,
    );
    this.setUserData(data);
    this.storage.setString('token', data.token);

  }

  public setUserData(data:any){
    this.storage.setObject('data', {
      userId:data.userId, 
      telephone:data.telephone, 
      email:data.email,
      countryId:data.countryId,
      fullname:data.fullname,
      orgService:data.orgService,
      ryderService:data.ryderService,
      clientService:data.clientService,
      vendorService:data.vendorService,
      image:data.image,
    });
  }

  private storeAuthData(
          userId: string,
          token: string,
          tokenExpirationDate: string,
          email: string,
          telephoneVerified: boolean,
          emailVerified: boolean,
          orgService:boolean,
          ryderService:boolean,
          clientService:boolean,
          vendorService:boolean,){

            this.storage.setObject('authData', {
              userId:userId,
              email:email,
              token:token,
              tokenExpirationDate: tokenExpirationDate,
              telephoneVerified:telephoneVerified,
              emailVerified:emailVerified,
              orgService:orgService,
              ryderService:ryderService,
              clientService:clientService,
              vendorService:vendorService,
            });

  }





}
