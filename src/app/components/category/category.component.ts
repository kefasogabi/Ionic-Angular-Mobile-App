import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {

  @Input() iconName: string;
  @Input() textName: string;
  

  active = false;

  constructor() { }

  ngOnInit() {}

  setActive() {
    this.active = !this.active;
  }

}
