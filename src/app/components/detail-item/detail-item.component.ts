import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Auth/auth.service';

@Component({
  selector: 'app-detail-item',
  templateUrl: './detail-item.component.html',
  styleUrls: ['./detail-item.component.scss'],
})
export class DetailItemComponent implements OnInit {

  @Input() photo: string;
  @Input() name: string;
  @Input() transaction: string;
  @Input() amount: number;
  @Input() router:string;
  @Input() rideId:string;
  constructor(private route: Router,public authService: AuthService) { }

  ngOnInit() {}

  routerLink(link : string, rideId: string){
    this.route.navigate([link, rideId]);
    this.authService.route = "tabs/history";
  }

}
