import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Router } from "@angular/router";
import { ModalController } from "@ionic/angular";
import { AuthService } from "src/app/Auth/auth.service";
import { TrackingModalComponent } from "../tracking-modal/tracking-modal.component";


@Component({
  selector: 'client-expandable',
  templateUrl: './expandable.component.html',
  styleUrls: ['./expandable.component.scss'],
})
export class ExpandableComponent implements  OnInit {
  @Input() riderName : string;
  @Input() telephone : string;
  @Input() image : string;
  @Input() description : string;
  @Input() status : string;
  @Input() price : string;
  @Input() router:string;
  @Input() rideId:string; 
  
  @Output() change : EventEmitter<string> = new EventEmitter<string>();
  public isMenuOpen : boolean = false;


  constructor(private route: Router,public authService: AuthService,private modalCtrl: ModalController) {
    
  }

  ngOnInit() {}

  public toggleAccordion(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  routerLink(link : string, rideId: string){
      this.route.navigate([link, rideId]);
      this.authService.route = "tabs/home";
  }

  track(rideId){
    this.modalCtrl.create({ component: TrackingModalComponent, componentProps: { 
      rideId: rideId
    } }).then(modalEl => { modalEl.present(); });
  }

 



}
