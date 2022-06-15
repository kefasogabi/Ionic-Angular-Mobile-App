import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-home-card',
  templateUrl: './home-card.component.html',
  styleUrls: ['./home-card.component.scss'],
})
export class HomeCardComponent implements OnInit {

  @Input() cardColor: string;
  @Input() iconColor: string;
  @Input() iconName: string;
  @Input() text: string;

  constructor() { }

  ngOnInit() {}


}
