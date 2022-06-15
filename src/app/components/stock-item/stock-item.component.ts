import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-stock-item',
  templateUrl: './stock-item.component.html',
  styleUrls: ['./stock-item.component.scss'],
})
export class StockItemComponent implements OnInit {

  @Input() iconName: string;
  @Input() abbr: string;
  @Input() name: string;
  @Input() percentage: number;

  constructor() { }

  ngOnInit() {}

}
