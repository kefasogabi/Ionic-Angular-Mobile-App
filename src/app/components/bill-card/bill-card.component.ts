import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-bill-card',
  templateUrl: './bill-card.component.html',
  styleUrls: ['./bill-card.component.scss'],
})
export class BillCardComponent implements OnInit {

  @Input() text: string;
  @Input() desc: string;

  constructor() { }

  ngOnInit() {}


}
