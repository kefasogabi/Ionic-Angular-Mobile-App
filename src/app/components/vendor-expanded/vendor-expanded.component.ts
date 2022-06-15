import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Auth/auth.service';

@Component({
  selector: 'vendor-expanded',
  templateUrl: './vendor-expanded.component.html',
  styleUrls: ['./vendor-expanded.component.scss'],
})
export class VendorExpandedComponent implements OnInit {
  @Input() riderName : string;
  @Input() telephone : string;
  @Input() image : string;
  @Input() description : string;
  @Input() status : string;
  @Input() price : string;
  @Input() router:string;
  @Input() rideId:string; 
  public isMenuOpen : boolean = false;


  constructor(private route: Router,public authService: AuthService) {
   
  }

  ngOnInit() {}

  public toggleAccordion(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  routerLink(link : string, rideId: string){
    this.route.navigate([link, rideId]);
    this.authService.route = "tabs/home";
}

}
