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
import { ActionSheetController, ModalController } from '@ionic/angular';
import { environment } from '../../../environments/environment';
import { Plugins, Capacitor } from '@capacitor/core';
import { Coordinates } from 'src/app/Models/user.model';

@Component({
  selector: 'app-map-modal',
  templateUrl: './map-modal.component.html',
  styleUrls: ['./map-modal.component.scss']
})
export class MapModalComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('map') mapElementRef: ElementRef;
  center:Coordinates;
  @Input() selectable = true;
  @Input() closeButtonText = 'Cancel';
  @Input() title = 'Pick Location';
  clickListener: any;
  googleMaps: any;
  selectedCoords:any;
  constructor(
    private modalCtrl: ModalController,
    private renderer: Renderer2,
    public actionSheetController: ActionSheetController
  ) {

    
    
  }

  ngOnInit() {
    
  }

  ngAfterViewInit() {
    Plugins.Geolocation.getCurrentPosition()
    .then(geoPosition => {
      const coordinates: Coordinates = {
        lat: geoPosition.coords.latitude,
        lng: geoPosition.coords.longitude
      };
      this.center = coordinates;
    })
    .catch(err => {
    });

    this.getGoogleMaps()
      .then(googleMaps => {

       


        this.googleMaps = googleMaps;
        const mapEl = this.mapElementRef.nativeElement;
        
        const map = new googleMaps.Map( mapEl, {
          center: this.center,
          zoom: 16
        });


        this.googleMaps.event.addListenerOnce(map, 'idle', () => {
          this.renderer.addClass(mapEl, 'visible');
        });

        
        const card = document.getElementById("pac-card") as HTMLElement;
        const input = document.getElementById("pac-input") as HTMLInputElement;
       
        const options = {
          fields: ["formatted_address", "geometry", "name"],
          origin: this.center,
          strictBounds: false,
          types: ["establishment"],
        };

        map.controls[googleMaps.ControlPosition.TOP_RIGHT].push(card);

        const autocomplete = new googleMaps.places.Autocomplete(input, options);
      
        // Bind the map's bounds (viewport) property to the autocomplete object,
        // so that the autocomplete requests use the current map bounds for the
        // bounds option in the request.
        autocomplete.bindTo("bounds", map);
      
        const infowindow = new googleMaps.InfoWindow();
       
        const marker = new googleMaps.Marker({
          map,
          anchorPoint: new googleMaps.Point(0, -29),
        });
      
        autocomplete.addListener("place_changed", () => {
          // infowindow.close();
          marker.setVisible(false);
          const place = autocomplete.getPlace();
      
          if (!place.geometry || !place.geometry.location) {
            // User entered the name of a Place that was not suggested and
            // pressed the Enter key, or the Place Details request failed.
            window.alert("No details available for input: '" + place.name + "'");
            return;
          }
      
          // If the place has a geometry, then present it on a map.
          if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
          } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17);
          }
          marker.setPosition(place.geometry.location);
          marker.setVisible(true);

          const selectedCoords = {
            lat: marker.getPosition().lat(),
            lng: marker.getPosition().lng(),
            address: place.name +', ' + place.formatted_address
          };
           this.selectedCoords = selectedCoords;
        

          infowindow.setContent( place.name+ ', '+ place.formatted_address);
          infowindow.open(map, marker);
          this.presentActionSheet();
        });


       

        if (this.selectable) {
          this.clickListener = map.addListener('click', event => {
            
            const selectedCoords = {
              lat: event.latLng.lat(),
              lng: event.latLng.lng()
            };
            this.modalCtrl.dismiss(selectedCoords);
          });
        } 
        else {
          const marker = new googleMaps.Marker({
            position: this.center,
            map: map,
            title: 'Picked Location'
          });
          marker.setMap(map);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  onCancel() {
    this.modalCtrl.dismiss();
  }

  selectMap(){
    this.modalCtrl.dismiss(this.selectedCoords);
  }

  ngOnDestroy() {
    if (this.clickListener) {
      this.googleMaps.event.removeListener(this.clickListener);
    }
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Select option ',
      buttons: [{
        text: 'Use Selected Location',
        handler: () => {
          this.selectMap();
        }
      }, {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
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
