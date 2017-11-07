import {Component, OnInit, ViewChild} from '@angular/core';
import {BakedItem, OrdersDatabase, OrderStatus} from './orders-db';
import {DataSource} from '@angular/cdk/collections';
import {MatPaginator} from '@angular/material';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {animate, keyframes, style, transition, trigger} from '@angular/animations';
import {PageEvent} from '../event';

export interface BakeryOrder {
  orderId: string;
  item: BakedItem;
  flavor: string;
  quantity: number;
  customer: string;
  status: OrderStatus;
  cost: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  dataSource: OrdersDataSource;

  constructor(private ordersDatabase: OrdersDatabase) {
    this.dataSource = new OrdersDataSource(this.ordersDatabase.orders);
  }
}

/** Data source that provides a stream of bakery orders to be rendered by the table. */
export class OrdersDataSource implements DataSource<BakeryOrder> {

  constructor(private orders: Subject<BakeryOrder[]>) { }

  /** Provide stream to the table. */
  connect() {
    return this.orders;
  }

  /** Called by the table on ngOnDestroy() - no-op. */
  disconnect() { }

}
