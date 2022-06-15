import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BankAccount, Card } from '../Models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseApi = "https://api-server.cloudware.com.ng/api/";
  constructor(private http: HttpClient) { }

  postAccount(account:BankAccount){
    return this.http.post( this.baseApi + "UserAccounts", account);
  }

  updateAccount(account:BankAccount, id){
    return this.http.put( this.baseApi + "UserAccounts/" +  id, account);
  }

  getAccount(id:any){
    return this.http.get( this.baseApi + "UserAccounts/" + id);
  }

  postCard(card:Card){
    return this.http.post( this.baseApi + "UserCards", card);
  }

  updateCard(card:Card, id){
    return this.http.put( this.baseApi + "UserCards/" +  id, card);
  }

  getCard(id:any){
    return this.http.get( this.baseApi + "UserCards/" + id);
  }





}
