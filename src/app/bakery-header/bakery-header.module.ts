import {NgModule} from '@angular/core';
import {MatButtonModule, MatIconModule, MatTooltipModule} from '@angular/material';

import {OrdersDatabase} from '../orders-db';
import {BakeryHeaderComponent} from './bakery-header';

@NgModule({
  declarations: [BakeryHeaderComponent],
  exports: [BakeryHeaderComponent],
  imports: [
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
  ],
})
export class BakeryHeaderModule { }
