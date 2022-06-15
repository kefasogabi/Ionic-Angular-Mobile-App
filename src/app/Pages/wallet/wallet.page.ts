import { WalletService } from 'src/app/Services/wallet.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/Services/storage.service';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.page.html',
  styleUrls: ['./wallet.page.scss'],
})
export class WalletPage implements OnInit {
wallet:any={};
transactions:any[] = [];
  constructor(private router:Router, private walletService:WalletService,private storage: StorageService) { }
  slideOptsThumbs = {
    spaceBetween: 0,
    slidesPerView: 2.65,
  };

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.getBalance();
    this.getWallet();
  }

  getBalance(){
    this.storage.getObject('data').then((data: any) => {
      this.walletService.getBalance(data.userId).subscribe((data:any) => {
        this.wallet =data ;
      }, (err:any) => {
        console.log("Error while getting balance");
      });
    });
  }

  getWallet(){
    this.storage.getObject('data').then((data: any) => {
      this.walletService.getWallet(data.userId).subscribe((data:any) => {
        this.transactions = data ;
      }, (err:any) => {
        console.log("Error while getting wallet");
      });
    });
  }

  fund(){
    this.router.navigate(['/tabs/fund-wallet'], {replaceUrl: true })
  }

}
