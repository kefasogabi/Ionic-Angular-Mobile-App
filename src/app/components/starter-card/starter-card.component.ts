import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-starter-card',
  templateUrl: './starter-card.component.html',
  styleUrls: ['./starter-card.component.scss'],
})
export class StarterCardComponent implements OnInit {
  @Input() cardColor: string;
  @Input() text: string;
  constructor() { }

  ngOnInit() {}

}
