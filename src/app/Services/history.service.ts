import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BookingInfo } from '../Models/user.model';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  private packages = new BehaviorSubject<BookingInfo[]>([]);

  baseApi = "https://api-server.cloudware.com.ng/api/";
  constructor(private http:HttpClient) { }

  client(id){
    return this.http.get( this.baseApi + "History/Client/" + id)
  }

  vendor(id){
    return this.http.get( this.baseApi + "History/Vendor/" + id)
  }

  rider(id){
    return this.http.get( this.baseApi + "History/Rider/" + id)
  }

  organization(id){
    return this.http.get( this.baseApi + "History/Organization/" + id)
  }

}
