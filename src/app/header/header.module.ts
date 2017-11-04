import {NgModule} from '@angular/core';
import {MatButtonModule, MatIconModule, MatTooltipModule} from '@angular/material';

import {OrdersDatabase} from '../orders-db';
import {Header} from './header';

@NgModule({
  declarations: [Header],
  exports: [Header],
  imports: [
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
  ],
})
export class HeaderModule { }
