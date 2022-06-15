import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Guarantor, Rider } from '../Models/user.model';

@Injectable({
  providedIn: 'root'
})
export class RiderService {
  baseApi = "https://api-server.cloudware.com.ng/api/";
  constructor(private http:HttpClient) { }

  addRider(rider: Rider){
    return this.http.post( this.baseApi + "Riders", rider)
  }

  getRider(id){
    return this.http.get( this.baseApi + "Riders/" + id)
  }

  updateRider(rider:Rider, id){
    return this.http.put( this.baseApi + "Riders/" + id, rider);
  }

  addGuarantor(guarantor: Guarantor){
    return this.http.post( this.baseApi + "Guarantors", guarantor)
  }

  getGuarantor(id){
    return this.http.get( this.baseApi + "Guarantors/" + id)
  }

  updateGuarantor(guarantor:Guarantor, id){
    return this.http.put( this.baseApi + "Guarantors/" + id, guarantor);
  }

  reportPosition(position:any){
    return this.http.post( this.baseApi + "Riders/ReportPosition", position);
  }


}
