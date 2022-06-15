import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Vendor } from '../Models/user.model';

@Injectable({
  providedIn: 'root'
})
export class VendorService {
  baseApi = "https://api-server.cloudware.com.ng/api/";
  constructor(private http:HttpClient) { }

  addVendor(vendor: Vendor){
    return this.http.post( this.baseApi + "Vendors", vendor)
  }

  getVendor(id){
    return this.http.get( this.baseApi + "Vendors/" + id )
  }

  updateVendor(vendor:Vendor, id){
    return this.http.put( this.baseApi + "Vendors/" + id, vendor);
  }
}
