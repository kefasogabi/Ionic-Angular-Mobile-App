import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Client } from '../Models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  baseApi = "https://api-server.cloudware.com.ng/api/";
  constructor(private http:HttpClient) { }

  getClients(){
    return this.http.get( this.baseApi + "Clients" )
  }

  getClient(id){
    return this.http.get( this.baseApi + "Clients/" + id)
  }

  addClient(client: Client){
    return this.http.post( this.baseApi + "Clients", client);
  }

  updateClient(client:Client, id){
    console.log(client);
    return this.http.put( this.baseApi + "Clients/" + id, client);
  }

  getClientByTelephone(telephone){
    return this.http.get( this.baseApi + "Clients/GetClientByTelephone/" + telephone);
  }

  



}
