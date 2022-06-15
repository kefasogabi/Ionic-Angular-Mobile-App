import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
  Renderer2,
  OnDestroy,
  Input
} from '@angular/core';
import { Plugins, Capacitor } from '@capacitor/core';
import { ActivatedRoute } from '@angular/router';
import { Coordinates } from 'src/app/Models/user.model';
import { RidesService } from 'src/app/Services/rides.service';
import { environment } from 'src/environments/environment';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-tracking-modal',
  templateUrl: './tracking-modal.component.html',
  styleUrls: ['./tracking-modal.component.scss'],
})
export class TrackingModalComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('map') mapElementRef: ElementRef;
  @Input() closeButtonText = 'Cancel';
  @Input() title = 'Package Location';
  @Input() selectable = true;
  googleMaps: any;
  center:Coordinates;
  clickListener: any;
  selectedCoords:any;
  constructor(private activatedRoute:ActivatedRoute, 
              private renderer: Renderer2,
              private modalCtrl: ModalController,
              private ridesService:RidesService,
              private navParams: NavParams) { }

  ngOnInit() {
  }

  ngAfterViewInit(){
    const rideId: string = this.navParams.get('rideId');
      this.ridesService.getPosition(rideId).subscribe((data:any)=>{
        const coordinates: Coordinates = {
          lat: data.gpsLatitude,
          lng: data.gpsLongitude
        };
        this.center = coordinates;

        this.getGoogleMaps()
        .then(googleMaps => {
          this.googleMaps = googleMaps;
          const mapEl = this.mapElementRef.nativeElement;
          const map = new googleMaps.Map(mapEl, {
            center: this.center,
            zoom: 16
          });
  
          this.googleMaps.event.addListenerOnce(map, 'idle', () => {
            this.renderer.addClass(mapEl, 'visible');
          });
  
          const infowindow = new googleMaps.InfoWindow();
  
          const marker = new googleMaps.Marker({
            position: map.getCenter(),
            map,
            anchorPoint: new googleMaps.Point(0, -29),
          });
          const contentString  = `<ul style="list-style-type:none; padding:0px; margin:0px;" >
                                    <li> Rider name: ${data.fullname}</li>
                                    <li> Telephone: ${data.telephone}</li>
                                    <li> As at: ${new Date(data.reportDate)} </li>
                                  </ul>`
          infowindow.setContent(contentString);
          infowindow.open(map, marker);
  
         
        })
        .catch(err => {
          console.log(err);
        });


       }, (err:any) => {
         console.log(err)
      });
    

     

  }

  onCancel() {
    this.modalCtrl.dismiss();
  }

  ngOnDestroy() {
  }

  private getGoogleMaps(): Promise<any> {
    const win = window as any;
    const googleModule = win.google;
    if (googleModule && googleModule.maps) {
      return Promise.resolve(googleModule.maps);
    }
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src =
        'https://maps.googleapis.com/maps/api/js?libraries=places&key=' +
        environment.googleMapsAPIKey;
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
      script.onload = () => {
        const loadedGoogleModule = win.google;
        if (loadedGoogleModule && loadedGoogleModule.maps) {
          resolve(loadedGoogleModule.maps);
        } else {
          reject('Google maps SDK not available.');
        }
      };
    });
  }
}
