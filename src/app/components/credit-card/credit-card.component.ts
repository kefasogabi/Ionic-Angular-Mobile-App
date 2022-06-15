import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.scss'],
})
export class CreditCardComponent implements OnInit {

  @Input() idx: number;
  @Input() cardColor: string;
  @Input() type: string;
  @Input() numberColor: string;
  @Input() number: string;
  @Input() owner: string;
  @Input() expires: string;

  isOpen = false;

  constructor(private route: Router) { }

  ngOnInit() {}

  gotoCard(id: string) {
    this.route.navigate(['/card/', id]);
  }

}
