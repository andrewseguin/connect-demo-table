import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

export type BakedItem = 'Cake' | 'Cupcake' | 'Pastry' | 'Cookie';

export type OrderStatus = 'Processing' | 'Baking' | 'Shipped' | 'Delivered';

export interface BakeryOrder {
  orderId: string;
  item: BakedItem;
  flavor: string;
  quantity: number;
  customer: string;
  status: OrderStatus;
  cost: number;
}

@Injectable()
export class OrdersDatabase {
  /** Observable that emits the latest values in the database. */
  orders: BehaviorSubject<BakeryOrder[]> = new BehaviorSubject<BakeryOrder[]>([]);

  /** Whether orders will be updated in real-time. */
  storesClosed = true;

  constructor() {
    this.loadOrders();
    this.acceptIncomingOrders();
  }

  /** Randomly adds a new order to the database. */
  acceptIncomingOrders() {
    window.setInterval(() => {
      // 90% of the time, status is the same
      if (random() * 90 > 50 || this.storesClosed ) { return; }
      this.addOrder();
    }, 500);
  }

  /** Create a new processing order and insert it to the top of the order stack. */
  private addOrder() {
    const copiedOrders = this.orders.value.slice();
    const newOrder = this.createOrder('Processing');
    this.updateOrderStatus(newOrder);
    copiedOrders.unshift(newOrder);
    this.orders.next(copiedOrders);
  }

  /** Build a new order with random data. */
  private createOrder(status: OrderStatus): BakeryOrder {
    const orderId =
      Math.round(random() * 100) + '-' + Math.round(random() * 100000);

    const item = getRandomValue<BakedItem>(ITEMS);
    const flavor = getRandomValue<string>(FLAVORS);
    const quantity = Math.round(random() * 5) + 1;

    const customerFirstName = getRandomValue<string>(NAMES);
    const customerLastInitial = `${getRandomValue<string>(NAMES).charAt(0)}.`;
    const customer = `${customerFirstName} ${customerLastInitial}`;

    const cost = random() * 2 * quantity;

    return {orderId: orderId, item, flavor, quantity, customer, status, cost};
  }

  /** Creates an interval that randomly updates the status of order. */
  private updateOrderStatus(order: BakeryOrder) {
    // If isNew, set it to Processing first
    if (order.status === 'Processing') {
      window.setTimeout(() => order.status = 'Baking', 1000);
    }

    // Randomly update the status
    window.setInterval(() => this.checkStatus(order), random() * 5000 + 1000);
  }

  /** Creates an initial set of order data to act as our database. */
  private loadOrders() {
    const orders = [];
    for (let i = 0; i < 1000; i++) {
      let status: OrderStatus = 'Baking';
      if (random() < .2) {
        status = 'Shipped';
      } else if (random() < .6) {
        status = 'Delivered';
      }
      orders.push(this.createOrder(status));
    }

    this.orders.next(orders);
  }

  /** Randomly upgrades the status of the order. Processing -> Baking -> Shipped -> Delivered. */
  private checkStatus(order: BakeryOrder) {
    // 90% of the time, status is the same
    if (random() < .9 || this.storesClosed) { return; }

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
}

/** Pulls a random value from the provided array. */
function getRandomValue<T>(values: T[]): T {
  const randomIndex = Math.round(random() * (values.length - 1));
  return <T>values[randomIndex];
}



// Deterministic random number generator (so values don't change between loads)
let SEED = 1;
function random() {
  const rand = Math.sin(SEED++) * 10000;
  return rand - Math.floor(rand);
}

const FLAVORS: string[] = ['Butterfinger', 'Strawberry', 'Chocolate Cheesecake', 'Blueberry', 'Chocolate Brownie', 'Coconut', 'Cookie Crunch', 'Chocolate Espresso', 'Peanut Butter', 'Salted Caramel', 'Toffee', 'Vanilla', 'Cookies & Cream', 'German Chocolate', 'Mint Chocolate', 'Lemon', 'Mango', 'Peaches & Cream', 'Carrot Cake', 'Maple Bacon', 'Pumpkin', 'Red Velvet', 'Tiramisu', 'Snickerdoodle'];
const ITEMS: BakedItem[] = ['Cake', 'Cupcake', 'Pastry', 'Cookie'];
const NAMES = ['Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack', 'Charlotte', 'Theodore', 'Isla', 'Oliver', 'Isabella', 'Jasper', 'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'];
