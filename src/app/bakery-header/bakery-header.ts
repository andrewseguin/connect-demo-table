import {Component} from '@angular/core';
import {OrdersDatabase} from '../orders-db';

@Component({
  selector: 'bakery-header',
  templateUrl: './bakery-header.html',
  styleUrls: ['./bakery-header.scss'],
  host: {
    'class': 'mat-elevation-z1',
  }
})
export class BakeryHeaderComponent {
  set highlight(highlight: boolean) {
    document.querySelector('body').classList.toggle('highlight', highlight);
  }
  get highlight() {
    return document.querySelector('body').classList.contains('highlight');
  }

  constructor(public orderDatabase: OrdersDatabase) { }
}
