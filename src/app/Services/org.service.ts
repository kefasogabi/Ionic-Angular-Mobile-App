import { Org } from './../Models/user.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrgService {
  baseApi = "https://api-server.cloudware.com.ng/api/";
  constructor(private http:HttpClient) { }

  addOrg(org: Org){
    return this.http.post( this.baseApi + "Organizations", org)
  }

  getOrg(id){
    return this.http.get( this.baseApi + "Organizations/" + id)
  }

  updateOrg(org:Org, id){
    return this.http.put( this.baseApi + "Organizations/" + id, org);
  }
}
