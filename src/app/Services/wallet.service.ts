import { PostDeposit, PostTransaction } from './../Models/user.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  baseApi = "https://api-server.cloudware.com.ng/api/";
  constructor(private http: HttpClient) { }

  getBalance(userId:any){
    return this.http.get( this.baseApi + "Wallets/GetBalance/" + userId);
  }

  getWallet(userId:any){
    return this.http.get( this.baseApi + "Wallets/GetWallet/" + userId);
  }

  getCharges(countryId:any){
    return this.http.get( this.baseApi + "Wallets/GetCharges/" + countryId);
  }

  createWallet(wallet){
    return this.http.post(this.baseApi + "Wallets/CreateWallet", wallet)
  }

  postDeposit(deposit:PostDeposit){
    return this.http.post( this.baseApi + "Wallets/PostDeposit", deposit);
  }

  postTransaction(transaction:PostTransaction){
    return this.http.post( this.baseApi + "Wallets/PostTransaction", transaction);
  }

}
