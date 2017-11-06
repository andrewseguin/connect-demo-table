import {Component, OnInit, ViewChild} from '@angular/core';
import {BakeryOrder, OrdersDatabase} from './orders-db';
import {DataSource} from '@angular/cdk/collections';
import {MatPaginator} from '@angular/material';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {animate, keyframes, style, transition, trigger} from '@angular/animations';

export interface PageChange {
  page: number;
  size: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('state', [
      transition('void => Processing',
        animate('525ms cubic-bezier(0.4, 0.0, 0.2, 1)', keyframes([
          style({minHeight: '0px', overflow: 'hidden', height: '0px'}),
          style({minHeight: '*', overflow: 'inherit', height: '*'})
        ]))),
    ])
  ],
})
export class AppComponent {
  definedColumns = ['orderId', 'status', 'customer', 'item', 'flavor', 'quantity', 'cost'];
  dataSource: OrdersDataSource;
  currentPage = new BehaviorSubject<PageChange>({page: 0, size: 100});

  constructor(private ordersDatabase: OrdersDatabase) {
    this.dataSource = new OrdersDataSource(this.ordersDatabase.orders, this.currentPage);
  }
}

export class OrdersDataSource implements DataSource<BakeryOrder> {
  constructor(public readonly orders: Subject<BakeryOrder[]>,
              public readonly pageChanges: Subject<PageChange>) { }

  connect() {
    return Observable.combineLatest(this.orders, this.pageChanges)
      .map(result => this.getPagedData(result[0], result[1]));
  }

  disconnect() { }

  /** Returns the current page of orders given the list of all orders and current page change. */
  private getPagedData(orders: BakeryOrder[], pageChange: PageChange): BakeryOrder[] {
    const startIndex = pageChange.page * pageChange.size;
    return orders.slice().splice(startIndex, pageChange.size);
  }
}
