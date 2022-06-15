import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LookupsService {

  baseApi = "https://api-server.cloudware.com.ng/api/Lookups/";

  constructor(private http: HttpClient) { }

  getCountries(){
    return this.http.get( this.baseApi + "GetCountries")
  }

  getBanks(){
    return this.http.get( this.baseApi + "GetBanks")
  }

  getPaymentTypes(){
    return this.http.get( this.baseApi + "GetPaymentTypes")
  }

  getGenders(){
    return this.http.get( this.baseApi + "GetGenders")
  }

  getCardTypes(){
    return this.http.get( this.baseApi + "GetCardTypes")
  }

  getVehicleTypes(){
    return this.http.get( this.baseApi + "GetVehicleTypes")
  }

  getContentType(){
    return this.http.get( this.baseApi + "GetPackageContentTypes")
  }

  getHandling(){
    return this.http.get( this.baseApi + "GetPackageHandling")
  }

  getPickupType(){
    return this.http.get( this.baseApi + "GetPickupTypes")
  }

  getRideStatus(){
    return this.http.get( this.baseApi + "GetRideStatus")
  }

  getPayer(){
    return this.http.get( this.baseApi + "GetPayer")
  }

  getTypeOfRide(){
    return this.http.get( this.baseApi + "GetTypeOfRide")
  }

  getOccupation(){
    return this.http.get( this.baseApi + "GetOccupations")
  }

  getRelationship(){
    return this.http.get( this.baseApi + "GetRelationships")
  }

}
