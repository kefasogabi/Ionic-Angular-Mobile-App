import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BookingInfo } from '../Models/user.model';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private packages = new BehaviorSubject<BookingInfo[]>([]);

  baseApi = "https://api-server.cloudware.com.ng/api/";
  constructor(private http:HttpClient) { }

  client(id){
    return this.http.get( this.baseApi + "Home/Client/" + id)
  }

  vendor(id){
    return this.http.get( this.baseApi + "Home/Vendor/" + id)
  }

  rider(id){
    return this.http.get( this.baseApi + "Home/Rider/" + id)
  }

  organization(id){
    return this.http.get( this.baseApi + "Home/Organization/" + id)
  }

  getSysConfig(countryId){
    return this.http.get( this.baseApi + "Home/GetSysConfig/" + countryId)
  }

}
