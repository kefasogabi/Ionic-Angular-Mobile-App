import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-budget-item',
  templateUrl: './budget-item.component.html',
  styleUrls: ['./budget-item.component.scss'],
})
export class BudgetItemComponent implements OnInit {

  show = false;

  @Input() name: string;
  @Input() date: string;
  @Input() current: number;
  @Input() total: number;

  constructor() { }

  ngOnInit() {}

}
