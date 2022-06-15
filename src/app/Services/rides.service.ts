import { Booking, Estimate } from 'src/app/Models/user.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RidesService {

  baseApi = "https://api-server.cloudware.com.ng/api/Rides/";

  constructor(private http: HttpClient) { }

  newRide(ride: Booking){
    return this.http.post( this.baseApi + "NewRide", ride);
  }

  getRide(id){
    return this.http.get( this.baseApi + "GetRide/" + id);
  }

  acceptRide(id){
    return this.http.post( this.baseApi + "AcceptRide/" + id, id);
  }

  activatePickUp(id){
    return this.http.post( this.baseApi + "ActivatePickUp/" + id, id);
  }

  activateDropoff(id){
    return this.http.post( this.baseApi + "ActivateDropoff/" + id, id);
  }

  activateCompletion(id){
    return this.http.post( this.baseApi + "ActivateCompletion/" + id, id);
  }

  cancelRide(id){
    return this.http.post( this.baseApi + "CancelRide/" + id, id);
  }

  getPrice(data:Estimate){
    return this.http.post( this.baseApi + "GetPrice", data );
  }

  getPosition(rideId){
    return this.http.get( this.baseApi + "GetPosition/" + rideId);
  }

}
