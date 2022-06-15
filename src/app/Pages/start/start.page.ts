import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-start',
  templateUrl: './start.page.html',
  styleUrls: ['./start.page.scss'],
})
export class StartPage implements OnInit {
  card =
    {
      cardColor: '',
      text: 'Ionic is the app platform for web developers. Build amazing mobile, web, and desktop apps all with one shared code base and open web standards.',
    }
  constructor() { }

  ngOnInit() {
  }

}
