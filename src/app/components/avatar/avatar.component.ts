import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
})
export class AvatarComponent implements OnInit {

  @Input() name: string;
  @Input() photo: string;
  active = false;

  constructor() { }

  ngOnInit() {}

  setActive() {
    this.active = !this.active;
  }
}
