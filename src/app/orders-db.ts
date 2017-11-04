import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

export type BakedItem = 'Cake' | 'Cupcake' | 'Pastry' | 'Cookie';

export type OrderStatus = 'Processing' | 'Baking' | 'Shipped' | 'Delivered';

export interface BakeryOrder {
  orderId: string;
  item: BakedItem;
  flavor: string;
  quantity: number;
  orderCreated: number;
  customer: string;
  status: OrderStatus;
}

@Injectable()
export class OrdersDatabase {
  /** Observable that emits the latest values in the database. */
  orders: BehaviorSubject<BakeryOrder[]> = new BehaviorSubject<BakeryOrder[]>([]);

  /** Whether orders will be updated in real-time. */
  openStores = true;

  constructor() {
    this.loadOrders();
    this.acceptIncomingOrders();
  }

  /** Loads a new set of orders on the database. */
  loadMoreOrders(count: number = 25) {
    return new Promise(resolve => {
      setTimeout(() => {
        const orders = this.orders.value.slice();
        for (let i = 0; i < count; i++) {
          orders.push(this.createOrder('Baking'));
        }

        this.orders.next(orders);

        resolve();
      }, 1000);
    });
  }

  /** Randomly adds a new order to the database. */
  acceptIncomingOrders() {
    window.setInterval(() => {
      // 90% of the time, status is the same
      if (Math.random() * 90 > 50 || this.openStores ) { return; }
      this.addOrder();
    }, 500);
  }

  /** Create a new processing order and insert it to the top of the order stack. */
  private addOrder() {
    const copiedOrders = this.orders.value.slice();
    const newOrder = this.createOrder('Processing');
    copiedOrders.unshift(newOrder);
    this.orders.next(copiedOrders);
  }

  /** Build a new order with random data. */
  private createOrder(status: OrderStatus): BakeryOrder {
    const orderId =
      Math.round(Math.random() * 100000) + '-' + Math.round(Math.random() * 100000);
    const orderCreated = Date.now();

    const item = getRandomValue<BakedItem>(ITEMS);
    const flavor = getRandomValue<string>(FLAVORS);
    const quantity = Math.round(Math.random() * 5) + 1;

    const customerFirstName = getRandomValue<string>(NAMES);
    const customerLastInitial = `${getRandomValue<string>(NAMES).charAt(0)}.`;
    const customer = `${customerFirstName} ${customerLastInitial}`;

    return {orderId, item, flavor, quantity, orderCreated, customer, status};
  }

  /** Creates an interval that randomly updates the status of order. */
  private updateOrderStatus(order: BakeryOrder) {
    // If isNew, set it to Processing first
    if (order.status == 'Processing') {
      window.setTimeout(() => order.status = 'Baking', 1000);
    }

    // Randomly update the status
    window.setInterval(() => {
      checkStatus(order);
    }, 5000);
  }

  /** Creates an initial set of order data to act as our database. */
  private loadOrders() {
    const orders = [];
    for (let i = 0; i < 100; i++) {
      orders.push(this.createOrder('Baking'));
    }

    this.orders.next(orders);
  }
}

/** Pulls a random value from the provided array. */
function getRandomValue<T>(values: T[]): T {
  const randomIndex = Math.round(Math.random() * (values.length - 1));
  return <T>values[randomIndex];
}


/** Randomly upgrades the status of the order. Processing -> Baking -> Shipped -> Delivered. */
function checkStatus(order: BakeryOrder) {
  // 90% of the time, status is the same
  if (Math.random() < .9) { return; }

  switch (order.status) {
    case 'Processing':
      order.status = 'Baking';
      break;
    case 'Baking':
      order.status = 'Shipped';
      break;
    case 'Shipped':
      order.status = 'Delivered';
      break;
  }
}

const FLAVORS: string[] = ['Butterfinger', 'Strawberry', 'Chocolate Cheesecake', 'Blueberry', 'Chocolate Brownie', 'Coconut', 'Cookie Crunch', 'Chocolate Espresso', 'Peanut Butter', 'Salted Caramel', 'Toffee', 'Vanilla', 'Cookies & Cream', 'German Chocolate', 'Mint Chocolate', 'Lemon', 'Mango', 'Peaches & Cream', 'Carrot Cake', 'Maple Bacon', 'Pumpkin', 'Red Velvet', 'Tiramisu', 'Snickerdoodle'];
const ITEMS: BakedItem[] = ['Cake', 'Cupcake', 'Pastry', 'Cookie'];
const NAMES = ['Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack', 'Charlotte', 'Theodore', 'Isla', 'Oliver', 'Isabella', 'Jasper', 'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'];
