import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Auth/auth.service';

@Component({
  selector: 'app-rider-expanded',
  templateUrl: './rider-expanded.component.html',
  styleUrls: ['./rider-expanded.component.scss'],
})
export class RiderExpandedComponent implements OnInit {
  @Input() status : string;
  @Input() price : string;
  @Input() dropOff : string;
  @Input() pickUp : string;
  @Input() image : string;
  @Input() description : string;
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
