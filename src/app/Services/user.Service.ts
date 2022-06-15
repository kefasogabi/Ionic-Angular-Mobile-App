import { Activate, ImageUrl, SendVerificationCode } from './../Models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login, signup } from '../Models/user.model';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { resp } from '../Models/Response';

@Injectable({
  providedIn: 'root'
})
export class UserService {

   
  baseApi = "https://api-server.cloudware.com.ng/api/";
  signupApi = "Users/NewUser";
  loginApi = "Users/Login";
  verify = "Users/ResendActivationCode";
  activate = "Users/ActivateUser";
  getUserId = "Users/";

  constructor(private http: HttpClient) { }

  signup(signup: signup){
    return this.http.post( this.baseApi + this.signupApi, signup)
  }

  login(login: Login){
    return this.http.post( this.baseApi + this.loginApi, login)
  }

  getUserById(id: string){
    console.log(id);
    return this.http.get( this.baseApi + this.getUserId + id)
  }

  verifyUser(verify: SendVerificationCode){
    return this.http.post( this.baseApi + this.verify, verify)
  }

  activateUser(activate:Activate){
    return this.http.post( this.baseApi + this.activate, activate)
  }

  getAllServices(){
    return this.http.get( this.baseApi + "Services/GetAllServices")
  }

  getUserServices(id){
    return this.http.get( this.baseApi + "Services/GetUserServices/" + id)
  }

  addClientService(id){
    return this.http.post( this.baseApi + "Services/AddClientService/" + id, id)
  }

  addVenderService(id){
    return this.http.post( this.baseApi + "Services/AddVendorService/" + id, id)
  }

  addOrganizationService(id){
    return this.http.post( this.baseApi + "Services/AddOrganizationService/" + id, id)
  }

  addRiderService(id){
    return this.http.post( this.baseApi + "Services/AddRiderService/" + id, id)
  }

  postImage(image:ImageUrl){
    return this.http.post( this.baseApi + "Users/UploadProfileImage", image );
  }

  
 

}
