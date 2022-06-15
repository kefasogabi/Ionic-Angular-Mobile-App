import { NavParams, ModalController } from '@ionic/angular';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.page.html',
  styleUrls: ['./image-modal.page.scss'],
})
export class ImageModalPage implements OnInit {

  img:any;
  @ViewChild('slide', {read:ElementRef})slider:ElementRef;
  sliderOpts = {
    zoom:{
      maxRatio:5
    }
  };

  constructor(private navParams: NavParams, private modalController:ModalController) { }

  ngOnInit() {
    this.img = this.navParams.get('img');
  }


  close(){
    this.modalController.dismiss();
  }

}
